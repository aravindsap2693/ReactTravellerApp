/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import Background from "../../../src/assets/images/Tripvista_HomeBackgroundImage.svg";
import Twowayicon from "../../../src/assets/images/Tripvista_TwoWay.svg";
import { AutoComplete } from "rsuite";
import { InputGroup } from "rsuite";

import { DatePicker } from "rsuite";

import Calendar from "../../../src/assets/images/Tripvista_Calendar.svg";

import styles from "../../assets/styles/flight-listing.module.css";
import { Grid, Row, Col, RadioGroup, Radio } from "rsuite";
import Flightto from "../../assets/images/Toicon.svg";
import FlightFrom from "../../assets/images/FromIcon.svg";
import IndianFlag from "../../assets/images/IndianFlag.svg";
import FlightListDropdown from "./FlightListDropdown";
import { Dropdown } from "rsuite";

import { useDispatch, useSelector } from "react-redux";
import { setFlightType } from "../../Store/Slice/flightSlice";
import MinusIcon from "../../assets/icons/MinusIcon.svg";
import AddIcon from "../../assets/icons/AddIcon.svg";
import {
  setDeparture,
  setDepartureDates,
  setDestination,
  setFlightOption,
  setFlightTypeData,
  setReturnDates,
} from "../../Store/Slice/flightBannerSlice";
import { fetchFlightFieldListData } from "../../Api/flightField.api";
import { ValueType } from "rsuite/esm/Radio";
// import TButton from "../../Component/Common/TButton";
import isBefore from "date-fns/isBefore";
import { RootState } from "../../Store/store";
import { formatDateStringToYYYYMMDD } from "../../Component/Common/commonFunction";
// import { fetchListFlights } from "../../Api/flightList.api";

type Option = {
  label: string;
  value: string;
  city: string;
  flag: any;
  airport: string;
  address: string;
};

const CustomCaret: React.FC = () => (
  <div style={{ width: "10px", height: "16px" }}></div> // Empty div or custom component
);

// const renderValue = (value: any, item: any): any => {
//   const option = options.find((opt) => opt.value === String(value));
//   return option ? (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div>{option.label}</div>
//       <div style={{ fontSize: "0.8em", color: "gray" }}>{option.airport}</div>
//       <div style={{ fontSize: "0.8em", color: "gray" }}>{option.address}</div>
//     </div>
//   ) : (
//     value
//   );
// };

const options: Option[] = [
  {
    label: "United States",
    value: "United States",
    flag: IndianFlag,
    city: "New York", // City name for United States
    airport: "John F. Kennedy International Airport",
    address: "Jamaica, NY 11430, USA",
  },
  {
    label: "Canada",
    value: "Canada",
    flag: IndianFlag,
    city: "Toronto", // City name for Canada
    airport: "Toronto Pearson International Airport",
    address: "Toronto, ON M9P 1A6, Canada",
  },
  {
    label: "United Kingdom",
    value: "United Kingdom",
    flag: IndianFlag,
    city: "London", // City name for United Kingdom
    airport: "Heathrow Airport",
    address: "London, UK",
  },
  {
    label: "Australia",
    value: "Australia",
    flag: IndianFlag,
    city: "Sydney", // City name for Australia
    airport: "Sydney Airport",
    address: "Sydney, NSW 2020, Australia",
  },
  {
    label: "Germany",
    value: "Germany",
    flag: IndianFlag,
    city: "Frankfurt", // City name for Germany
    airport: "Frankfurt Airport",
    address: "Frankfurt, Germany",
  },

  {
    label: "China",
    value: "China",
    flag: IndianFlag,
    city: "Beijing", // City name for China
    airport: "Beijing Capital International Airport",
    address: "Beijing, China",
  },
  {
    label: "India",
    value: "India",
    flag: IndianFlag,
    city: "New Delhi", // City name for India
    airport: "Indira Gandhi International Airport",
    address: "New Delhi, India",
  },

  {
    label: "Bangalore",
    value: "Bangalore",
    flag: IndianFlag,
    city: "Bangalore", // City name for Bangalore
    airport: "Kempegowda International Airport",
    address: "Bangalore, India",
  },
  {
    label: "Delhi",
    value: "Delhi",
    flag: IndianFlag,
    city: "Delhi", // City name for Delhi
    airport: "Indira Gandhi International Airport",
    address: "Delhi, India",
  },
];

