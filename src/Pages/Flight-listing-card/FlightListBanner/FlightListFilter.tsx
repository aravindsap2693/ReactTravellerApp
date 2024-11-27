/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../Store/store";
import { Panel, Slider } from "rsuite";
import styles from "../../../../src/assets/styles/flight-content.module.css";
import { fetchFilterFlightListSuccess } from "../../../Store/Slice/flightListSlice";
import { Accordion, Placeholder } from "rsuite";

const FlightPanel: React.FC = () => {
  const dispatch = useDispatch();

  // Access filters and data from Redux store
  const filters = useSelector((state: RootState) => state.flightList.dynamicFilters || {});
  const FlightData = useSelector((state: RootState) => state.flightList.data || []);

  // State for checked options
  const [checkedAirlines, setCheckedAirlines] = useState<string[]>([]);
  const [checkedFareTypes, setCheckedFareTypes] = useState<string[]>([]);
  const [checkedStops, setCheckedStops] = useState<number[]>([]);
  const [checkedTravelDates, setCheckedTravelDates] = useState<string[]>([]);
  const [durationRange, setDurationRange] = useState<number[]>([
    filters.duration?.minValue || 0,
    filters.duration?.maxValue || 1000,
  ]);
  const [filteredFlightData, setFilteredFlightData] = useState<any[]>([]);
  const [fareRange, setFareRange] = useState<number[]>([0, 10000]);
  const [sliderValue, setSliderValue] = useState<number>(fareRange[1]);

  // Update the filters when the selected options change
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
    if (FlightData.length > 0) {
      const fares = FlightData.map(
        (flight: any) =>
          parseFloat(flight.minprice.replace("₹", "").replace(",", "")) || 0
      );
      const pricingOptionFares = FlightData.flatMap((flight: any) =>
        flight.pricingOptions.map((option: any) => option.price || 0)
      );
      const minFare = Math.min(...fares, ...pricingOptionFares);
      const maxFare = Math.max(...fares, ...pricingOptionFares);
      setFareRange([minFare, maxFare]);
      setSliderValue(maxFare);
    }
  }, [FlightData]);

  useEffect(() => {
    const filterFlightData = () => {
      if (!Array.isArray(FlightData) || FlightData.length === 0) return []; // Ensure FlightData is an array and not empty

      return FlightData.filter((flight) => {
        // Check if the flight object is valid and has required properties
        if (!flight || !flight.duration) return false;
        // Filter by Airline
        const airlineMatch =
          checkedAirlines.length === 0 ||
          checkedAirlines.includes(flight.airline);

        // Filter by Class/Fare Type
        // Inside the filterFlightData function
        const fareTypeMatch =
          checkedFareTypes.length === 0 ||
          // Check if the flight class is in the checked fare types
          checkedFareTypes.includes(flight.class) ||
          // Also check if any of the pricing options' class is in the checked fare types
          flight.pricingOptions?.some((panel: { class: string }) =>
            checkedFareTypes.includes(panel.class)
          );
        // Filter by Stops
        const stopMatch =
          checkedStops.length === 0 ||
          checkedStops.includes(
            flight.durationDetails.includes("Non Stop")
              ? 0
              : parseInt(flight.durationDetails)
          );
        // Filter by Travel Date
        const travelDateMatch =
          checkedTravelDates.length === 0 ||
          checkedTravelDates.includes(flight.departure);
        // Filter by Duration (in minutes), with safety checks for parsing duration
        const durationInMinutes = flight.duration
          ? parseInt(flight.duration.split("h")[0]) * 60 +
          parseInt(flight.duration.split("h")[1].split("m")[0])
          : 0;
        const durationMatch =
          durationInMinutes >= durationRange[0] &&
          durationInMinutes <= durationRange[1];
        // Filter by Class/Fare Type
        // Filter by Fare
        const minPrice =
          parseFloat(flight.minprice.replace("₹", "").replace(",", "")) || 0;
        const hasValidPricing = flight.pricingOptions.some(
          (option: any) => option.price <= sliderValue
        );
        const fareMatch = minPrice <= sliderValue || hasValidPricing;

        return (
          airlineMatch &&
          fareTypeMatch &&
          stopMatch &&
          travelDateMatch &&
          durationMatch &&
          fareMatch
        );
      });
    };
    const filteredData = filterFlightData();

    // Format filtered data to match the desired JSON output
    const formattedData = filteredData.map((flight) => ({
      airline: flight.airline,
      arrival: flight.arrival,
      arrivalLocation: flight.arrivalLocation,
      class: flight.class,
      departure: flight.departure,
      departureLocation: flight.departureLocation,
      departureCode: flight.departureCode,
      arrivalCode: flight.arrivalCode,
      arrivalDate: flight.arrivalDate,
      departureDate: flight.departureDate,
      duration: flight.duration,
      durationDetails: flight.durationDetails,
      icon: flight.icon,
      minprice: flight.minprice,
      seats: flight.seats,
      pricingOptions:
        flight.pricingOptions?.map((option: any) => ({
          id: option.id,
          fareIdentifier: option.fareIdentifier || undefined,
          sri: option.sri, // Add sri to the mapped segment
          msri: option.msri || [],
          fare: option.fare || undefined,
          code: option.code || undefined,
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
    durationRange,
    sliderValue,
  ]);

  useEffect(() => {
    dispatch(fetchFilterFlightListSuccess(filteredFlightData));
  }, [dispatch, filteredFlightData]);

  // const handleDurationChange = (value: number[]) => {
  //   setDurationRange(value);
  // };

  // const formatMinutes = (minutes: number) => `${minutes} mins`;

  // Checkbox handlers for each filter type
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

  // const handleTravelDateChange = (date: string) => {
  //   setCheckedTravelDates(prev =>
  //     prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
  //   );
  // };

  const handleTravelDateChange = (time: string) => {
    setCheckedTravelDates((prev) =>
      prev.includes(time) ? prev.filter((d) => d !== time) : [...prev, time]
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
          <div className="flight-panel">
            <h2>Flight Filters</h2>

            {/* Airlines Filter */}
            <Accordion>
              <Accordion.Panel header="Airlines">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  {filters.airlines?.map((airline: string) => (
                    <label key={airline}>
                      <input
                        type="checkbox"
                        checked={checkedAirlines.includes(airline)}
                        onChange={() => handleAirlineChange(airline)}
                        style={{ margin: "10px", padding: "10px" }}
                      />
                      {airline}
                    </label>
                  ))}
                </div>
              </Accordion.Panel>
            </Accordion>
          </div>
        )}

        {/* Cabin Classes Filter */}
        {!filters || Object.keys(filters).length === 0 ? (
          <Placeholder.Paragraph rows={5} active />
        ) : (
          <Accordion>
            <Accordion.Panel header="Cabin Classes">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                {filters.cabinClasses?.map((classType: string) => (
                  <label key={classType}>
                    <input
                      type="checkbox"
                      checked={checkedFareTypes.includes(classType)}
                      onChange={() => handleFareTypeChange(classType)}
                      style={{ margin: "10px", padding: "10px" }}
                    />
                    {classType}
                  </label>
                ))}
              </div>
            </Accordion.Panel>
          </Accordion>
        )}

        {/* Fares Filter */}
        {!filters || Object.keys(filters).length === 0 ? (
          <Placeholder.Paragraph rows={5} active />
        ) : (
          <Accordion>
            <Accordion.Panel header="Fare Range">
              <div style={{ padding: "0px 10px", marginTop: "20px" }}>
                <Slider
                  progress
                  style={{ width: "100%", margin: "0 auto" }}
                  min={fareRange[0]}
                  max={fareRange[1]}
                  value={sliderValue}
                  onChange={handleFareRangeChange}
                  renderTooltip={(value: any) => `₹${value.toLocaleString()}`}
                // range
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "15px 8px 8px",
                  }}
                >
                  <span>₹{(fareRange[0] || 0).toLocaleString()}</span>
                  <span>₹{(fareRange[1] || 10000).toLocaleString()}</span>
                </div>
              </div>
            </Accordion.Panel>
          </Accordion>
        )}
        {/* Stops Filter */}
        {!filters || Object.keys(filters).length === 0 ? (
          <Placeholder.Paragraph rows={5} active />
        ) : (
          <Accordion>
            <Accordion.Panel header="Stops">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                {filters.stops?.map((stop: number) => (
                  <label key={stop}>
                    <input
                      type="checkbox"
                      checked={checkedStops.includes(stop)}
                      onChange={() => handleStopChange(stop)}
                      style={{ margin: "10px", padding: "10px" }}
                    />
                    {stop} Stop{stop > 1 ? "s" : ""}
                  </label>
                ))}
              </div>
            </Accordion.Panel>
          </Accordion>
        )}

        {/* Travel Dates Filter */}
        {!filters || Object.keys(filters).length === 0 ? (
          <Placeholder.Paragraph rows={5} active />
        ) : (
          <Accordion>
            <Accordion.Panel header="Departure Times">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                {filters.travelDates.map((date: string) => {
                  const formattedTime = new Date(date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });
                  return (
                    <label key={date}>
                      <input
                        type="checkbox"
                        checked={checkedTravelDates.includes(formattedTime)}
                        onChange={() => handleTravelDateChange(formattedTime)}
                        style={{ margin: "10px", padding: "10px" }}
                      />
                      {formattedTime}
                    </label>
                  );
                })}
              </div>
            </Accordion.Panel>
          </Accordion>
        )}

        {/* Duration Range Slider */}
        {/* {(!filters || Object.keys(filters).length === 0) ? (
        <Placeholder.Paragraph rows={5} active />
      ):(
      <div style={{ padding: "0px 10px", marginTop:"20px" }}>
      <h6 style={{textAlign:"center", marginBottom:"20px"}}>Onward Duration</h6>
        <Slider
          progress
          style={{ width: "100%", margin: "0 auto", whiteSpace: "nowrap" }}
          min={filters.duration?.minValue || 0}
          max={filters.duration?.maxValue || 1000}
          value={durationRange}
          onChange={setDurationRange}
          renderTooltip={(value) => `${value} mins`}
          range
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px 8px 8px",
          }}
        >
          <span>{formatMinutes(durationRange[0])}</span>
          <span>{formatMinutes(durationRange[1])}</span>
        </div>
      </div>)} */}
      </div>
    </Panel>
  );
};

export default FlightPanel;
