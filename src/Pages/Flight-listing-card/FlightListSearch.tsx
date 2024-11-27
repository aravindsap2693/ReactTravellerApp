/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from "react";
//import Background from "../assets/images/Tripvista_HomeBackgroundImage.svg";
import Background from "../../../src/assets/images/Tripvista_HomeBackgroundImage.svg";
import Twowayicon from "../../../src/assets/images/Tripvista_TwoWay.svg";
import { AutoComplete } from "rsuite";
import { InputGroup} from "rsuite";

import { DatePicker } from "rsuite";
// import Calendar from "../../assets/images/Calendar.svg";
import Calendar from "../../../src/assets/images/Tripvista_Calendar.svg";

import styles from "../../assets/styles/flight-listing.module.css";
import { Grid, Row, Col, RadioGroup, Radio } from "rsuite";
import Flightto from "../../assets/images/Toicon.svg";
import FlightFrom from "../../assets/images/FromIcon.svg";
import IndianFlag from "../../assets/images/IndianFlag.svg";
import FlightListDropdown from "./FlightListDropdown";
import { Dropdown } from "rsuite";
import { ItemDataType } from "rsuite/esm/MultiCascadeTree";

import { useDispatch, useSelector } from "react-redux";
import { setFlightType } from "../../Store/Slice/flightSlice";
import MinusIcon from "../../assets/icons/MinusIcon.svg";
import AddIcon from "../../assets/icons/AddIcon.svg";
import { setDeparture, setDepartureDates,
  setDestination, 
  setFlightOption, setFlightTypeData, setReturnDates } from "../../Store/Slice/flightBannerSlice";
import { fetchFlightFieldListData } from "../../Api/flightField.api";
import { ValueType } from "rsuite/esm/Radio";
import TButton from "../../Component/Common/TButton";

// const data = [
//   "Select All",
//   "Trujet [2t]",
//   "IndiGo [6E]",
//   "Airliance Air [9I]",
//   "Air India Express-AX [AX]",
//   "Coupon Indigo [C6E]",
// ].map((item) => ({ label: item, value: item }));

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

const renderMenuItem = (_label: React.ReactNode, item: ItemDataType) => {
  const option = options.find((opt) => opt.value === String(item.value));
  return option ? (
    <div>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col>
          <img
            src={option.flag}
            alt={`${option.label} Flag`}
            width={24}
            height={24}
            style={{ marginRight: 8 }}
          />
        </Col>
        <Col style={{ textAlign: "left", alignItems: "center" }}>
          {option.city}, {option.label}
          <div style={{ fontSize: "0.8em", color: "gray" }}>
            {option.airport}
          </div>
        </Col>
      </Row>

      {/* <div style={{ marginLeft: 5, fontSize: "0.8em", color: "gray" }}>
        {option.address}
      </div> */}
    </div>
  ) : null;
};

const renderValue = (value: any, item: any): any => {
  const option = options.find((opt) => opt.value === String(value));
  return option ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{option.label}</div>
      <div style={{ fontSize: "0.8em", color: "gray" }}>{option.airport}</div>
      <div style={{ fontSize: "0.8em", color: "gray" }}>{option.address}</div>
    </div>
  ) : (
    value
  );
};

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
  // {
  //   label: "France",
  //   value: "France",
  //   flag: IndianFlag,
  //   city: "Paris", // City name for France
  //   airport: "Charles de Gaulle Airport",
  //   address: "Paris, France",
  // },
  // {
  //   label: "Italy",
  //   value: "Italy",
  //   flag: IndianFlag,
  //   city: "Rome", // City name for Italy
  //   airport: "Leonardo da Vinci International Airport",
  //   address: "Rome, Italy",
  // },
  // {
  //   label: "Spain",
  //   value: "Spain",
  //   flag: IndianFlag,
  //   city: "Madrid", // City name for Spain
  //   airport: "Adolfo Suárez Madrid–Barajas Airport",
  //   address: "Madrid, Spain",
  // },
  // {
  //   label: "Japan",
  //   value: "Japan",
  //   flag: IndianFlag,
  //   city: "Tokyo", // City name for Japan
  //   airport: "Narita International Airport",
  //   address: "Tokyo, Japan",
  // },
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
  // {
  //   label: "Brazil",
  //   value: "Brazil",
  //   flag: IndianFlag,
  //   city: "São Paulo", // City name for Brazil
  //   airport:
  //     "São Paulo/Guarulhos–Governador André Franco Montoro International Airport",
  //   address: "São Paulo, Brazil",
  // },
  // {
  //   label: "Mexico",
  //   value: "Mexico",
  //   flag: IndianFlag,
  //   city: "Mexico City", // City name for Mexico
  //   airport: "Mexico City International Airport",
  //   address: "Mexico City, Mexico",
  // },
  // {
  //   label: "South Africa",
  //   value: "South Africa",
  //   flag: IndianFlag,
  //   city: "Johannesburg", // City name for South Africa
  //   airport: "O.R. Tambo International Airport",
  //   address: "Johannesburg, South Africa",
  // },
  // {
  //   label: "Russia",
  //   value: "Russia",
  //   flag: IndianFlag,
  //   city: "Moscow", // City name for Russia
  //   airport: "Sheremetyevo International Airport",
  //   address: "Moscow, Russia",
  // },
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