const ways = ["One way", "Round trip", "Multi-City"];
const today = new Date();

interface FlightSegment {
  from: string | null;
  to: string | null;
  departureDate: Date | null;
  arrivalDate: Date | null;
}

const FlightListingPage: React.FC = () => {
  const dispatch = useDispatch();

  const selectedSource = useSelector(
    (state: any) => state?.flightBanner?.departure
  );
  const selectedDestination = useSelector(
    (state: any) => state?.flightBanner?.destination
  );

  const selectedFlightOption = useSelector(
    (state: any) => state?.flightBanner?.flightOption
  );

  const [fromResults, setFromResults] = useState<any[]>([]);
  const [fromInput, setFromInput] = useState(""); // State for departure input
  const [toInput, setToInput] = useState(""); // State for destination input
  const [, setFromOptions] = useState<any[]>([]); // Options for departure autocomplete
  const [, setToOptions] = useState<any[]>([]);
  const [toResults, setToResults] = useState<any[]>([]);

  const { flightType } = useSelector((state: any) => state?.flightBanner);
  const intialDepartureDate = useSelector(
    (state: RootState) => state?.flightBanner?.departureDate
  );
  const intialArrivalDate = useSelector(
    (state: RootState) => state?.flightBanner?.returnDate
  );
  const [departureDate, setDepartureDate] = React.useState<Date | null>(today);
  const [arrivalDate, setArrivalDate] = React.useState<Date | null>(null);

  useEffect(() => {
    if (!intialDepartureDate) {
      const today = new Date();
      setDepartureDate(today);
      const formatToday = formatDateStringToYYYYMMDD(today);
      dispatch(setDepartureDates(formatToday));
    } else {
      setDepartureDate(new Date(intialDepartureDate));
    }
  }, [intialDepartureDate, dispatch]);

  useEffect(() => {
    if (!intialArrivalDate) {
      const formatToday = formatDateStringToYYYYMMDD(
        new Date(intialArrivalDate)
      );
      dispatch(setReturnDates(new Date(formatToday)));
    } else {
      const formatTodayy = formatDateStringToYYYYMMDD(
        new Date(intialArrivalDate)
      );
      setArrivalDate(new Date(formatTodayy));
      dispatch(setReturnDates(new Date(formatTodayy)));
    }
  }, [flightType, dispatch]);

  useEffect(() => {
    if (flightType !== "Round Trip") {
      setArrivalDate(null); // Reset arrival date to null for "One Way"
      dispatch(setReturnDates(null)); // Optionally reset the Redux state
    }
  }, [flightType, dispatch]);

  const [, setIsFocused] = useState(false);
  const [, setDeparturePickerOpen] = useState(false);
  const [, setArrivalPickerOpen] = useState(false);
  const [fromValue, setFromValue] = useState<string | null>();
  const [toValue, setToValue] = useState<string | null | undefined>(null);
  const [multiCityFlights, setMultiCityFlights] = useState<FlightSegment[]>([
    { from: null, to: null, departureDate: today, arrivalDate: null },
  ]);

  const adjustedFromValue: string | undefined =
    fromValue === null ? undefined : fromValue;

  const adjustedToValue: string | undefined =
    toValue === null ? undefined : toValue;

  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const handleFlightOptionChange = (value: ValueType) => {
    dispatch(setFlightOption(value as string));
  };

  const handleDepartureChange = (date: Date | null) => {
    setDepartureDate(date);
    setDeparturePickerOpen(false);
    if (date) {
      // const today = new Date();
      const formatToday = formatDateStringToYYYYMMDD(date);
      dispatch(setDepartureDates(formatToday));
    }
  };
  useEffect(() => {
    setToValue(`${selectedDestination?.city} - ${selectedDestination?.name}`);
    setFromValue(`${selectedSource.city} - ${selectedSource.name}`);
  }, []);

  const handleDestination = (e: any) => {
    setToValue(e);
    setToInput(e);
    const selectedOption = toResults.find(
      (option) => `${option.city} - ${option.name}` === e
    );
    if (selectedOption) {
      dispatch(
        setDestination({
          name: selectedOption?.name,
          code: selectedOption?.code,
          city: selectedOption?.city,
        })
      );
    }
  };
  useEffect(() => {
    if (flightType === "One Way") {
      dispatch(setReturnDates(null));
    } else {
      dispatch(setReturnDates(intialArrivalDate));
    }
  }, [flightType, dispatch]);

  const handleArrivalChange = (date: Date | null) => {
    setArrivalDate(date);
    setArrivalPickerOpen(false);
    if (date) {
      // const today = new Date();
      const formatToday = formatDateStringToYYYYMMDD(date);
      dispatch(setReturnDates(formatToday));
    }
  };

  const handleFlightTypeChange = (eventKey: string) => {
    dispatch(setFlightType(eventKey));
    dispatch(setFlightTypeData(eventKey));
  };

  useEffect(() => {
    if (flightType) {
      handleFlightTypeChange(flightType); // Trigger the handler with the updated flightType
    }
  }, [flightType]);

  const disableBeforeDeparture = (date?: Date): boolean => {
    if (!date || !departureDate) return false;
    return date < departureDate;
  };

  // Generalized function to fetch airport options using fetchFlightFieldListData
  const fetchAirportOptions = async (
    inputValue: string,
    setOptions: React.Dispatch<React.SetStateAction<any[]>>,
    setResults: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    if (inputValue) {
      try {
        const data = await fetchFlightFieldListData(inputValue, dispatch);
        setResults(data?.response); // Save the full API response
        setOptions(
          Array.isArray(data)
            ? data.map((option: any) => ({
                label: option.name,
                value: `${option.code} - ${option.name}`, // Format for AutoComplete
              }))
            : []
        );
      } catch (error) {
        console.error("Error fetching airport data:", error);
        setOptions([]); // Fallback to an empty array in case of an error
      }
    }
  };

  // Fetch data for departure input
  useEffect(() => {
    fetchAirportOptions(fromInput, setFromOptions, setFromResults); // Store both options and raw results
  }, [fromInput]);

  // Fetch data for destination input
  useEffect(() => {
    fetchAirportOptions(toInput, setToOptions, setToResults); // Store both options and raw results
  }, [toInput]);

  const handleDeparture = (e: any) => {
    // Update input value with user input
    setFromValue(e);
    setFromInput(e);

    // Find the selected option (if it matches an option in the dropdown)
    const selectedOption = fromResults?.find(
      (option) => `${option?.city} - ${option?.name}` === e
    );

    // Log the selected option's name and airport code, if found
    if (selectedOption) {
      dispatch(
        setDeparture({
          name: selectedOption?.name,
          code: selectedOption?.code,
          city: selectedOption?.city,
        })
      );
    }
  };

  // Handle Multi-City Segment Changes
  const handleAddSegment = () => {
    setMultiCityFlights([
      ...multiCityFlights,
      { from: null, to: null, departureDate: null, arrivalDate: null },
    ]);
  };

  const handleRemoveSegment = (index: number) => {
    const updatedFlights = multiCityFlights.filter((_, i) => i !== index);
    setMultiCityFlights(updatedFlights);
  };

  const handleMultiCityChange = (
    index: number,
    field: keyof FlightSegment,
    value: string | Date | null
  ) => {
    const updatedFlights = [...multiCityFlights];

    if (field === "to" && index < updatedFlights.length - 1) {
      updatedFlights[index + 1].from = value as string;
    }
    if (field === "departureDate") {
      for (let i = 0; i < updatedFlights.length; i++) {
        updatedFlights[i].departureDate = value as Date;
      }
    }

    updatedFlights[index] = {
      ...updatedFlights[index],
      [field]: value,
    };
    console.log("updatedFlightsSearch", updatedFlights);
    setMultiCityFlights(updatedFlights);
  };

  const handleSwapp = (index: number) => {
    const updatedFlights = [...multiCityFlights];
    const { from, to } = updatedFlights[index];
    updatedFlights[index] = {
      ...updatedFlights[index],
      from: to,
      to: from,
    };
    setMultiCityFlights(updatedFlights);
  };
  // const handleSearchFlight = async () => {
  //   console.log('onclick');

  //   const payload = {
  //     searchQuery: {
  //       cabinClass: passengerDetails?.cabinClass,
  //       paxInfo: {
  //         ADULT: passengerDetails?.passengers?.adults,
  //         CHILD: passengerDetails?.passengers?.children,
  //         INFANT: passengerDetails?.passengers?.infants,
  //       },
  //       routeInfos: [
  //         {
  //           fromCityOrAirport: {
  //             code: passengerDetails?.departure?.code,
  //           },
  //           toCityOrAirport: {
  //             code: passengerDetails?.destination?.code,
  //           },
  //           travelDate: passengerDetails?.departureDate,
  //         },
  //       ],
  //       searchModifiers: {
  //         isDirectFlight: true,
  //         isConnectingFlight: false,
  //       },
  //     },
  //   };
  //   console.log('payload',payload);

  //   try {
  //     // Assuming fetchFlightList returns a promise
  //     await fetchListFlights(payload);
  //     // Route to /flightlist after successful fetch
  //     // router.push("/flightlist");
  //     // navigate("/flightlist");
  //     // navigate("/flightlist");
  //   } catch (error) {
  //     console.error("Error fetching flight list:", error);
  //   }
  // };

  const renderMenuItem = (_label: React.ReactNode, item: any) => {
    let option = fromResults?.find((opt) => opt.name === String(item.label));
    if (!option) {
      option = toResults?.find((opt) => opt.name === String(item.label));
    }
    return option ? (
      <div>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col style={{ textAlign: "left", alignItems: "center" }}>
            {option.city}, {option.name}
            <div style={{ fontSize: "0.8em", color: "gray" }}>
              {option.code}
            </div>
          </Col>
        </Row>
      </div>
    ) : null;
  };

  interface CustomDropdownProps {
    title: string;
    items: string[];
    [key: string]: any; // Allow any additional props
  }

  const CustomDropdown: React.FC<CustomDropdownProps> = ({
    title,
    items,

    ...props
  }) => {
    console.log("props123", props);

    const { flightType } = useSelector((state: any) => state?.flightBanner);
    return (
      <div style={{ margin: "auto", width: "55%" }}>
        <Dropdown
          // defaultValue={flightType}
          onSelect={handleFlightTypeChange} // Call the handle function on selection
          title={flightType || "Select Flight Type"} // Use the Redux state as the title
          style={{ marginBottom: "20px", paddingRight: "20px" }}
        >
          <Dropdown.Item eventKey="One Way">One Way</Dropdown.Item>
          <Dropdown.Item eventKey="Round Trip">Round Trip</Dropdown.Item>
          <Dropdown.Item eventKey="Multi City">Multi City</Dropdown.Item>
        </Dropdown>
      </div>
    );
  };
  return (
    <Grid
      fluid
      // style={{
      //   background: "linear-gradient(to right,  #0770E3 ,#0087E1,#174495)",
      // }}
      style={{ backgroundImage: `url(${Background})` }}
    >
      {flightType === "Multi City" ? (
        <Col xs={24} sm={24} md={24}>
          {multiCityFlights.map((_segment, index) => (
            <Row
              key={index}
              className={styles.showgrid}
              style={{
                justifyContent: "center",
                gap: "15px",
                width: "100%",
                margin: "0px auto",
                marginTop: "20px",
              }}
            >
              <Col xs={24} sm={12} md={4} lg={4} xl={2} xxl={2}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 && (
                    <CustomDropdown
                      title="Select way"
                      items={ways}
                      trigger="click"
                    />
                  )}
                </div>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    marginBottom: "10px",
                  }}
                >
                  {/* "From" TextField */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      position: "relative",
                    }}
                  >
                    <InputGroup
                      inside
                      style={{
                        position: "relative",
                        width: "100%",
                        outline: "none",
                      }}
                    >
                      <InputGroup.Addon
                        style={{
                          padding: "0 17px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: "4px",
                            top: "45%",
                            transform: "translateY(-50%)",
                            zIndex: 1,
                          }}
                        >
                          <img
                            src={FlightFrom}
                            alt="Flight Icon"
                            style={{ width: 25, height: 25 }}
                          />
                        </div>
                      </InputGroup.Addon>

                      <AutoComplete
                        data={options?.map((option) => ({
                          label: option.label,
                          value: option.value,
                          airport: option.airport,
                          address: option.address,
                        }))}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Select a location"
                        style={{ fontWeight: "500" }}
                        renderMenuItem={renderMenuItem}
                        value={
                          index === 0
                            ? multiCityFlights[index]?.from || ""
                            : multiCityFlights[index - 1]?.to || ""
                        }
                        onChange={(value) =>
                          handleMultiCityChange(
                            index,
                            index === 0 ? "from" : "to",
                            value
                          )
                        }
                      />
                    </InputGroup>
                  </div>

                  {/* Centered Icon */}
                  <div
                    style={{
                      position: "absolute",
                      left: "51%",
                      transform: "translateX(-50%)",
                      top: "7px",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                    }}
                    onClick={() => handleSwapp(index)}
                  >
                    <img
                      src={Twowayicon}
                      alt="icon"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>

                  {/* "To" TextField */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      position: "relative",
                    }}
                  >
                    <InputGroup
                      inside
                      style={{
                        position: "relative",
                        width: "100%",
                        outline: "none",
                        marginLeft: "9px", // Add a small gap between the text fields
                      }}
                    >
                      <InputGroup.Addon
                        style={{
                          padding: "0 17px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 1,
                          }}
                        >
                          <img
                            src={Flightto}
                            alt="Flight Icon"
                            style={{ width: 20, height: 20 }}
                          />
                        </div>
                      </InputGroup.Addon>
                      <AutoComplete
                        data={options.map((option) => ({
                          label: option.label,
                          value: option.value,
                        }))}
                        placeholder="Select a location"
                        style={{ fontWeight: "500" }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        renderMenuItem={renderMenuItem}
                        value={multiCityFlights[index]?.to || ""}
                        onChange={(value) =>
                          handleMultiCityChange(index, "to", value)
                        }
                      />
                    </InputGroup>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={12} md={2}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <InputGroup
                      inside
                      style={{ position: "relative", flex: 1 }}
                      onClick={() =>
                        departureDate
                          ? setDeparturePickerOpen(false)
                          : setDeparturePickerOpen(true)
                      }
                    >
                      <InputGroup.Addon>
                        <div
                          style={{
                            position: "absolute",
                            left: "4px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 1,
                          }}
                        >
                          <img
                            src={Calendar}
                            alt="Calendar Icon"
                            style={{ width: 17, height: 16 }}
                          />
                        </div>
                      </InputGroup.Addon>

                      <DatePicker
                        format="dd/MM/yyyy"
                        value={multiCityFlights[index]?.departureDate} // Ensure null fallback for safety
                        shouldDisableDate={(date) => isBefore(date, new Date())}
                        onChange={(value) =>
                          handleMultiCityChange(index, "departureDate", value)
                        }
                        caretAs={CustomCaret}
                        placeholder="Departure Date"
                        style={{ width: "100%" }}
                      />
                    </InputGroup>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={12} md={2}>
                {/* Add/Remove Buttons */}
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  {multiCityFlights.length > 1 && (
                    <img
                      src={MinusIcon}
                      alt="Calendar Icon"
                      style={{ width: 17, height: 16 }}
                      onClick={() => handleRemoveSegment(index)}
                    />
                  )}
                  {multiCityFlights.length < 5 && (
                    <>
                      {index === multiCityFlights.length - 1 && (
                        <img
                          src={AddIcon}
                          alt="Calendar Icon"
                          style={{ width: 17, height: 16 }}
                          onClick={handleAddSegment}
                        />
                      )}
                    </>
                  )}
                </div>
              </Col>

              {/* <Col xs={24} sm={12} md={2}>
                {index === 0 && (
                  <TButton label="Search Flight" onClick={()=>handleSearchFlight()} />
                )}
              </Col> */}
            </Row>
          ))}
        </Col>
      ) : (
        <>
          <Row
            className={styles.showgrid}
            style={{
              justifyContent: "center",
              gap: "15px",
              padding: "10px",
              width: "100%",
              margin: "0px auto",
            }}
          >
            <Col xs={24} sm={12} md={15}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  position: "relative",
                  marginLeft: "20px",
                }}
              >
                <div
                  style={{
                    border: "1px solid white",
                    display: "flex",
                    justifyContent: "space-evenly",
                    background: "#fff",
                    borderRadius: "8px",
                  }}
                >
                  <RadioGroup
                    name="radio-group-inline"
                    inline
                    // defaultValue="direct-flight"
                    defaultValue={selectedFlightOption}
                    onChange={handleFlightOptionChange}
                    style={{ gap: "30px" }}
                  >
                    <Radio
                      // value="direct-flight"
                      value="Direct flight"
                      color="red"
                    >
                      <span style={{ color: "black" }}> Direct flight</span>
                    </Radio>
                    <Radio
                      color="red"
                      value="Near By Airports"
                      //value="nearby-airports"
                      style={{
                        paddingRight: "10px",
                      }}
                    >
                      <span style={{ color: "black" }}>Near By Airports</span>
                    </Radio>
                    <Radio
                      color="red"
                      value="Students Fare"
                      // value="student-fare"
                      style={{
                        paddingRight: "10px",
                      }}
                    >
                      <span style={{ color: "black" }}> Students Fare</span>
                    </Radio>
                    <Radio
                      color="red"
                      value="Senior Citizen Fare"
                      //value="senior-citizen-fare"
                      style={{
                        paddingRight: "10px",
                      }}
                    >
                      <span style={{ color: "black" }}>
                        Senior Citizen Fare
                      </span>
                    </Radio>
                  </RadioGroup>
                </div>
              </div>
            </Col>
            {/* <Col xs={24} sm={12} md={2}>
              <TButton label="Search Flight" onClick={()=>handleSearchFlight()} />
            </Col> */}
          </Row>
          <Row
            className={styles.showgrid}
            style={{
              justifyContent: "center", // Center the columns horizontally
              gap: "15px", // Add gap between columns
              width: "100%",
              margin: "0px auto",
            }}
          >
            <div style={{ display: "flex" }}>
              <Col xs={24} sm={12} md={6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", // Center the content within the column
                    // marginBottom: "20px",
                    marginTop: "20px", // Add marginTop to the main container
                    marginLeft: "70px",
                  }}
                >
                  <CustomDropdown
                    title="Select way"
                    defaultValue={selectedFlightOption}
                    items={ways}
                    trigger="click"
                  />
                </div>
              </Col>
            </div>

            <Col xs={24} sm={12} md={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  // marginBottom: "20px",
                  marginTop: "20px", // Add marginTop to the main container
                }}
              >
                {/* "From" TextField */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    position: "relative",
                  }}
                >
                  {/* <InputGroup
                    inside
                    style={{
                      position: "relative",
                      width: "100%",
                      outline: "none",
                    }}
                  > */}
                  {/* <InputGroup.Addon
                      style={{
                        padding: "0 17px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "4px",
                          top: "45%",
                          transform: "translateY(-50%)",
                          zIndex: 1,
                        }}
                      >
                        <Image
                          src={FlightFrom}
                          alt="Flight Icon"
                          style={{ width: 25, height: 25 }}
                        />
                      </div>
                    </InputGroup.Addon> */}
                  {/* <AutoComplete
                      data={options.map((option) => ({
                        label: option.label,
                        value: option.value,
                        airport: option.airport,
                        address: option.address,
                      }))}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Select a location"
                      renderMenuItem={renderMenuItem}
                      value={selectedSource.name || adjustedFromValue}
                      onChange={setFromValue}
                    /> */}
                  {/* </InputGroup> */}

                  <InputGroup
                    inside
                    style={{
                      position: "relative",
                      width: "100%",
                      borderRadius: "8px 0 0 8px",
                      marginLeft: "-1px",
                      outline: "none",
                    }}
                  >
                    <AutoComplete
                      data={fromResults?.map((option) => ({
                        label: option.name,
                        value: `${option.city} - ${option.name}`,
                        airport: option.name,
                        address: option.country,
                      }))}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Select a location"
                      style={{ fontWeight: "500" }}
                      renderMenuItem={renderMenuItem}
                      value={adjustedFromValue}
                      //value={adjustedFromValue || `${departure?.city} - ${departure?.name}`}
                      // value={
                      //   adjustedFromValue ||
                      //   `${selectedSource.city} - ${selectedSource.name}`
                      // }
                      onChange={handleDeparture}
                    />
                  </InputGroup>
                </div>

                {/* Centered Icon */}
                <div
                  style={{
                    position: "absolute",
                    left: "51%",
                    transform: "translateX(-50%)",
                    top: "0px",
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                  onClick={handleSwap}
                >
                  <img
                    src={Twowayicon}
                    alt="icon"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>

                {/* "To" TextField */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    position: "relative",
                  }}
                >
                  <InputGroup
                    inside
                    style={{
                      position: "relative",
                      width: "100%",
                      //   borderRadius: '0 8px 8px 0',
                      outline: "none",
                      marginLeft: "9px", // Add a small gap between the text fields
                    }}
                  >
                    <AutoComplete
                      data={toResults?.map((option) => ({
                        label: option.name,
                        value: `${option.city} - ${option.name}`,
                        airport: option.name,
                        address: option.country,
                      }))}
                      placeholder="Select a location"
                      style={{ fontWeight: "500" }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      renderMenuItem={renderMenuItem}
                      value={adjustedToValue}
                      // value={
                      //   adjustedFromValue ||
                      //   `${selectedDestination?.city} - ${selectedDestination?.name}`
                      // }
                      onChange={handleDestination}
                    />
                  </InputGroup>
                </div>
              </div>
            </Col>

            <Col xs={24} sm={12} md={2}>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <InputGroup
                    inside
                    style={{ position: "relative", flex: 1 }}
                    onClick={() =>
                      departureDate
                        ? setDeparturePickerOpen(false)
                        : setDeparturePickerOpen(true)
                    }
                  >
                    <InputGroup.Addon>
                      <div
                        style={{
                          position: "absolute",
                          left: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 1,
                        }}
                      >
                        <img
                          src={Calendar}
                          alt="Calendar Icon"
                          style={{ width: 20, height: 20 }}
                        />
                      </div>
                    </InputGroup.Addon>
                    <DatePicker
                      format="dd/MM/yyyy"
                      value={departureDate}
                      shouldDisableDate={(date) => isBefore(date, new Date())}
                      caretAs={CustomCaret}
                      onChange={handleDepartureChange}
                      // open={departurePickerOpen}
                      // onOpen={() => setDeparturePickerOpen(true)}
                      // onClose={() => setDeparturePickerOpen(false)}
                      placeholder="Departure Date"
                      style={{ width: "100%", fontWeight: 500 }}
                    />
                  </InputGroup>
                </div>
              </div>
            </Col>

            <Col xs={24} sm={12} md={2}>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <InputGroup
                    inside
                    style={{ position: "relative", flex: 1 }}
                    onClick={() =>
                      !arrivalDate
                        ? setArrivalPickerOpen(true)
                        : setArrivalPickerOpen(false)
                    }
                    className={styles.calendar}
                  >
                    <InputGroup.Addon>
                      <div
                        style={{
                          position: "absolute",
                          left: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 1,
                        }}
                      >
                        <img
                          src={Calendar}
                          alt="Calendar Icon"
                          style={{ width: 20, height: 20 }}
                        />
                      </div>
                    </InputGroup.Addon>
                    <DatePicker
                      format="dd/MM/yyyy"
                      caretAs={CustomCaret}
                      value={flightType === "One Way" ? null : arrivalDate}
                      shouldDisableDate={(date) => isBefore(date, new Date())}
                      onChange={handleArrivalChange}
                      // open={arrivalPickerOpen}
                      // onOpen={() => setArrivalPickerOpen(true)}
                      // onClose={() => setArrivalPickerOpen(false)}
                      placeholder="Click to add the return flight"
                      disabledDate={disableBeforeDeparture}
                      style={{ width: "100%", fontWeight: 500 }}
                      disabled={flightType === "One Way"}
                    />
                  </InputGroup>
                </div>
              </div>
            </Col>
            <Col md={5} style={{ marginTop: "20px" }}>
              <FlightListDropdown />
            </Col>
          </Row>
        </>
      )}
    </Grid>
  );
};

export default FlightListingPage;
