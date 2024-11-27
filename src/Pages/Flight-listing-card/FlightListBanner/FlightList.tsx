/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Panel, Button, Popover, Whisper, Loader, Tag } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import TwoWayIcon from "../../../../src/assets/images/TwoWayIcon.svg";

// import ListBanner from "../../../../src/assets/images/ListBanner.svg";
// import Indigo from "../../../../src/assets/images/Indigo.svg";
// import Vistara from "../../../../src/assets/images/Vistara.svg";
// import AirIndia from "../../../../src/assets/images/AirIndia.svg";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";
// import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import Seats from "../../../../src/assets/images/Seat.svg";
import Iicon from "../../../../src/assets/images/Iicon.svg";
import Fareicon from "../../../../src/assets/images/FareIcon.svg";
import styles from "../../../../src/assets/styles/flight-content.module.css";
import FlightDetailspopup from "./FlightDetailsPopup";
// import TButton from "../../Common/TButton";
import stop from "../../../../src/assets/images/Stop.svg";
import SortUpIcon from "@rsuite/icons/SortUp";
import SortDownIcon from "@rsuite/icons/SortDown";
// import { AutoComplete, InputGroup } from "rsuite";
// import SearchIcon from "@rsuite/icons/Search";
import VisibleIcon from "../../../../src/assets/icons/VisibleIcon.svg";
import CloseIcon from "../../../../src/assets/icons/VisibleCloseIcon.svg";

import BarchartIcon from "../../../../src/assets/icons/BarIcon.svg";
import WeeklyFareSlider from "./WeeklyFareSlider";
// import Copyitienery from "../../../../src/assets/icons/Copyitinery.svg";
// import Printitienery from "../../../../src/assets/icons/Printitinery.svg";
// import Shareitienery from "../../../../src/assets/icons/Share.svg";
import OnestopIcon from "../../../../src/assets/icons/Onestopicon.svg";
import Flight from "../../../../src/assets/images/RightArrowIconB.svg";
import { useDispatch, useSelector } from "react-redux";
// import { setFlightType } from "../../../features/flightSlice";

import {
  setFlightId,
  setOnwardFlightId,
  setReturnFlightId,
} from "../../../Store/Slice/bookingSlice";
// import { setFlightType } from "../../../Store/Slice/flightSlice";
import { useNavigate } from "react-router-dom";
import TButton from "../../../Component/Common/TButton";
import { AppDispatch, RootState } from "../../../Store/store";
import { BOOKING } from "../../../Utils/Constant/constant";
import { fetchListFlights } from "../../../Api/flightList.api";
import NoRouteFound from "../../NoRouteFound/noRouteFound";
import { fetchRoundTripListFlights } from "../../../Api/flightRound.api";
import {
  // resetSelectedOptions,
  setSelectedOnwardOption,
  setSelectedReturnOption,
} from "../../../Store/Slice/roundTripSelectedFlightDetailsSlice";
import { Option } from "../../../Interfaces/models/flight.model";
import { toast } from "react-toastify";

interface PricingOption {
  fare: string;
  fareIdentifier: string;
  sri: string; // Add sri to the mapped segment
  msri: string;
  id: string;
  code: string;
  seats: number;
  price: string;
  netfare: string;
  breakdown: Breakdown;
  class: string;
}
interface Breakdown {
  baseFare: string;
  adultFare: string;
  taxAndCharges: string;
  userDevelopmentFee: string;
  k3Tax: string;
  airlineMisc: string;
}

interface Segment {
  da: {
    code: string;
    name: string;
    city: string;
  };
  dt: string;
  duration: number;
  stops: number;
  aa: {
    code: string;
    name: string;
  };
}

interface Flight {
  icon: any;
  airline: string;
  departure: string;
  departureLocation: string;
  departureCode: string;
  arrivalCode: string;
  departureDate: string;
  arrivalDate: string;
  duration: string;
  durationDetails: string;
  arrival: string;
  arrivalLocation: string;
  class: string;
  pricingOptions: PricingOption[];
  sI?: Segment[];

  minprice: string;
  seats: number;
}

const createFareDetailsPopover = (
  breakdown: Breakdown,
  option: PricingOption
) => (
  <Popover
    title={
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#F2F4F5",
          padding: "10px",
          borderBottom: "1px solid lightgrey",
          margin: "-10px -10px 0 -10px", // Ensure the title covers full width
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Fareicon}
            alt="Fareicon"
            width={30}
            height={30}
            style={{ marginRight: "8px" }}
          />
          <span>Fare Details</span>
        </div>
      </div>
    }
    style={{
      borderBottom: "1px solid black",
      borderRadius: "10px",
      width: "12%",
    }}
  >
    <div style={{ padding: "10px", width: "100%" }}>
      <div
        style={{ paddingBottom: "10px", borderBottom: "1px solid lightgrey" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <strong>Base Fare</strong>
          <strong>{breakdown?.baseFare}</strong>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#5B5B5B",
            marginBottom: "10px",
          }}
        >
          <span>Adult (1 X {breakdown?.adultFare})</span>
          <span>{breakdown?.adultFare}</span>
        </div>
      </div>

      <div
        style={{
          marginTop: "10px",
          borderBottom: "1px solid lightgrey",
          paddingLeft: "10px",
          paddingBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <strong>Tax & Charges</strong>
          <strong>{breakdown?.taxAndCharges}</strong>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#5B5B5B",
            marginBottom: "10px",
          }}
        >
          <span>User Dev. Fee</span>
          <span>{breakdown?.userDevelopmentFee}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#5B5B5B",
            marginBottom: "10px",
          }}
        >
          <span>K3 Tax</span>
          <span>{breakdown?.k3Tax}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#5B5B5B",
            marginBottom: "10px",
          }}
        >
          <span>Airline Misc</span>
          <span>{breakdown?.airlineMisc}</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "10px",
        }}
      >
        <strong>Total Amount</strong>
        <strong>{option?.price}</strong>
      </div>
    </div>
  </Popover>
);

const FlightContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const passengerDetails = useSelector(
    (state: RootState) => state?.flightBanner
  );
  const flightDetails = useSelector(
    (state: RootState) => state.flightList.data
  );
  const onwardFlights = useSelector(
    (state: RootState) => state.twoWayFlightListData.onwardFlights
  );
  const returnFlights = useSelector(
    (state: RootState) => state.twoWayFlightListData.returnFlights
  );
  const comboFlights = useSelector((state: RootState) => state.twoWayFlightListData?.data?.comboFlights);
  console.log("comboFlights Flight List", comboFlights);
  const filterFlightDetails = useSelector(
    (state: RootState) => state.flightList.formattedData
  );
  const roundWayFlightFilterDetails = useSelector(
    (state: RootState) => state.twoWayFlightListData.formattedOnwardData
  );
  const roudWayFlightReturnFilterDetails = useSelector(
    (state: RootState) => state.twoWayFlightListData.formattedReturnData
  );
  const fromPlace = useSelector(
    (state: RootState) => state?.flightBanner?.departure?.city
  );
  const toPlace = useSelector(
    (state: RootState) => state?.flightBanner?.destination?.city
  );
  const [showFare, setshowFare] = useState<boolean>(false);

  const [showDate, setshowDate] = useState<boolean>(false);
  const [cities, setCities] = useState([1]);
  const [dateOfDeparture, setDateOfDeparture] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const flightType = useSelector((state: any) => state.flight.flightType);
  const [selectedOnwardFlight, setSelectedOnwardFlight] =
    useState<Flight | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] =
    useState<Flight | null>(null);


  // const [selectedOnwardOptions, setSelectedOnwardOptions] = useState<Option | null>(null);
  // const [selectedReturnOptions, setSelectedReturnOptions] = useState<Option | null>(null);
  const [sortConfigOnward, setSortConfigOnward] = useState({
    key: "",
    direction: "",
  });
  const [sortConfigReturn, setSortConfigReturn] = useState({
    key: "",
    direction: "",
  });
  const [sortedOnwardFlights, setSortedOnwardFlights] = useState<Flight[]>([]);
  const [sortedReturnFlights, setSortedReturnFlights] = useState<Flight[]>([]);

  // const [selectedOnwardOptions, setSelectedOnwardOptions] =
  //   useState<Option | null>(null);
  // const [selectedReturnOptions, setSelectedReturnOptions] =
  //   useState<Option | null>(null);
  // const [sortConfigOnward, setSortConfigOnward] = useState({
  //   key: "",
  //   direction: "",
  // });
  // const [sortConfigReturn, setSortConfigReturn] = useState({
  //   key: "",
  //   direction: "",
  // });
  // const [sortedOnwardFlights, setSortedOnwardFlights] = useState<Flight[]>([]);
  // const [sortedReturnFlights, setSortedReturnFlights] = useState<Flight[]>([]);

  const handleBookNow = (
    flight: Flight,
    type: "onward" | "return",
    option: Option
  ) => {
    if (type === "onward") {
      setSelectedOnwardFlight(flight); // Set selected onward flight
      dispatch(setSelectedOnwardOption(option as any)); // Dispatch for onward
    } else if (type === "return") {
      setSelectedReturnFlight(flight);
      dispatch(setSelectedReturnOption(option as any)); // Dispatch for return
    }
  };
  // useEffect(() => {
  //   dispatch(resetSelectedOptions());
  // }, [
  //   dispatch,
  //   sortedOnwardFlights,
  //   onwardFlights,
  //   sortedReturnFlights,
  //   returnFlights,
  // ]);

  useEffect(() => {
    const departureDate = passengerDetails?.departureDate;
    if (departureDate) {
      const formattedDate = new Date(departureDate).toISOString().slice(0, 10);
      setDateOfDeparture(formattedDate);
    }
  }, [passengerDetails]);

  useEffect(() => {
    const returnDate = passengerDetails?.returnDate;
    if (returnDate) {
      const formattedDate = new Date(returnDate).toISOString().slice(0, 10);
      setArrivalDate(formattedDate);
    }
  }, [passengerDetails]);

  useEffect(() => {
    if (dateOfDeparture) {
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
                travelDate: dateOfDeparture,
              },
              {
                fromCityOrAirport: {
                  code: passengerDetails?.destination?.code,
                },
                toCityOrAirport: {
                  code: passengerDetails?.departure?.code,
                },
                travelDate: arrivalDate,
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
                travelDate: dateOfDeparture,
              },
            ],
            searchModifiers: {
              isDirectFlight: true,
              isConnectingFlight: false,
            },
          },
        };
      }

      setLoading(true);
      const fetchFlights =
        flightType === "Round Trip"
          ? fetchRoundTripListFlights
          : fetchListFlights;
      dispatch(fetchFlights(payload))
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching flights:", error);
          setLoading(false);
        });
    } else {
      console.log("dateOfDeparture is not set yet:", dateOfDeparture);
    }
  }, [dispatch, passengerDetails, dateOfDeparture, flightType, arrivalDate]);

  const handleClick = () => {
    setshowFare(!showFare);
  };
  const handleDateClick = () => {
    setshowDate(!showDate);
  };
  const addCity = () => {
    setCities([...cities, cities.length + 1]);
  };

  const sortFlights = (key: string, flightType: "onward" | "return" | "combo") => {
    // Determine sorting configuration based on flight type
    const isReturn = flightType === "return";
    const sortConfig = isReturn ? sortConfigReturn : sortConfigOnward;
    let direction = "ascending";

    // Toggle sorting direction
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    // Update the sorting configuration
    if (isReturn) {
      setSortConfigReturn({ key, direction });
    } else {
      setSortConfigOnward({ key, direction });
    }

    // Determine the correct data to sort
    const flightData = isReturn
      ? returnFlights || roudWayFlightReturnFilterDetails
      : onwardFlights || roundWayFlightFilterDetails;

    // Define getDateWithTime function to parse date and time
    const getDateWithTime = (time: string, travelDate: string) => {
      try {
        const [hours, minutes] = time.split(":");
        const dateObj = new Date(travelDate);
        dateObj.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return dateObj;
      } catch (error) {
        console.error("Error parsing date and time:", error);
        return new Date();
      }
    };

    // Sort the selected flight data
    const sortedData = [...flightData].sort((a, b) => {
      if (key === "price") {
        const priceA = parseInt(a.minprice.replace("₹", "").replace(",", ""));
        const priceB = parseInt(b.minprice.replace("₹", "").replace(",", ""));
        return direction === "ascending" ? priceA - priceB : priceB - priceA;
      } else if (key === "departure") {
        const dateOfDeparture = a.travelDate || "2024-11-15"; // Example fallback date
        const timeA = getDateWithTime(a.departure, dateOfDeparture);
        const timeB = getDateWithTime(b.departure, dateOfDeparture);
        return direction === "ascending"
          ? timeA.getTime() - timeB.getTime()
          : timeB.getTime() - timeA.getTime();
      } else if (key === "arrival") {
        const dateOfDeparture = a.travelDate || "2024-11-15"; // Example fallback date
        const timeA = getDateWithTime(a.arrival, dateOfDeparture);
        const timeB = getDateWithTime(b.arrival, dateOfDeparture);
        return direction === "ascending"
          ? timeA.getTime() - timeB.getTime()
          : timeB.getTime() - timeA.getTime();
      } else if (key === "duration") {
        const durationA = parseInt(
          a.duration.replace("h", "").replace("m", "")
        );
        const durationB = parseInt(
          b.duration.replace("h", "").replace("m", "")
        );
        return direction === "ascending"
          ? durationA - durationB
          : durationB - durationA;
      } else if (key === "airlines") {
        return direction === "ascending"
          ? a.airline.localeCompare(b.airline)
          : b.airline.localeCompare(a.airline);
      }
      return 0;
    });

    // Update the respective sorted state
    if (isReturn) {
      setSortedReturnFlights(sortedData);
    } else {
      setSortedOnwardFlights(sortedData);
    }
  };

  const getSortIcon = (key: string, flightType: "onward" | "return" | "combo") => {
    const sortConfig =
      flightType === "return" ? sortConfigReturn : sortConfigOnward;
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <SortUpIcon />
      ) : (
        <SortDownIcon />
      );
    }
    return <SortUpIcon />;
  };

  useEffect(() => {
    if (flightType === "One Way" && filterFlightDetails) {
      // When filtered flight details for onward flights are available
      setSortedOnwardFlights(filterFlightDetails);
    } else if (flightType === "Round Trip" && roundWayFlightFilterDetails) {
      // When round-trip onward filtered flight details are available
      setSortedOnwardFlights(roundWayFlightFilterDetails);
    } else {
      // Fallback to default onward flights based on flight type
      setSortedOnwardFlights(
        flightType === "One Way" ? flightDetails || [] : onwardFlights || []
      );
    }
  }, [
    flightDetails,
    onwardFlights,
    filterFlightDetails,
    flightType,
    roundWayFlightFilterDetails,
  ]);
  useEffect(() => {
    if (roudWayFlightReturnFilterDetails) {
      setSortedReturnFlights(roudWayFlightReturnFilterDetails);
      // When filtered return flight details are available for round trips
      setSortedReturnFlights(roudWayFlightReturnFilterDetails);
    }
  }, [roudWayFlightReturnFilterDetails]);

  return (
    <div style={{ padding: "20px" }}>
      {flightType === "One Way" && 
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span
              style={{ color: "#222222", fontWeight: "500", fontSize: "16px" }}
            >
              Flights from {fromPlace} → {toPlace}
            </span>
            <span
              style={{ color: "#9E9E9E", fontWeight: "600", fontSize: "14px" }}
            >
              Showing {sortedOnwardFlights?.length || 0} Flights
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "white",
                border: "1px solid white",
                padding: "10px",
                gap: "10px",
                borderRadius: "5px",
              }}
            >
              <img
                src={showFare ? VisibleIcon : CloseIcon}
                alt={showFare ? "Close Icon" : "Visible Icon"}
                width={24}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div>{showDate && <WeeklyFareSlider flightType={flightType} />}</div>
          <div
            className={styles.header}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              backgroundColor: "#fff",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            {["Airlines", "Departure", "Duration", "Arrival", "Price"].map(
              (label, index) => (
                <div
                  key={index}
                  style={{ flex: 1, textAlign: "center", cursor: "pointer" }}
                  onClick={() => sortFlights(label.toLowerCase(), "onward")}
                >
                  {label} {getSortIcon(label.toLowerCase(), "onward")}
                </div>
              )
            )}
          </div>
          <div style={{ position: "relative", minHeight: "300px" }}>
            {loading && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 999,
                }}
              >
                <Loader size="lg" />
              </div>
            )}
            {!loading &&
              (!sortedOnwardFlights || sortedOnwardFlights.length === 0) && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <NoRouteFound />
                </div>
              )}
            {!loading &&
              sortedOnwardFlights?.length > 0 &&
              sortedOnwardFlights.map((flight: Flight, index: any) => (
                <FlightCard
                  key={index}
                  flight={flight}
                  index={index}
                  showFare={showFare}
                />
              ))}
          </div>
        </div> }

       {flightType === "Round Trip" &&
        onwardFlights && onwardFlights?.length > 0 || returnFlights && returnFlights?.length > 0 ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span
              style={{ color: "#222222", fontWeight: "500", fontSize: "16px" }}
            >
              Flights from {fromPlace}
              <img
                src={TwoWayIcon}
                alt="Two Way Icon"
                style={{ width: "25px", height: "25px", margin: "0 5px" }}
              />
              {toPlace}
            </span>
            <span
              style={{ color: "#9E9E9E", fontWeight: "600", fontSize: "14px" }}
            >
              Showing {onwardFlights?.length || 0} Onward Flights and{" "}
              {returnFlights?.length || 0} Return Flights
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "white",
                border: "1px solid white",
                padding: "10px",
                gap: "10px",
                borderRadius: "5px",
              }}
            >
              <img
                src={VisibleIcon}
                alt="VisibleIcon"
                width={24}
                onClick={handleClick}
              />
              <img
                src={BarchartIcon}
                alt="BarchartIcon"
                width={17}
                onClick={handleDateClick}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "0 0 calc(50% - 10px)", marginRight: "10px" }}>
              <h4>Departure Flight</h4>
              {showDate && <WeeklyFareSlider flightType={flightType} />}
              <div
                className={styles.header}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                }}
              >
                {["Airlines", "Departure", "Duration", "Arrival", "Price"].map(
                  (label: string, index: number) => (
                    <div
                      key={index}
                      style={{
                        fontSize: "0.8em",
                        flex: label === "Departure" ? "3" : "2",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => sortFlights(label.toLowerCase(), "onward")}
                    >
                      {label} {getSortIcon(label.toLowerCase(), "onward")}
                    </div>
                  )
                )}
              </div>
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "53%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 999,
                  }}
                >
                  <Loader size="lg" />
                </div>
              )}

              {!loading && (!onwardFlights || onwardFlights.length === 0) && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <NoRouteFound />
                </div>
              )}
              {!loading && (
                <>
                  {(sortedOnwardFlights?.length > 0
                    ? sortedOnwardFlights
                    : onwardFlights
                  )?.map((flight: any, index: number) => (
                    <FlightTwoWayCard
                      key={index}
                      flight={flight}
                      index={index}
                      // showFare={showFare}
                      selectedOnwardFlight={selectedOnwardFlight}
                      selectedReturnFlight={selectedReturnFlight}
                      showFare={showFare}
                      onBookNow={(flight, option: any) =>
                        handleBookNow(flight, "onward", option)
                      }
                      type="onward"
                    />
                  ))}
                  {/* Handle no flights available case */}
                  {sortedOnwardFlights?.length === 0 &&
                    onwardFlights?.length === 0 && (
                      <div style={{ padding: "20px", textAlign: "center" }}>
                        No flights available.
                      </div>
                    )}
                </>
              )}
            </div>
            <div style={{ flex: "0 0 calc(50% - 10px)" }}>
              <h4>Return Flight</h4>
              {showDate && <WeeklyFareSlider flightType={flightType} />}
              <div
                className={styles.header}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                }}
              >
                {["Airlines", "Departure", "Duration", "Arrival", "Price"].map(
                  (label: string, index: number) => (
                    <div
                      key={index}
                      style={{
                        fontSize: "0.8em",
                        flex: label === "Departure" ? "3" : "2",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => sortFlights(label.toLowerCase(), "return")}
                    >
                      {label} {getSortIcon(label.toLowerCase(), "return")}
                    </div>
                  )
                )}
              </div>
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "28%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 999,
                  }}
                >
                  <Loader size="lg" />
                </div>
              )}
              {!loading && (!returnFlights || returnFlights.length === 0) && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <NoRouteFound />
                </div>
              )}
              {!loading && (
                <>
                  {(sortedReturnFlights?.length > 0
                    ? sortedReturnFlights
                    : returnFlights
                  )?.map((flight: any, index: number) => (
                    <FlightTwoWayCard
                      key={index}
                      flight={flight}
                      selectedOnwardFlight={selectedOnwardFlight}
                      selectedReturnFlight={selectedReturnFlight}
                      index={index}
                      showFare={showFare}
                      onBookNow={(flight, option: any) =>
                        handleBookNow(flight, "return", option)
                      }
                      type="return"
                    />
                  ))}
                  {/* Handle no flights available case */}
                  {sortedReturnFlights?.length === 0 &&
                    returnFlights?.length === 0 && (
                      <div style={{ padding: "20px", textAlign: "center" }}>
                        No flights available.
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </div>

      ): comboFlights && comboFlights.length > 0 ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span
              style={{ color: "#222222", fontWeight: "500", fontSize: "16px" }}
            >
              Flights from {fromPlace} → {toPlace}
              
            </span>
            <span
              style={{ color: "#9E9E9E", fontWeight: "600", fontSize: "14px" }}
            >
              Showing {comboFlights?.length || 0} Combo Flights
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "white",
                border: "1px solid white",
                padding: "10px",
                gap: "10px",
                borderRadius: "5px",
              }}
            >
              <img
                src={showFare ? VisibleIcon : CloseIcon}
                alt={showFare ? "Close Icon" : "Visible Icon"}
                width={24}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div>{showDate && <WeeklyFareSlider flightType={flightType} />}</div>
          <div
            className={styles.header}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              backgroundColor: "#fff",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            {["Airlines", "Departure", "Duration", "Arrival", "Price"].map(
              (label, index) => (
                <div
                  key={index}
                  style={{ flex: 1, textAlign: "center", cursor: "pointer" }}
                  onClick={() => sortFlights(label.toLowerCase(), "combo")}
                >
                  {label} {getSortIcon(label.toLowerCase(), "combo")}
                </div>
              )
            )}
          </div>
          <div style={{ position: "relative", minHeight: "300px" }}>
            {loading && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 999,
                }}
              >
                <Loader size="lg" />
              </div>
            )}
            {!loading &&
              (!comboFlights || comboFlights.length === 0) && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <NoRouteFound />
                </div>
              )}
            {!loading &&
              (comboFlights?.length ?? 0) > 0 &&
              comboFlights?.map((flight: any, index: any) => (
                <ComboCard
                  key={index}
                  flight={flight}
                  index={index}
                  showFare={showFare}
                />
              ))}
          </div>
        </div>
      
      ): null};

      {flightType === "Multi City" &&
        <div>
          {/* Multi City Flight Content */}
          {cities.length < 3 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={addCity} style={{ cursor: "pointer" }}>
                Add City <img src={Flight} width={16} height={16} alt="Add" />
              </button>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            {/* Loop through cities for Multi City flights */}
            {cities.map((city, cityIndex) => (
              <div
                key={cityIndex}
                style={{ flex: "0 0 calc(50% - 10px)", marginRight: "10px" }}
              >
                <h4>
                  Flight {cityIndex + 1}: From {city} → {city}
                </h4>
                {showDate && <WeeklyFareSlider flightType={""} />}
                <div
                  className={styles.header}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    backgroundColor: "#fff",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                  }}
                >
                  {[
                    "Airlines",
                    "Departure",
                    "Duration",
                    "Arrival",
                    "Price",
                  ].map((label, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: "0.9em",
                        flex: 1,
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => sortFlights(label.toLowerCase(), "onward")}
                    >
                      {label} {getSortIcon(label.toLowerCase(), "onward")}
                    </div>
                  ))}
                </div>
                {sortedOnwardFlights
                  ?.slice(0, Math.ceil(sortedOnwardFlights.length / 2))
                  .map((flight: Flight, index) => (
                    <FlightCard
                      key={index}
                      flight={flight}
                      showFare={showFare}
                      index={0}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

const FlightCard: React.FC<{
  flight: Flight;
  index?: number;
  showFare: boolean;
}> = ({ flight, showFare }) => {
  const [showPricingOptions, setShowPricingOptions] = useState(false);

  const airlineCode = flight.icon.split("/").pop().split(".")[0];

  return (
    <div className={styles.text}>
      <Panel
        className={styles.border}
        style={{ marginBottom: "10px", backgroundColor: "#fff" }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
            <h5>
              <span style={{ flex: "0 0 auto", marginRight: "10px" }}>
                <img
                  src={`https://static.tripjack.com/img/airlineLogo/v1/${airlineCode}.png`}
                  alt="Airline Icon"
                  width={28.65}
                  height={28.65}
                  style={{ borderRadius: "4px", marginRight: "10px" }}
                />

                {flight.airline}
              </span>
            </h5>
          </div>
          <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
            <p
              style={{ fontSize: "22px", fontWeight: "600", color: "#222222" }}
            >
              {flight.departure}
            </p>
            <p style={{ color: "#9E9E9E", textAlign: "center" }}>
              {flight.departureLocation}
            </p>
          </div>
          <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
            <p
              style={{ fontSize: "22px", fontWeight: "600", color: "#222222" }}
            >
              {flight.duration}
            </p>
            <p>
              {flight.durationDetails === "Non Stop" ? (
                <img src={stop} alt="rect" />
              ) : (
                <img src={OnestopIcon} alt="rect" />
              )}
            </p>
            <p style={{ color: "#9E9E9E", textAlign: "center" }}>
              {flight.durationDetails}
            </p>
          </div>
          <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
            <p
              style={{ fontSize: "22px", fontWeight: "600", color: "#222222" }}
            >
              {flight.arrival}
            </p>
            <p style={{ color: "#9E9E9E", textAlign: "center" }}>
              {flight.arrivalLocation}
            </p>
          </div>
          <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
            <div
              style={{ fontSize: "22px", fontWeight: "600", color: "#222222" }}
            >
              <p style={{ position: "relative", display: "inline-block" }}>
                {flight.minprice}{" "}
                <Whisper
                  trigger="hover"
                  placement="bottomEnd"
                  speaker={createFareDetailsPopover(
                    flight.pricingOptions[0].breakdown,
                    flight.pricingOptions[0]
                  )}
                >
                  <img
                    src={Iicon}
                    alt="I-icon"
                    width={15}
                    height={15}
                    style={{
                      position: "absolute",
                      top: "-5px", // Adjust as needed
                      right: "-20px", // Adjust as needed
                      cursor: "pointer",
                    }}
                  />
                </Whisper>
              </p>
            </div>
            <Button
              appearance="link"
              onClick={() => setShowPricingOptions(!showPricingOptions)}
              style={{
                textDecoration: "none",
                color: "#0770E3",
                fontWeight: "600",
              }}
            >
              View Fares <ArrowDownLineIcon />
            </Button>
          </div>
        </div>
        {showPricingOptions && (
          <Panel bordered style={{ backgroundColor: "#fbfbfb" }}>
            {flight.pricingOptions.map((option, optionIndex) => (
              <PricingOptionRow
                key={optionIndex}
                flight={flight}
                option={option}
                showFare={showFare}
              // flightId={flight.id}
              />
            ))}
          </Panel>
        )}
      </Panel>
      {/* {index === 1 && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Image
            src={ListBanner}
            alt="Promotional Banner"
            width="1055"
            height="160"
            style={{ objectFit: "cover" }}
          />
        </div>
      )} */}
    </div>
  );
};

const ComboCard: React.FC<{
  flight: Flight;
  index?: number;
  showFare: boolean;
}> = ({ flight, showFare }) => {
  const [showPricingOptions, setShowPricingOptions] = useState(false);

  const airlineCode = flight.icon.split("/").pop().split(".")[0];

  return (
    <div className={styles.text}>
      <Panel
        className={styles.border}
        style={{ marginBottom: "10px", backgroundColor: "#fff" }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
            <h5>
              <span style={{ flex: "0 0 auto", marginRight: "10px" }}>
                <img
                  src={`https://static.tripjack.com/img/airlineLogo/v1/${airlineCode}.png`}
                  alt="Airline Icon"
                  width={28.65}
                  height={28.65}
                  style={{ borderRadius: "4px", marginRight: "10px" }}
                />
                {flight.airline}
              </span>
            </h5>
          </div>
        </div>
        {flight.sI && flight.sI.map((segment: Segment, segmentIndex: number) => (
          <div key={segmentIndex} style={{ display: "flex" }}>
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <p
                style={{ fontSize: "22px", fontWeight: "600", color: "#222222" }}
              >
                {segment.da.code}
              </p>
              <p style={{ color: "#9E9E9E", textAlign: "center" }}>
                {segment.da.name}
              </p>
            </div>
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <p
                style={{ fontSize: "22px", fontWeight: "600", color: "#222222" }}
              >
                {segment.dt}
              </p>
              <p style={{ color: "#9E9E9E", textAlign: "center" }}>
                {segment.da.city}
              </p>
            </div>
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <p
                style={{ fontSize: "22px", fontWeight: "600", color: "#222222" }}
              >
                {segment.duration} mins
              </p>
              <p>
                {segment.stops === 0 ? (
                  <img src={stop} alt="rect" />
                ) : (
                  <img src={OnestopIcon} alt="rect" />
                )}
              </p>
              <p style={{ color: "#9E9E9E", textAlign: "center" }}>
                {segment.stops === 0 ? "Non Stop" : `${segment.stops} Stop`}
              </p>
            </div>
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <p
                style={{ fontSize: "22px", fontWeight: "600", color: "#222222" }}
              >
                {segment.aa.code}
              </p>
              <p style={{ color: "#9E9E9E", textAlign: "center" }}>
                {segment.aa.name}
              </p>
            </div>
          </div>
        ))}
        <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
          <div
            style={{ fontSize: "22px", fontWeight: "600", color: "#222222" }}
          >
            <p style={{ position: "relative", display: "inline-block" }}>
              {flight.minprice}{" "}
              <Whisper
                trigger="hover"
                placement="bottomEnd"
                speaker={createFareDetailsPopover(
                  flight.pricingOptions[0].breakdown,
                  flight.pricingOptions[0]
                )}
              >
                <img
                  src={Iicon}
                  alt="I-icon"
                  width={15}
                  height={15}
                  style={{
                    position: "absolute",
                    top: "-5px", // Adjust as needed
                    right: "-20px", // Adjust as needed
                    cursor: "pointer",
                  }}
                />
              </Whisper>
            </p>
          </div>
          <Button
            appearance="link"
            onClick={() => setShowPricingOptions(!showPricingOptions)}
            style={{
              textDecoration: "none",
              color: "#0770E3",
              fontWeight: "600",
            }}
          >
            View Fares <ArrowDownLineIcon />
          </Button>
        </div>
        {showPricingOptions && (
          <Panel bordered style={{ backgroundColor: "#fbfbfb" }}>
            {flight.pricingOptions.map((option, optionIndex) => (
              <PricingOptionRow
                key={optionIndex}
                flight={flight}
                option={option}
                showFare={showFare}
              />
            ))}
          </Panel>
        )}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <TButton label="Book Now" onClick={() => handleBookNow(flight.id)} />
        </div>
      </Panel>
    </div>
  );
};

const PricingOptionRow: React.FC<{
  option: PricingOption;
  flight: Flight;
  showFare: boolean;
  // flightId: string;
}> = ({ option, showFare, flight }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const handleOpen = (flight: any) => {
    setSelectedFlight(flight);
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);

  const flightType = useSelector((state: any) => state.flight.flightType);

  useEffect(() => {
  }, [flightType]);

  const handleBookNow = (flightId: string) => {
    dispatch(setFlightId(flightId));

    navigate(BOOKING);
  };

  return (
    <div
      className={styles.text}
      style={{ padding: "2px 10px 10px", borderBottom: "1px solid #c7c7c7" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{ flex: flightType === "One Way" ? 1 : 3, textAlign: "left" }}
        >
          <p style={{ fontSize: "15px", fontWeight: "600", color: "#222222" }}>
            {option.class}
          </p>
          <p style={{ color: "#9E9E9E", fontWeight: "600", fontSize: "14px" }}>
            {option.code}
          </p>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontSize: "16px", fontWeight: "500", color: "#222222" }}>
            <span style={{ flex: "0 0 auto", marginRight: "10px" }}>
              <img
                src={Seats} // Use flight.icon here
                alt="Airline Icon"
                width={20}
                height={20}
                style={{ borderRadius: "4px", marginRight: "5px" }} // Optional: square shape
              />
              {option.seats}
            </span>
            Seats
          </p>
        </div>
        <div
          style={{
            flex: flightType === "One Way" ? 1 : 3,
            textAlign: "center",
          }}
        >

          <Button
            appearance="link"
            style={{
              textDecoration: "none",
              color: "#0770E3",
              fontWeight: "600",
              textWrap: flightType === "One Way" ? "nowrap" : "wrap",
            }}
            onClick={() => handleOpen(flight)}
          >
            View Flight Details
          </Button>
          <FlightDetailspopup open={openModal} onClose={handleClose} flight={selectedFlight} />
        </div>
        <div
          style={{
            flex: flightType === "One Way" ? 1 : 4,
            textAlign: "center",
          }}
        >
          <p
            style={{
              position: "relative",
              display: "inline-block",
              fontSize: "22px",
              fontWeight: "600",
              color: "#222222",
            }}
          >
            ₹{option.price}{" "}
            <Whisper
              trigger="hover"
              placement="bottomEnd"
              speaker={createFareDetailsPopover(option.breakdown, option)}
            >
              <img
                src={Iicon}
                alt="I-icon"
                width={15}
                height={15}
                style={{
                  position: "absolute",
                  top: "-5px", // Adjust as needed
                  right: "-20px", // Adjust as needed
                  cursor: "pointer",
                }}
              />
            </Whisper>
          </p>
          {showFare && (
            <div style={{ color: "green" }}>Net Fare: ₹{option.netfare}</div>
          )}
        </div>

        <div
          style={{
            flex: flightType === "One Way" ? 1 : 5,
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Button */}
          <TButton label="Book Now" onClick={() => handleBookNow(option.id)} />

          {/* Hidden icons (initially) */}
          {/* <div className={styles.Copyitienery}>
            <div style={{ flex: 1, flexDirection: "row" }}>
              <div style={{ cursor: "pointer" }}>
                <Image src={Copyitienery} alt="Copy Itinerary" />
              </div>
              <div style={{ cursor: "pointer" }}>
                <Image src={Printitienery} alt="Print Itinerary" />
              </div>
              <div style={{ cursor: "pointer" }}>
                <Image src={Shareitienery} alt="Share Itinerary" />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
const FlightTwoWayCard: React.FC<{
  flight: Flight;
  index?: number;
  showFare: boolean;
  onBookNow: (
    flight: Flight,
    type: "onward" | "return",
    option: PricingOption
  ) => void;
  type: "onward" | "return";
  selectedOnwardFlight: Flight | null;
  selectedReturnFlight: Flight | null;
}> = ({
  flight,
  showFare,
  onBookNow,
  type,
  selectedOnwardFlight,
  selectedReturnFlight,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPricingOptions, setShowPricingOptions] = useState(false);
    // const [selectedOnwardOptionState, setSelectedOnwardOptionState] = useState<PricingOption | null>(null);
    // const [selectedReturnOptionState, setSelectedReturnOptionState] = useState<PricingOption | null>(null);
    const airlineCode = flight.icon.split("/").pop().split(".")[0];
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    // useEffect(() => {
    //   dispatch(resetSelectedOptions());
    // }, [dispatch, flight, type]);

    const handleBookNow = (option: any, type: "onward" | "return") => {
      setSelectedOptionId(option.id);
      if (type === "onward") {
        //setSelectedOnwardOptionState(option);
        dispatch(setSelectedOnwardOption({ ...option, id: Number(option.id) }));
      } else if (type === "return") {
        //setSelectedReturnOptionState(option);
        dispatch(setSelectedReturnOption({ ...option, id: Number(option.id) }));
      }
      onBookNow(flight, type, option);
    };
    const handleMakePayment = (
      onwardOptionId: string,
      returnOptionId: string
    ) => {
      if (onwardOptionId) {
        dispatch(setOnwardFlightId(onwardOptionId));
      }
      if (returnOptionId) {
        dispatch(setReturnFlightId(returnOptionId));
      }

      navigate(BOOKING);
    };
    const selectedOnwardOptionState = useSelector(
      (state: any) => state.roundTripSelectedFlightDetails.selectedOnwardOption
    );
    const selectedReturnOptionState = useSelector(
      (state: any) => state.roundTripSelectedFlightDetails.selectedReturnOption
    );
    return (
      <div className={styles.text}>
        <Panel
          className={styles.border}
          style={{ marginBottom: "10px", backgroundColor: "#fff" }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <span style={{ flex: "0 0 auto", marginRight: "10px" }}>
                <img
                  src={`https://static.tripjack.com/img/airlineLogo/v1/${airlineCode}.png`}
                  alt="Airline Icon"
                  width={28.65}
                  height={28.65}
                  style={{ borderRadius: "4px", marginRight: "10px" }}
                />
              </span>
              <h6>{flight.airline}</h6>
            </div>
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <p
                style={{ fontSize: "18px", fontWeight: "600", color: "#222222" }}
              >
                {flight.departure}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#9E9E9E",
                  textAlign: "center",
                }}
              >
                {flight.departureLocation}
              </p>
            </div>
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <p
                style={{ fontSize: "18px", fontWeight: "600", color: "#222222" }}
              >
                {flight.duration}
              </p>
              <p>
                {flight.durationDetails === "Non Stop" ? (
                  <img src={stop} alt="rect" />
                ) : (
                  <img src={OnestopIcon} alt="rect" />
                )}
              </p>
              <p
                style={{
                  fontSize: "10px",
                  color: "#9E9E9E",
                  textAlign: "center",
                }}
              >
                {flight.durationDetails}
              </p>
            </div>
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <p
                style={{ fontSize: "18px", fontWeight: "600", color: "#222222" }}
              >
                {flight.arrival}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#9E9E9E",
                  textAlign: "center",
                }}
              >
                {flight.arrivalLocation}
              </p>
            </div>
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <div
                style={{ fontSize: "18px", fontWeight: "600", color: "#222222" }}
              >
                <p style={{ position: "relative", display: "inline-block" }}>
                  {flight.minprice}{" "}
                  <Whisper
                    trigger="hover"
                    placement="bottomEnd"
                    speaker={createFareDetailsPopover(
                      flight.pricingOptions[0].breakdown,
                      flight.pricingOptions[0]
                    )}
                  >
                    <img
                      src={Iicon}
                      alt="I-icon"
                      width={15}
                      height={15}
                      style={{
                        position: "absolute",
                        top: "-5px", // Adjust as needed
                        right: "-20px", // Adjust as needed
                        cursor: "pointer",
                      }}
                    />
                  </Whisper>
                </p>
              </div>
              <Button
                appearance="link"
                onClick={() => setShowPricingOptions(!showPricingOptions)}
                style={{
                  textDecoration: "none",
                  color: "#0770E3",
                  fontWeight: "600",
                }}
              >
                View Fares <ArrowDownLineIcon />
              </Button>
            </div>
          </div>
          {showPricingOptions && (
            <Panel bordered style={{ backgroundColor: "#fbfbfb" }}>
              {flight.pricingOptions.map((option, optionIndex) => (
                <PricingOptionRoundTripRow
                  key={optionIndex}
                  flight={flight}
                  type={type}
                  option={option}
                  selectedOptionId={selectedOptionId}
                  showFare={showFare}
                  onBookNow={handleBookNow}
                />
              ))}
            </Panel>
          )}
        </Panel>
        {(selectedOnwardOptionState || selectedReturnOptionState) && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "20px",
              fontSize: "14px",
              background: "#fff",
              padding: "20px",
              boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <span style={{ flex: "0 0 auto", marginRight: "10px" }}>
                  <img
                    src={`https://static.tripjack.com/img/airlineLogo/v1/${selectedOnwardFlight?.icon.split("/").pop().split(".")[0]
                      }.png`}
                    alt="Airline Icon"
                    width={28.65}
                    height={28.65}
                    style={{ borderRadius: "4px", marginRight: "10px" }}
                  />
                </span>
                <h6>{selectedOnwardFlight?.airline}</h6>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  {selectedOnwardFlight?.departure}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#9E9E9E",
                    textAlign: "center",
                  }}
                >
                  {selectedOnwardFlight?.departureLocation}
                </p>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  {selectedOnwardFlight?.duration}
                </p>
                <p>
                  {selectedOnwardFlight?.durationDetails === "Non Stop" ? (
                    <img src={stop} alt="rect" />
                  ) : (
                    <img src={OnestopIcon} alt="rect" />
                  )}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#9E9E9E",
                    textAlign: "center",
                  }}
                >
                  {selectedOnwardFlight?.durationDetails}
                </p>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  {selectedOnwardFlight?.arrival}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#9E9E9E",
                    textAlign: "center",
                  }}
                >
                  {selectedOnwardFlight?.arrivalLocation}
                </p>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  <p style={{ position: "relative", display: "inline-block" }}>
                    ₹{selectedOnwardOptionState?.price}
                  </p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <span style={{ flex: "0 0 auto", marginRight: "10px" }}>
                  <img
                    src={`https://static.tripjack.com/img/airlineLogo/v1/${selectedReturnFlight?.icon.split("/").pop().split(".")[0]
                      }.png`}
                    alt="Airline Icon"
                    width={28.65}
                    height={28.65}
                    style={{ borderRadius: "4px", marginRight: "10px" }}
                  />
                </span>
                <h6>{selectedReturnFlight?.airline}</h6>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  {selectedReturnFlight?.departure}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#9E9E9E",
                    textAlign: "center",
                  }}
                >
                  {selectedReturnFlight?.departureLocation}
                </p>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  {selectedReturnFlight?.duration}
                </p>
                <p>
                  {selectedReturnFlight?.durationDetails === "Non Stop" ? (
                    <img src={stop} alt="rect" />
                  ) : (
                    <img src={OnestopIcon} alt="rect" />
                  )}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#9E9E9E",
                    textAlign: "center",
                  }}
                >
                  {selectedReturnFlight?.durationDetails}
                </p>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  {selectedReturnFlight?.arrival}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#9E9E9E",
                    textAlign: "center",
                  }}
                >
                  {selectedReturnFlight?.arrivalLocation}
                </p>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  <p style={{ position: "relative", display: "inline-block" }}>
                    ₹{selectedReturnOptionState?.price}
                  </p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontWeight: 700, marginRight: "20px" }}>
                ₹
                {[selectedOnwardOptionState, selectedReturnOptionState]
                  .filter(Boolean)
                  .reduce((total, option) => total + option.price, 0)}
              </span>
              <TButton
                label="Confirm Payment"
                onClick={() =>
                  handleMakePayment(
                    selectedOnwardOptionState?.id,
                    selectedReturnOptionState?.id
                  )
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  };
const PricingOptionRoundTripRow: React.FC<{
  option: PricingOption;
  flight: Flight;
  type: "onward" | "return";
  showFare: boolean;
  selectedOptionId: string | null;
  onBookNow: (option: PricingOption, type: "onward" | "return") => void;
}> = ({ option, type, showFare, onBookNow, selectedOptionId,flight }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selectedOnwardOptionState = useSelector(
    (state: any) => state.roundTripSelectedFlightDetails.selectedOnwardOption
  );
  console.log("selectedOnwardOptionState", selectedOnwardOptionState);
  const selectedReturnOptionState = useSelector(
    (state: any) => state.roundTripSelectedFlightDetails.selectedReturnOption
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const handleOpen = (flight: any) => {
    setSelectedFlight(flight);
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();

  const handleBookNow = () => {
    onBookNow(option, type);
    if (type === 'onward') {
      setSelectedOption(option.id);
      dispatch(setSelectedOnwardOption(option as any));
    } else if (type === 'return') {
      setSelectedOption(option.id);
      dispatch(setSelectedReturnOption(option as any));
      if (selectedOnwardOptionState && selectedOnwardOptionState.sri) {
        const onwardSri = selectedOnwardOptionState.sri;
        if (option.msri.includes(onwardSri)) {
          toast.success("Special Return you have choosen was correct");
        } else {
          toast.info("Choose correct Special Return");
        }
      }
    }
  };



  const transformClassName = (className: string) => {
    if (className === "PREMIUM_ECONOMY") {
      return "PREM_ECM";
    }
    return className;
  };
  const transformFareName = (fareIdentifier: string) => {
    if (fareIdentifier === "ECO VALUE" || fareIdentifier === "ECO CLASSIC" || fareIdentifier === "ECO FLEX") {
      return "PUBLISHED";
    }
    return fareIdentifier;
  };
  const getLabelColor = (fareIdentifier: string) => {
    return fareIdentifier === "SPECIAL_RETURN" ? "orange" : "green";
  };
  const isBookNowDisabled = () => {
    if (
      (type === 'return' && selectedOnwardOptionState?.fareIdentifier === "SPECIAL_RETURN" &&
        (option.fareIdentifier === "PUBLISHED" || option.fareIdentifier === "ECO VALUE" || option.fareIdentifier === "ECO CLASSIC" || option.fareIdentifier === "ECO FLEX")) ||
      (type === 'return' && selectedOnwardOptionState?.fareIdentifier === "PUBLISHED" && option.fareIdentifier === "SPECIAL_RETURN")
      // (type === 'onward' && selectedReturnOptionState?.fareIdentifier === "SPECIAL_RETURN" && option.fareIdentifier === "PUBLISHED") ||
      // (type === 'onward' && selectedReturnOptionState?.fareIdentifier === "PUBLISHED" && option.fareIdentifier === "SPECIAL_RETURN")
    ) {
      return true;
    }
    return false;
  };
  console.log("selectedOptionId123", selectedOptionId)

  return (
    <div
      className={styles.text}
      style={{
        padding: "2px 10px 10px",
        borderBottom: "1px solid #c7c7c7",

        border: type === "onward" && selectedOnwardOptionState?.id === option.id
          ? "2px solid #0770E3"
          : type === "return" && selectedReturnOptionState?.id === option.id
            ? "2px solid #0770E3"
            : "none",
        backgroundColor: type === "onward" && selectedOnwardOptionState?.id === option.id
          ? "#f0f8ff"
          : type === "return" && selectedReturnOptionState?.id === option.id
            ? "#f0f8ff"
            : "transparent",


      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 3, textAlign: "left" }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#222222" }}>
            {transformClassName(option.class)}
            <Tag color={getLabelColor(option.fareIdentifier)} style={{ color: "white", fontSize: "9px" }}>
              {transformFareName(option.fareIdentifier)}
            </Tag>
          </p>
          <p style={{ color: "#9E9E9E", fontWeight: "600", fontSize: "13px" }}>
            {option.code}
          </p>
        </div>
        <div style={{ flex: 6, textAlign: "center" }}>
          <p style={{ fontSize: "13px", fontWeight: "500", color: "#222222" }}>
            <span style={{ flex: "0 0 auto" }}>
              <img
                src={Seats} // Use flight.icon here
                alt="Airline Icon"
                width={20}
                height={20}
                style={{ borderRadius: "4px" }} // Optional: square shape
              />
            </span>
            {option.seats} Seats
          </p>
          <div
            style={{
              flex: 3,
              textAlign: "center",
            }}
          >
            <Button
              appearance="link"
              style={{
                textDecoration: "none",
                color: "#0770E3",
                fontWeight: "600",
                fontSize: "11px",
                textWrap: "wrap",
              }}
              onClick={() => handleOpen(flight)}
            >
              View Flight Details
            </Button>
            <FlightDetailspopup open={openModal} onClose={handleClose} flight={selectedFlight} />
          </div>
        </div>

        <div
          style={{
            flex: 4,
            textAlign: "center",
          }}
        >
          <p
            style={{
              position: "relative",
              display: "inline-block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#222222",
            }}
          >
            ₹{option.price}{" "}
            <Whisper
              trigger="hover"
              placement="bottomEnd"
              speaker={createFareDetailsPopover(option.breakdown, option)}
            >
              <img
                src={Iicon}
                alt="I-icon"
                width={15}
                height={15}
                style={{
                  position: "absolute",
                  top: "-5px", 
                  right: "-20px", 
                  cursor: "pointer",
                }}
              />
            </Whisper>
          </p>
          {showFare && (
            <div style={{ color: "green", fontSize: "11px" }}>
              Net Fare: ₹{option.netfare}
            </div>
          )}
        </div>

        <div
          style={{
            flex: 5,
            textAlign: "center",
            position: "relative",
          }}
        >
          <TButton label="Book Now" padding={"6px"} onClick={handleBookNow} disabled={isBookNowDisabled()} />
        </div>
      </div>
    </div>
  );
};
export default FlightContent;
