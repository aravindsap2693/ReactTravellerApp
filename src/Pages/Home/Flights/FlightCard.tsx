/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Twowayicon from "../../../assets/images/Tripvista_TwoWay.svg";
import Calendar from "../../../assets/images/Tripvista_Calendar.svg";
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  InputGroup,
  Row,
  Col,
  Text,
  Stack,
  Button,
  ButtonGroup,
  RadioGroup,
  Radio,
} from "rsuite";

import MinusIcon from "../../../../src/assets/icons/MinusIcon.svg";
import Search from "../../../../src/assets/images/Tripvista_search.svg";
import SpecialFeature from "../../../../src/assets/images/Tripvista_specialfeature.svg";

import { useDispatch, useSelector } from "react-redux";
import "../../../../src/assets/styles/flight-listing.module.css";
import isBefore from "date-fns/isBefore";
import {
  setDeparture,
  setDepartureDates,
  setDestination,
  setFlightOption,
  setFlightTypeData,
  setReturnDates,
} from "../../../Store/Slice/flightBannerSlice";
import { fetchFlightFieldListData } from "../../../Api/flightField.api";

import {
  FlightCardProps,
  Option,
} from "../../../Interfaces/models/flight.model";
import { airPortList, wayList } from "../../../Utils/Constant/constant";
import { RootState } from "../../../Store/store";
import { formatDateStringToYYYYMMDD } from "../../../Component/Common/commonFunction";
import FlightListDropdown from "../../Flight-listing-card/FlightListDropdown";
import { IFlightSegment } from "../../../Interfaces/UI/IFlightCard";
import { useNavigate } from "react-router-dom";
import { fetchListFlights } from "../../../Api/flightList.api";

const CustomCaret: React.FC = () => (
  <div style={{ width: "10px", height: "16px" }}></div> // Empty div or custom component
);