const ways = ["One-way", "Two-way", "Multi-City"];
const today = new Date();

interface FlightSegment {
  from: string | null;
  to: string | null;
  departureDate: Date | null;
  arrivalDate: Date | null;
}

const FlightListingPage: React.FC = () => {
  const dispatch = useDispatch();
  const flightType = useSelector((state: any) => state.flight.flightType);
  const disableReturnDateForOneWay = useSelector((state: any) => state?.flightBanner?.flightType);
  const selectedAirlines = useSelector((state: any) => state?.flightBanner?.selectedAirlines);
  const selectedSource = useSelector((state:any)=> state?.flightBanner?.departure);
  const selectedDestination = useSelector((state:any)=> state?.flightBanner?.destination);
  const selectedFlightOption = useSelector((state:any)=>state?.flightBanner?.flightOption);
  const selectedDepartureDate = useSelector((state:any)=>state?.flightBanner?.departureDate);
  
  const [fromResults, setFromResults] = useState<any[]>([]);
  const [fromInput, setFromInput] = useState("");    // State for departure input
  const [toInput, setToInput] = useState("");        // State for destination input
  const [fromOptions, setFromOptions] = useState<any[]>([]);  // Options for departure autocomplete
  const [toOptions, setToOptions] = useState<any[]>([]);
  const [toResults, setToResults] = useState<any[]>([]);

// Function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with zero if needed
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get month and pad with zero if needed
  const year = date.getUTCFullYear(); // Get full year
  return `${day}/${month}/${year}`; // Format to DD/MM/YYYY
};

