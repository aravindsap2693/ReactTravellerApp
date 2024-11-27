import React, { useEffect } from "react";
import FilterPanel from "./FlightListFilter";
import FlightContent from "./FlightList";
import FlightListingPage from "../FlightListSearch";
import FlightTwoPanel from "./FlightListTwoWayFilter";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import FlightListTwoWayComboFliter from "./FlightListTwoWayComboFliter";

const FlightBannerCard: React.FC = () => {
  const flightType = useSelector((state: RootState) => state?.flightBanner?.flightType);
  const flightTypeRoundTrip = useSelector((state: RootState) => state?.twoWayFlightListData?.data);

  useEffect(() => {
  }, [flightType, flightTypeRoundTrip]);

  const hasRoundTripData =
    Array.isArray(flightTypeRoundTrip?.returnFlights) &&
    flightTypeRoundTrip?.returnFlights.length > 0;

  const hasRoundTripCombo = Array.isArray(flightTypeRoundTrip?.comboFlights) && flightTypeRoundTrip?.comboFlights.length > 0;

  return (
    <div>
      <FlightListingPage />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr", // Adjust the column widths (3:1 ratio for content and filter panel)
          gap: "20px", // Gap between FlightContent and FilterPanel
          width: "70%",
          margin: "auto",
        }}
      >
        <FlightContent />
        {/* Conditionally render filters based on flightType */}
        {flightType === "One Way" && <FilterPanel />}
        {flightType === "Round Trip" && hasRoundTripData && !hasRoundTripCombo && <FlightTwoPanel />}
        {flightType === "Round Trip" && hasRoundTripCombo && <FlightListTwoWayComboFliter />}
      </div>
    </div>
  );
};

export default FlightBannerCard;