const options: Option[] = airPortList;
const FlightCard: React.FC<FlightCardProps> = () => {
  /* Multicity */
  // const ways = ["One-way", "Round-trip", "Multi-City"];
  const today = new Date();
  const [multiCityFlights, setMultiCityFlights] = React.useState<
    IFlightSegment[]
  >([{ from: null, to: null, departureDate: today, arrivalDate: null }]);
  console.log("multiCityFlights=============>", multiCityFlights);

  /* Multicity */

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const flightType = useSelector((state: any) => state.flight.flightType);
  const intialDepartureDate = useSelector(
    (state: RootState) => state?.flightBanner?.departureDate
  );
  // const intialArrivalDate = useSelector(
  //   (state: RootState) => state?.flightBanner?.returnDate
  // );
  const flightType = useSelector((state: any) => state.flight.flightType);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const [formValues, setFormValues] = useState<any>({
    cabinClass: "economy",
    mode: "One Way",
    isDomesticTrip: 1,
    isDirectFlight: 1,
    isConnectingFlight: 1,
    passengerDetails: {
      adults: 1,
      children: 0,
      infants: 0,
    },
  });

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

  //   useEffect(() => {
  //   if (!intialArrivalDate) {
  //     const today = new Date();
  //     setArrivalDate(today);
  //     const formatToday = formatDateStringToYYYYMMDD(today);
  //     console.log("formatTodayREEE",formatToday)
  //     dispatch(setReturnDates(formatToday));
  //   } else {
  //     const formatTodayy= formatDateStringToYYYYMMDD(intialArrivalDate);
  //     setArrivalDate(new Date(formatTodayy));
  //     dispatch(setReturnDates(formatTodayy));
  //   }
  // }, [intialArrivalDate, dispatch]);

  useEffect(() => {
    dispatch(setFlightTypeData("One Way"));
    dispatch(setFlightOption("Direct flight"));
  }, [dispatch]);

  const passengerDetails = useSelector(
    (state: RootState) => state?.flightBanner
  );
  const [, setActiveKey] = useState("null");
  const [, setIsFocused] = useState(false);
  const [fromValue, setFromValue] = useState<string | null>(null);
  const [toValue, setToValue] = useState<string | null>(null);
  const [, setDeparturePickerOpen] = useState(false);
  const [, setArrivalPickerOpen] = useState(false);
  const [cablinClassOption, setCablinClassOption] = useState<string | null>(
    null
  );

  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);

  const [fromInput, setFromInput] = useState(""); // State for departure input
  const [toInput, setToInput] = useState(""); // State for destination input
  const [, setFromOptions] = useState<any[]>([]); // Options for departure autocomplete
  const [, setToOptions] = useState<any[]>([]);
  const [toResults, setToResults] = useState<any[]>([]);
  const [fromResults, setFromResults] = useState<any[]>([]);

  const adjustedFromValue: string | undefined =
    fromValue === null ? undefined : fromValue;

  const adjustedToValue: string | undefined =
    toValue === null ? undefined : toValue;

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
        setOptions([]);
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

  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
  };

  // Handle the change of radio button selection
  const handleCabinClassOptionChange = (value: any) => {
    //const selectedValue = Number(value); // Ensure value is cast to a number
    setCablinClassOption(value); // Update state
    dispatch(setFlightOption(value));
  };

  const handleFlightOptionChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleDepartureChange = (date: Date | null) => {
    setDepartureDate(date);
    setDeparturePickerOpen(false);
    if (date) {
      const formatToday = formatDateStringToYYYYMMDD(date);
      dispatch(setDepartureDates(formatToday));
    }
  };

  const handleArrivalChange = (date: Date | null) => {
    setArrivalDate(date);
    setArrivalPickerOpen(false);
    if (date) {
      const formatToday = formatDateStringToYYYYMMDD(date);
      dispatch(setReturnDates(formatToday));
    }
  };

  const disableBeforeDeparture = (date?: Date): boolean => {
    if (!date || !departureDate) return false;
    return date < departureDate;
  };

  const handleSearchFlight = async () => {
    let payload;
    if (flightType === "Round Trip") {
      payload = {
        searchQuery: {
          cabinClass: passengerDetails?.cabinClass,
          paxInfo: {
            ADULT: passengerDetails?.passengers?.adults,
            CHILD: passengerDetails?.passengers?.children,
            INFANT: passengerDetails?.passengers?.infants,
          },
          routeInfos: [
            {
              fromCityOrAirport: {
                code: passengerDetails?.departure?.code,
              },
              toCityOrAirport: {
                code: passengerDetails?.destination?.code,
              },
              travelDate: passengerDetails?.departureDate,
            },
            {
              fromCityOrAirport: {
                code: passengerDetails?.destination?.code,
              },
              toCityOrAirport: {
                code: passengerDetails?.departure?.code,
              },
              travelDate: passengerDetails?.returnDate,
            },
          ],
          searchModifiers: {
            isDirectFlight: true,
            isConnectingFlight: false,
          },
        },
      };
    } else {
      payload = {
        searchQuery: {
          cabinClass: passengerDetails?.cabinClass,
          paxInfo: {
            ADULT: passengerDetails?.passengers?.adults,
            CHILD: passengerDetails?.passengers?.children,
            INFANT: passengerDetails?.passengers?.infants,
          },
          routeInfos: [
            {
              fromCityOrAirport: {
                code: passengerDetails?.departure?.code,
              },
              toCityOrAirport: {
                code: passengerDetails?.destination?.code,
              },
              travelDate: passengerDetails?.departureDate,
            },
          ],
          searchModifiers: {
            isDirectFlight: true,
            isConnectingFlight: false,
          },
        },
      };
    }
    try {
      await fetchListFlights(payload);
      navigate("/flightlist");
    } catch (error) {
      console.error("Error fetching flight list:", error);
    }
  };

  // const handleSearchMulticity = async () => {
  //   const payload = {
  //     searchQuery: {
  //       cabinClass: passengerDetails?.cabinClass,
  //       paxInfo: {
  //         ADULT: passengerDetails?.passengers?.adults,
  //         CHILD: passengerDetails?.passengers?.children,
  //         INFANT: passengerDetails?.passengers?.infants,
  //       },
  //       routeInfos: multiCityFlights.map((route: any) => ({
  //         fromCityOrAirport: {
  //           code: route?.from,
  //         },
  //         toCityOrAirport: {
  //           code: route?.to,
  //         },
  //         travelDate: route.departureDate,
  //       })),
  //       searchModifiers: {
  //         isDirectFlight: true,
  //         isConnectingFlight: false,
  //       },
  //     },
  //   };

  //   console.log("payload&&&&&&&", payload);

  //   try {
  //     // Pass payload as a route parameter
  //     // await fetchListFlights(payload);
  //     navigate("/multiple");
  //   } catch (error) {
  //     console.error("Error fetching flight list:", error);
  //   }
  // };
  const handleSearchMulticity = async () => {
    const payload = {
      searchQuery: {
        cabinClass: passengerDetails?.cabinClass,
        paxInfo: {
          ADULT: passengerDetails?.passengers?.adults,
          CHILD: passengerDetails?.passengers?.children,
          INFANT: passengerDetails?.passengers?.infants,
        },
        routeInfos: multiCityFlights.map((route: any) => ({
          fromCityOrAirport: {
            code: route?.from,
          },
          toCityOrAirport: {
            code: route?.to,
          },
          travelDate: route.departureDate,
        })),
        searchModifiers: {
          isDirectFlight: true,
          isConnectingFlight: false,
        },
      },
    };

    console.log("payload&&&&&&&", payload);

    try {
      // Call the fetchListFlights function with the payload
      // const flightData = await fetchListFlights(payload);

      // Optionally, handle the response data
      // console.log("Fetched flight data:", flightData);
      navigate("/multiple");
      // Navigate to the "/multiple" route
      // navigate("/multiple");
    } catch (error) {
      console.error("Error fetching flight list:", error);
    }
  };

  const handleRemoveSegment = (index: number) => {
    const updatedFlights = multiCityFlights.filter((_, i) => i !== index);
    setMultiCityFlights(updatedFlights);
  };
  // Handle Multi-City Segment Changes
  const handleAddSegment = () => {
    setMultiCityFlights([
      ...multiCityFlights,
      { from: null, to: null, departureDate: null, arrivalDate: null },
    ]);
  };

  // const handleMultiCityChange = (
  //   index: number,
  //   field: keyof IFlightSegment,
  //   value: string | Date | null
  // ) => {
  //   const updatedFlights = [...multiCityFlights];
  //   if (field === "to" && index < updatedFlights.length - 1) {
  //     updatedFlights[index + 1].from = value as string;
  //   }
  //   if (field === "departureDate") {
  //     for (let i = 0; i < updatedFlights.length; i++) {
  //       updatedFlights[i].departureDate = value as Date;
  //     }
  //   }
  //   updatedFlights[index] = {
  //     ...updatedFlights[index],
  //     [field]: value,
  //   };
  //   setMultiCityFlights(updatedFlights);
  // };

  const handleMultiCityChange = (
    index: number,
    field: keyof IFlightSegment,
    value: string | Date | null
  ) => {
    const updatedFlights = [...multiCityFlights];
    if (field === "to" && index < updatedFlights.length - 1) {
      updatedFlights[index + 1].from = value as string;
    }
    updatedFlights[index] = {
      ...updatedFlights[index],
      [field]: value,
    };
    console.log("updatedFlightsCards", updatedFlights);

    setMultiCityFlights(updatedFlights);
    // dispatch(flightMulticitySlice(updatedFlights));
  };

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

  const handleDestination = (e: any) => {
    setToValue(e);
    setToInput(e);
    const selectedOption = toResults.find(
      (option) => `${option.city} - ${option.name}` === e
    );
    // Log the selected option's name and airport code, if found
    if (selectedOption) {
      // Dispatch action to update destination in Redux store
      dispatch(
        setDestination({
          name: selectedOption?.name,
          code: selectedOption?.code,
          city: selectedOption?.city,
        })
      );
    }
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

  /* Multicity*/
  const renderMenuItem = (_label: any, item: any): any => {
    let option = fromResults?.find((opt) => opt.name === String(item.label));
    if (!option) {
      option = toResults?.find((opt) => opt.name === String(item.label));
    }
    return option ? (
      <div>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col></Col>
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

  return (
    <>
      <Row>
        {formValues.mode !== "Multi City" ? (
          <>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div
                style={{
                  color: "#FA503F",
                  padding: "0px",
                  width: "300px",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    position: "relative",
                    marginBottom: "30px",
                  }}
                >
                  <ButtonGroup
                    style={{
                      margin: "5px",
                      padding: "5px",
                      border: "1px solid #D8D8D8",
                    }}
                  >
                    {wayList.map((key) => (
                      <Button
                        key={key}
                        active={key === formValues.mode}
                        style={{
                          backgroundColor:
                            key === formValues.mode ? "#FFEEEC" : "#FFF",
                          color:
                            key === formValues.mode ? "#FA503F" : "#666666",
                          borderRadius: "5px",
                          fontWeight: "500",
                        }}
                        onClick={() => {
                          setFormValues((prevCounts: any) => ({
                            ...prevCounts,
                            mode: key,
                          }));
                          setActiveKey(key);
                          dispatch(setFlightTypeData(key));
                        }}
                      >
                        {key}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={9} xl={8}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  marginBottom: "20px",
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
                  <Text
                    style={{
                      marginBottom: "4px",
                      alignSelf: "flex-start",
                      color: "#000",
                    }}
                  >
                    From
                  </Text>

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
                      onChange={handleDeparture}
                    />
                  </InputGroup>
                </div>
                {/* Centered Icon */}
                <div
                  style={{
                    position: "absolute",
                    left: "calc(50% - 2px)",
                    transform: "translateX(-50%)",
                    top: "25px",
                    width: "35x",
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
                  <Text
                    style={{
                      marginBottom: "4px",
                      alignSelf: "flex-start",
                      color: "#000",
                    }}
                  >
                    To
                  </Text>
                  <InputGroup
                    inside
                    style={{
                      position: "relative",
                      width: "100%",
                      borderRadius: "0 8px 8px 0",
                      marginLeft: "-1px",
                      outline: "none",
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
                      onChange={handleDestination}
                    />
                  </InputGroup>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={4} lg={4} xl={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    marginBottom: "3px",
                    color: "#000",
                  }}
                >
                  Departure
                </Text>
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
                    //shouldDisableDate={date => isBefore(date, new Date())}
                    caretAs={CustomCaret}
                    onChange={handleDepartureChange}
                    placeholder="Departure Date"
                    style={{ width: "100%", fontWeight: 500 }}
                    shouldDisableDate={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // Set time to start of the day
                      return date < today;
                    }}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col xs={24} sm={12} md={4} lg={4} xl={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    marginBottom: "3px",
                    color: "#000",
                  }}
                >
                  Arrival
                </Text>
                <InputGroup
                  inside
                  style={{ position: "relative", flex: 1 }}
                  onClick={() =>
                    !arrivalDate
                      ? setArrivalPickerOpen(true)
                      : setArrivalPickerOpen(false)
                  }
                >
                  <InputGroup.Addon>
                    <div
                      style={{
                        position: "absolute",
                        left: "4px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent look
                        zIndex: 10,
                        pointerEvents: "none", // Prevent clicks on overlay
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
                    // shouldDisableDate={date => isBefore(date, new Date())}
                    caretAs={CustomCaret}
                    value={arrivalDate}
                    onChange={handleArrivalChange}
                    placeholder="Click to add the return flight"
                    shouldDisableDate={disableBeforeDeparture}
                    disabled={formValues.mode === "One Way"}
                    style={{ width: "100%", fontWeight: 500 }}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={7}>
              <Stack direction="column" alignItems="flex-start">
                <Text
                  style={{
                    marginBottom: "3px",
                    alignSelf: "flex-start",
                    color: "#000",
                  }}
                >
                  Passengers
                </Text>
                <FlightListDropdown />
              </Stack>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={1}>
              <img
                src={Search}
                alt="Search Icon"
                style={{
                  width: 40,
                  height: 40,
                  marginTop: "20px",
                  position: "sticky",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleSearchFlight();
                }}
              />
            </Col>
          </>
        ) : (
          <>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div
                style={{
                  color: "#FA503F",
                  padding: "0px",
                  width: "285",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    position: "relative",
                    marginBottom: "30px",
                  }}
                >
                  <ButtonGroup
                    style={{
                      margin: "5px",
                      padding: "5px",
                      border: "1px solid #D8D8D8",
                    }}
                  >
                    {wayList.map((key) => (
                      <Button
                        key={key}
                        active={key === formValues.mode}
                        style={{
                          backgroundColor:
                            key === formValues.mode ? "#FFEEEC" : "#FFF",
                          color:
                            key === formValues.mode ? "#FA503F" : "#666666",
                          borderRadius: "5px",
                          fontWeight: "500",
                        }}
                        onClick={() => {
                          setFormValues((prevCounts: any) => ({
                            ...prevCounts,
                            mode: key,
                          }));
                          setActiveKey(key);
                        }}
                      >
                        {key}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={10} md={8} lg={4} xl={16}>
              {multiCityFlights.map((_segment, index) => (
                <Row
                  key={index}
                  className="showgrid"
                  style={{
                    justifyContent: "start",
                    gap: "10px",
                    width: "100%",
                    margin: "0px auto",
                    marginTop: "20px",
                  }}
                >
                  <Col xs={24} sm={12} md={8} lg={9} xl={18}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        position: "relative",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "black",
                            textAlign: "start",
                            marginLeft: "1em",
                          }}
                        >
                          From
                        </div>
                        <InputGroup
                          inside
                          style={{
                            position: "relative",
                            width: "100%",
                            outline: "none",
                          }}
                        >
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
                          top: "0px",
                          width: "35px",
                          height: "35px",
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
                          style={{
                            width: "100%",
                            height: "100%",
                            marginTop: "2.5em",
                          }}
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
                        <div
                          style={{
                            color: "black",
                            textAlign: "start",
                            marginLeft: "1em",
                          }}
                        >
                          To
                        </div>
                        <InputGroup
                          inside
                          style={{
                            position: "relative",
                            width: "100%",
                            outline: "none",
                            marginLeft: "9px",
                          }}
                        >
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

                  <Col xs={24} sm={12} md={6}>
                    <div style={{ display: "flex", marginTop: "1.2em" }}>
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
                            shouldDisableDate={(date) =>
                              isBefore(date, new Date())
                            }
                            value={multiCityFlights[index]?.departureDate} // Ensure null fallback for safety
                            onChange={(value) =>
                              handleMultiCityChange(
                                index,
                                "departureDate",
                                value
                              )
                            }
                            caretAs={CustomCaret}
                            placeholder="Departure Date"
                            style={{ width: "100%" }}
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={8} xl={7}>
                    {/* Add/Remove Buttons */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {multiCityFlights.length > 1 && (
                        <Button
                          appearance="primary"
                          style={{
                            padding: "0.5em",
                            background: "#FA503F",
                          }}
                          onClick={() => handleRemoveSegment(index)}
                        >
                          <img
                            src={MinusIcon}
                            alt="Calendar Icon"
                            style={{ width: 17, height: 16 }}
                          />
                        </Button>
                      )}

                      {multiCityFlights.length < 5 && (
                        <>
                          {index === multiCityFlights.length - 1 && (
                            <>
                              <Button
                                appearance="primary"
                                style={{
                                  padding: "0.5em",
                                  background: "#FA503F",
                                }}
                                onClick={handleAddSegment}
                              >
                                Add Flight
                              </Button>
                              {/* <img
                                src={AddIcon}
                                alt="Calendar Icon"
                                style={{ width: 17, height: 16 }}
                                onClick={handleAddSegment}
                              /> */}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={7}>
              <Stack direction="column" alignItems="flex-start">
                <Text
                  style={{
                    marginBottom: "3px",
                    alignSelf: "flex-start",
                    color: "#000",
                    marginTop: "1em",
                  }}
                >
                  Passengers
                </Text>
                <FlightListDropdown />
              </Stack>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={1}>
              <img
                src={Search}
                alt="Search Icon"
                style={{
                  width: 40,
                  height: 40,
                  marginTop: "2.5em",
                  position: "sticky",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleSearchMulticity();
                }}
              />
            </Col>
          </>
        )}
      </Row>
      {formValues.mode === "One Way" || formValues.mode === "Round Trip" ? (
        <>
          <Row>
            {formValues.mode === "One Way" ||
            formValues.mode === "Round Trip" ||
            formValues.mode === "Multi City" ? (
              ""
            ) : (
              <>
                <Col xs={24} sm={12} md={4} lg={4} xl={4}>
                  <Stack direction="column" alignItems="flex-start">
                    <div style={{ marginTop: "25px" }}>
                      <Checkbox style={{ color: "black" }}>
                        Low Cost Airlines
                      </Checkbox>
                    </div>
                  </Stack>
                </Col>
                <Col xs={24} sm={12} md={4} lg={4} xl={4}>
                  <Stack direction="column" alignItems="flex-start">
                    <div style={{ marginTop: "25px" }}>
                      <Checkbox style={{ color: "black" }}>
                        GDS Airlines
                      </Checkbox>
                    </div>
                  </Stack>
                </Col>
              </>
            )}

            <Col xs={24} sm={12} md={8} lg={8} xl={2}>
              <img
                src={SpecialFeature}
                alt="Special feature"
                style={{
                  width: 100,
                  height: 100,
                  marginTop: "0px",
                  position: "sticky",
                }}
              />
            </Col>

            <Col xs={24} sm={12} md={6} lg={6} xl={16}>
              <Stack direction="column" alignItems="flex-start">
                <div style={{ marginTop: "25px", marginLeft: "25px" }}>
                  <RadioGroup
                    name="radio-group-inline"
                    inline
                    value={cablinClassOption || "Direct flight"}
                    onChange={handleCabinClassOptionChange} // Directly pass the handler
                    style={{ gap: "10px" }}
                  >
                    {[
                      "Direct flight",
                      "Near By Airports",
                      "Students Fare",
                      "Senior Citizen Fare",
                    ].map((label, index) => {
                      const isChecked = selectedValue === label;

                      return (
                        <Radio
                          key={index + 1}
                          value={label}
                          checked={isChecked}
                          color="red"
                          style={{
                            color: isChecked ? "#FA503F" : "#666666",
                            backgroundColor: isChecked ? "#FEF6F5" : "#FFFFFF",
                            border: "1px solid #E5E5E5",
                            borderRadius: "20px",
                            paddingRight: "10px",
                          }}
                          onChange={() => handleFlightOptionChange(label)} // Call the separate onChange handler
                        >
                          <span
                            style={{ color: isChecked ? "#FA503F" : "black" }}
                          >
                            {label}
                          </span>
                        </Radio>
                      );
                    })}
                  </RadioGroup>
                </div>
              </Stack>
            </Col>
          </Row>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default FlightCard;
