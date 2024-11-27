/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import { Panel, Slider, Accordion, Placeholder } from "rsuite";
import styles from "../../../../src/assets/styles/flight-content.module.css";
import {
  fetchTwoWayFilterFlightListReturnSuccess,
  fetchTwoWayFilterFlightListSuccess,
} from "../../../Store/Slice/twoWayFlightListSlice";
import { IRoundTripFilter } from "../../../Interfaces/UI/flightList";

const FlightTwoPanel: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector(
    (state: RootState) => state.twoWayFlightListData.dynamicFilters || {}
  );
  const FlightData = useSelector(
    (state: RootState) =>
      state.twoWayFlightListData.data || {
        onwardFlights: [],
        returnFlights: [],
      }
  );
  const [checkedAirlines, setCheckedAirlines] = useState<string[]>([]);
  const [checkedFareTypes, setCheckedFareTypes] = useState<string[]>([]);
  const [checkedStops, setCheckedStops] = useState<number[]>([]);
  const [checkedTravelDates, setCheckedTravelDates] = useState<string[]>([]);
  const [checkedStopoverAirports, setCheckedStopoverAirports] = useState<
    string[]
  >([]);
  const [checkedReturnDates, setCheckedReturnTravelDates] = useState<string[]>(
    []
  );
  const [durationRange, setDurationRange] = useState<number[]>([
    filters.duration?.minValue || 0,
    filters.duration?.maxValue || 1000,
  ]);
  const [travelDirection, setTravelDirection] = useState<"onward" | "return">(
    "onward"
  );
  const [filteredFlightData, setFilteredFlightData] = useState<
    IRoundTripFilter[]
  >([]);
  const [fareRange, setFareRange] = useState<number[]>([0, 10000]);
  const [sliderValue, setSliderValue] = useState<number>(fareRange[1]);

  const getTimeFromDate = (dateString: string) => {
    if (!dateString || typeof dateString !== "string") return "";
    const dateParts = dateString.split(" ");
    const timeParts = dateParts[0].split(":");
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const period = dateParts[1];
    let hours24 = hours;
    if (period === "PM" && hours !== 12) {
      hours24 += 12;
    } else if (period === "AM" && hours === 12) {
      hours24 = 0;
    }
    const today = new Date();
    today.setHours(hours24);
    today.setMinutes(minutes);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return today.toLocaleTimeString([], options);
  };

  useEffect(() => {
    if (!FlightData || FlightData.length === 0) return;
    if (filters.duration) {
      setDurationRange([
        filters.duration.minValue || 0,
        filters.duration.maxValue || 1000,
      ]);
    }
  }, [filters, FlightData]);

  useEffect(() => {
    if (
      FlightData.onwardFlights?.length > 0 ||
      FlightData.returnFlights?.length > 0
    ) {
      const selectedFlightData =
        travelDirection === "onward"
          ? FlightData.onwardFlights
          : FlightData.returnFlights;
      const fares = selectedFlightData.map(
        (flight: IRoundTripFilter) =>
          parseFloat(flight.minprice.replace("₹", "").replace(",", "")) || 0
      );
      const pricingOptionFares = selectedFlightData.flatMap(
        (flight: IRoundTripFilter) =>
          flight.pricingOptions.map((option) => option.price || 0)
      );
      const minFare = Math.min(...fares, ...pricingOptionFares);
      const maxFare = Math.max(...fares, ...pricingOptionFares);
      setFareRange([minFare, maxFare]);
      setSliderValue(maxFare);
    }
  }, [FlightData, travelDirection]);

  useEffect(() => {
    const filterFlightData = () => {
      const selectedFlightData =
        travelDirection === "onward"
          ? FlightData.onwardFlights || []
          : FlightData.returnFlights || [];
      return selectedFlightData.filter((flight: any) => {
        const airlineMatch =
          checkedAirlines.length === 0 ||
          checkedAirlines.includes(flight.airline);
        const fareTypeMatch =
          checkedFareTypes.length === 0 ||
          checkedFareTypes.includes(flight.class) ||
          flight.pricingOptions?.some((option: any) =>
            checkedFareTypes.includes(option.class)
          );
        const stopMatch =
          checkedStops.length === 0 ||
          checkedStops.includes(
            flight.durationDetails.includes("Non Stop")
              ? 0
              : parseInt(flight.durationDetails)
          );
        const getFormattedTime = (timeString: string) => {
          const date = new Date(timeString);
          const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          };
          return date.toLocaleTimeString([], options);
        };
        const travelDepartureMatch =
          checkedTravelDates.length === 0 ||
          checkedTravelDates.some((date) => {
            const formattedArrivalTime = getTimeFromDate(
              flight.departure
            ).trim();
            const formattedCheckedDate = getFormattedTime(date).trim();
            return formattedArrivalTime === formattedCheckedDate;
          });
        const travelReturnMatch =
          checkedReturnDates.length === 0 ||
          checkedReturnDates.some((date) => {
            const formattedReturnTime = getTimeFromDate(flight.arrival).trim();
            const formattedCheckedTime = getFormattedTime(date).trim();
            return formattedReturnTime === formattedCheckedTime;
          });

        const minPrice =
          parseFloat(flight.minprice.replace("₹", "").replace(",", "")) || 0;
        const hasValidPricing = flight.pricingOptions.some(
          (option: any) => option.price <= sliderValue
        );
        const fareMatch = minPrice <= sliderValue || hasValidPricing;

        const stopoverAirportMatch =
          checkedStopoverAirports.length === 0 ||
          flight.stopovers?.some((stop: any) => {
            return checkedStopoverAirports.includes(stop.name);
          });
        // Return only flights that match all selected criteria
        return (
          airlineMatch &&
          fareTypeMatch &&
          stopMatch &&
          travelDepartureMatch &&
          travelReturnMatch &&
          fareMatch &&
          stopoverAirportMatch
        );
      });
    };
    const filteredData = filterFlightData();
    const formattedData = filteredData.map((flight: any) => ({
      airline: flight.airline,
      arrival: flight.arrival,
      arrivalLocation: flight.arrivalLocation,
      class: flight.class,
      departure: flight.departure,
      departureLocation: flight.departureLocation,
      departureCode: flight.departureCode,
      arrivalCode: flight.arrivalCode,
      departureDate: flight.departureDate,
      arrivalDate: flight.arrivalDate,
      duration: flight.duration,
      durationDetails: flight.durationDetails,
      icon: flight.icon,
      minprice: flight.minprice,
      seats: flight.seats,
      stopovers:
        flight.segments?.flatMap(
          (segment: any) =>
            segment.so?.map((stop: any) => ({
              code: stop.code,
              name: stop.name,
              city: stop.city,
              country: stop.country,
              terminal: stop.terminal,
            })) || []
        ) || [],
      pricingOptions:
        flight.pricingOptions?.map((option: any) => ({
          id: option.id,
          fareIdentifier: option.fareIdentifier || undefined,
          sri: option.sri, // Add sri to the mapped segment
          msri: option.msri || [],
          fare: option.fare,
          code: option.code,
          seats: option.seats,
          class: option.class,
          price: option.price,
          netfare: option.netfare,
          breakdown: {
            baseFare: option.breakdown.baseFare,
            adultFare: option.breakdown.adultFare,
            taxAndCharges: option.breakdown.taxAndCharges,
            userDevelopmentFee: option.breakdown.userDevelopmentFee,
            k3Tax: option.breakdown.k3Tax,
            airlineMisc: option.breakdown.airlineMisc,
          },

        })) || [],
    }));
    setFilteredFlightData(formattedData);
  }, [
    FlightData,
    filters,
    checkedAirlines,
    checkedFareTypes,
    checkedStops,
    checkedTravelDates,
    checkedReturnDates,
    durationRange,
    sliderValue,
    travelDirection,
    checkedStopoverAirports,
  ]);

  useEffect(() => {
    if (travelDirection === "onward") {
      dispatch(fetchTwoWayFilterFlightListSuccess(filteredFlightData));
    } else {
      dispatch(fetchTwoWayFilterFlightListReturnSuccess(filteredFlightData));
    }
  }, [dispatch, filteredFlightData, travelDirection]);

  const handleAirlineChange = (airline: string) => {
    setCheckedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  const handleFareTypeChange = (fareType: string) => {
    setCheckedFareTypes((prev) =>
      prev.includes(fareType)
        ? prev.filter((ft) => ft !== fareType)
        : [...prev, fareType]
    );
  };

  const handleFareRangeChange = (newRange: number) => {
    setSliderValue(newRange);
  };

  const handleStopChange = (stop: number) => {
    setCheckedStops((prev) =>
      prev.includes(stop) ? prev.filter((s) => s !== stop) : [...prev, stop]
    );
  };

  const handleTravelDateChange = (time: string) => {
    setCheckedTravelDates((prev) =>
      prev.includes(time) ? prev.filter((d) => d !== time) : [...prev, time]
    );
  };
  const handleTravelReturnDateChange = (time: string) => {
    setCheckedReturnTravelDates((prev) =>
      prev.includes(time) ? prev.filter((d) => d !== time) : [...prev, time]
    );
  };

  const handleStopoverAirportChange = (airport: string) => {
    setCheckedStopoverAirports((prevState) =>
      prevState.includes(airport)
        ? prevState.filter((item) => item !== airport)
        : [...prevState, airport]
    );
  };

  return (
    <Panel
      className={styles.border}
      style={{
        marginTop: "60px",
        marginBottom: "10px",
        backgroundColor: "#fff",
      }}
    >
      <div className="flight-panel">
        {!filters || Object.keys(filters).length === 0 ? (
          <Placeholder.Paragraph rows={5} active />
        ) : (
          <>
            <h2>Flight Filters</h2>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "15px",
                marginTop: "15px",
              }}
            >
              <label
                style={{
                  cursor: "pointer",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  backgroundColor:
                    travelDirection === "onward" ? "#0d47a1" : "#e0e0e0",
                  color: travelDirection === "onward" ? "#fff" : "#000",
                }}
              >
                <input
                  type="radio"
                  name="travelDirection"
                  value="onward"
                  checked={travelDirection === "onward"}
                  onChange={() => setTravelDirection("onward")}
                  style={{ display: "none" }}
                />
                Onward
              </label>
              <label
                style={{
                  cursor: "pointer",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  backgroundColor:
                    travelDirection === "return" ? "#0d47a1" : "#e0e0e0",
                  color: travelDirection === "return" ? "#fff" : "#000",
                }}
              >
                <input
                  type="radio"
                  name="travelDirection"
                  value="return"
                  checked={travelDirection === "return"}
                  onChange={() => setTravelDirection("return")}
                  style={{ display: "none" }}
                />
                Return
              </label>
            </div>
            <Accordion>
              <Accordion.Panel header="Airlines">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  {filters[travelDirection]?.airlines?.map(
                    (airline: string) => (
                      <label key={airline}>
                        <input
                          type="checkbox"
                          checked={checkedAirlines.includes(airline)}
                          onChange={() => handleAirlineChange(airline)}
                          style={{ margin: "10px", padding: "10px" }}
                        />
                        {airline}
                      </label>
                    )
                  )}
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="Cabin Classes">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  {filters[travelDirection]?.cabinClasses?.map(
                    (classType: string) => (
                      <label key={classType}>
                        <input
                          type="checkbox"
                          checked={checkedFareTypes.includes(classType)}
                          onChange={() => handleFareTypeChange(classType)}
                          style={{ margin: "10px", padding: "10px" }}
                        />
                        {classType}
                      </label>
                    )
                  )}
                </div>
              </Accordion.Panel>

              <Accordion.Panel header="Fare Range">
                <div style={{ padding: "0px 10px", marginTop: "20px" }}>
                  <Slider
                    progress
                    style={{ width: "100%", margin: "0 auto" }}
                    min={fareRange[0]}
                    max={fareRange[1]}
                    value={sliderValue}
                    onChange={handleFareRangeChange}
                    renderTooltip={(value) => `₹${value?.toLocaleString()}`}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px 8px 8px",
                    }}
                  >
                    <span>₹{fareRange[0].toLocaleString()}</span>
                    <span>₹{fareRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </Accordion.Panel>

              <Accordion.Panel header="Stops">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  {filters[travelDirection]?.stops?.map((stop: number) => (
                    <label key={stop}>
                      <input
                        type="checkbox"
                        checked={checkedStops.includes(stop)}
                        onChange={() => handleStopChange(stop)}
                        style={{ margin: "10px", padding: "10px" }}
                      />
                      {stop === 0
                        ? "Non-stop"
                        : `${stop} stop${stop > 1 ? "s" : ""}`}
                    </label>
                  ))}
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="Departure Time">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  {filters[travelDirection]?.travelDates?.map(
                    (time: string) => (
                      <label key={time}>
                        <input
                          type="checkbox"
                          checked={checkedTravelDates.includes(time)}
                          onChange={() => handleTravelDateChange(time)}
                          style={{ margin: "10px", padding: "10px" }}
                        />
                        {new Date(time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </label>
                    )
                  )}
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="Arrival Time">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  {filters[travelDirection]?.arrivalDates?.map(
                    (time: string) => (
                      <label key={time}>
                        <input
                          type="checkbox"
                          checked={checkedReturnDates.includes(time)}
                          onChange={() => handleTravelReturnDateChange(time)}
                          style={{ margin: "10px", padding: "10px" }}
                        />
                        {new Date(time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </label>
                    )
                  )}
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="Connecting Airports">
                {filters[travelDirection]?.stopoverAirports?.length > 0 ? ( // Check if there is data
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                    }}
                  >
                    {filters[travelDirection].stopoverAirports.map(
                      (airport: string) => (
                        <label key={airport}>
                          <input
                            type="checkbox"
                            checked={checkedStopoverAirports.includes(airport)}
                            onChange={() =>
                              handleStopoverAirportChange(airport)
                            }
                            style={{ margin: "10px", padding: "10px" }}
                          />
                          {airport}
                        </label>
                      )
                    )}
                  </div>
                ) : (
                  <div style={{ padding: "10px", color: "#888" }}>
                    No connecting airports available
                  </div>
                )}
              </Accordion.Panel>
            </Accordion>
          </>
        )}
      </div>
    </Panel>
  );
};

export default FlightTwoPanel;