const formattedDepartureDate = formatDate(selectedDepartureDate);
console.log("formattedDepartureDate",formattedDepartureDate)


  const [activeKey, setActiveKey] = React.useState("null");
  const [isFocused, setIsFocused] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<string | null>("Date");
  const [departureDate, setDepartureDate] = React.useState<Date | null>(today);
  

  
  const [arrivalDate, setArrivalDate] = React.useState<Date | null>(null);
  const [departurePickerOpen, setDeparturePickerOpen] = React.useState(false);
  const [arrivalPickerOpen, setArrivalPickerOpen] = React.useState(false);
  const [fromValue, setFromValue] = React.useState<string | null>();
  const [toValue, setToValue] = React.useState<string | null | undefined>(null);
  const [multiCityFlights, setMultiCityFlights] = React.useState<
    FlightSegment[]
  >([{ from: null, to: null, departureDate: today, arrivalDate: null }]);

  const adjustedFromValue: string | undefined =
    fromValue === null ? undefined : fromValue;
    // dispatch(setDeparture(adjustedFromValue))

  const adjustedToValue: string | undefined =
    toValue === null ? undefined : toValue;
    // dispatch(setDestination(adjustedToValue))

  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const handleFlightOptionChange = (value: ValueType) => {
    dispatch(setFlightOption(value as string));
  };

  // const handleAirlinesChange = (value: string[]) => {
  //   dispatch(setSelectedAirlines(value));  
  // };

  const handleDepartureChange = (date: Date | null) => {

    setDepartureDate(date);
    dispatch(setDepartureDates(date));
    setDeparturePickerOpen(false);
    
  };

  const handleDestination = (e: any) => {
    setToValue(e);
    setToInput(e);
    const selectedOption = toResults.find(
      (option) => `${option.city} - ${option.name}` === e
    );
    // Log the selected option's name and airport code, if found
    if (selectedOption) {
      // Dispatch action to update destination in Redux store
      dispatch(setDestination({
        name: selectedOption?.name,
        code: selectedOption?.code
      }));
    }
  }

  const handleArrivalChange = (date: Date | null) => {
    setArrivalDate(date);
    dispatch(setReturnDates(date))
    setArrivalPickerOpen(false);
  };

  const handleFlightTypeChange = (eventKey: string) => {
    dispatch(setFlightType(eventKey));
    dispatch(setFlightTypeData(eventKey)); 

  };

  const disableBeforeDeparture = (date?: Date): boolean => {
    if (!date || !departureDate) return false;
    return date < departureDate;
  };

   // Generalized function to fetch airport options using fetchFlightFieldListData
   const fetchAirportOptions = async (inputValue: string, setOptions: React.Dispatch<React.SetStateAction<any[]>>, setResults: React.Dispatch<React.SetStateAction<any[]>>) => {
    if (inputValue) {
      try {
        const data = await fetchFlightFieldListData(inputValue, dispatch);
        console.log("===data",data)
        setResults(data?.response);  // Save the full API response
        setOptions(Array.isArray(data) ? data.map((option: any) => ({
          label: option.name,
          value: `${option.code} - ${option.name}`, // Format for AutoComplete
        })) : []);
      } catch (error) {
        console.error("Error fetching airport data:", error);
        setOptions([]);  // Fallback to an empty array in case of an error
      }
    }
  };

  // Fetch data for departure input
  useEffect(() => {
    fetchAirportOptions(fromInput, setFromOptions, setFromResults);  // Store both options and raw results
  }, [fromInput]);

  // Fetch data for destination input
  useEffect(() => {
    fetchAirportOptions(toInput, setToOptions, setToResults);  // Store both options and raw results
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
      dispatch(setDeparture({
        name: selectedOption?.name,
        code: selectedOption?.code
      }));
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

  const handlesubmit = () => {
    console.log("multiCityFlights", multiCityFlights);
    console.log("fromValue", fromValue);
  };

  //   const handleChange = (value: string | null) => {
  //     setSelectedValue(value);

  //     // Handle the selected value here
  //   };

  //   const handleIconClick = () => {
  //     setOpen(!open); // Toggle the visibility of the calendar
  //   };
  interface CustomDropdownProps {
    title: string;
    items: string[];
    [key: string]: any; // Allow any additional props
  }

  const CustomDropdown: React.FC<CustomDropdownProps> = ({
    title,
    items,
    ...props
  }) => (
    <div style={{ margin: "auto", width: "55%" }}>
      <Dropdown
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
                        data={options.map((option) => ({
                          label: option.label,
                          value: option.value,
                          airport: option.airport,
                          address: option.address,
                        }))}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Select a location"
                        style={{fontWeight:"500"}}
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
                        style={{fontWeight:"500"}}
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

              <Col xs={24} sm={12} md={2}>
                {index === 0 && (
                  <TButton label="Search Flight" onClick={handlesubmit} />
                )}
              </Col>
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
            {/* <div style={{ display: "flex", gap: "10px" }}>
              <Col xs={24} sm={12} md={4} lg={4} xl={2} xxl={2}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    position: "relative",
                  }}
                >
                  <Stack
                    spacing={10}
                    direction="column"
                    alignItems="flex-start"
                  >
                    <CheckPicker
                      data={data}
                      searchable={false}
                      style={{ width: "100%" }}
                      value={selectedAirlines}
                      onChange={handleAirlinesChange}  
                      placeholder="Select Your Airlines"
                    />
                  </Stack>
                </div>
              </Col>
            </div> */}
            <Col xs={24} sm={12} md={15}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  position: "relative",
                  marginLeft:"20px"
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
                    style={{ gap: "30px", }}
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
            <Col xs={24} sm={12} md={2}>
              <TButton label="Search Flight" onClick={handlesubmit} />
            </Col>
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
                    marginLeft:"70px"
                    
                  }}
                >
                  <CustomDropdown
                    title="Select way"
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
                      data={fromResults.map((option) => ({
                        label: option.name,
                        value: `${option.city} - ${option.name}`,
                        airport: option.name,
                        address: option.country
                      }))}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Select a location"
                      style={{fontWeight:"500"}}
                      renderMenuItem={renderMenuItem}
                      value={adjustedFromValue}
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
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 1,
                        }}
                      >
                        <Image
                          src={Flightto}
                          alt="Flight Icon"
                          style={{ width: 20, height: 20 }}
                        />
                      </div>
                    </InputGroup.Addon> */}
                    {/* <AutoComplete
                      data={options.map((option) => ({
                        label: option.label,
                        value: option.value,
                      }))}
                      placeholder="Select a location"
                      style={{fontWeight:"500"}}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      renderMenuItem={renderMenuItem}
                      // value={adjustedToValue}
                      value={selectedDestination.name || adjustedFromValue}
                      onChange={setToValue}
                    /> */}

                    <AutoComplete
                      data={toResults.map((option) => ({
                        label: option.name,
                        value: `${option.city} - ${option.name}`,
                        airport: option.name,
                        address: option.country
                      }))}
                      placeholder="Select a location"
                      style={{fontWeight:"500"}}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      renderMenuItem={renderMenuItem}
                      value={adjustedToValue}
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
                      caretAs={CustomCaret}
                      onChange={handleDepartureChange}
                      // open={departurePickerOpen}
                      // onOpen={() => setDeparturePickerOpen(true)}
                      // onClose={() => setDeparturePickerOpen(false)}
                      placeholder="Departure Date"
                      style={{ width: "100%", fontWeight:500 }}
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
                      value={arrivalDate}
                      onChange={handleArrivalChange}
                      // open={arrivalPickerOpen}
                      // onOpen={() => setArrivalPickerOpen(true)}
                      // onClose={() => setArrivalPickerOpen(false)}
                      placeholder="Click to add the return flight"
                      disabledDate={disableBeforeDeparture}
                      style={{ width: "100%", fontWeight:500 }}
                      disabled={disableReturnDateForOneWay === "One Way"} 
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
