import React from "react";
import FilterPanel from "./FlightListFilter";
import FlightContent from "./FlightList";
import FlightListingPage from "../FlightListSearch";

const FlightBannerCard: React.FC = () => {
  return (
    <div>
      <FlightListingPage/>
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
        <FilterPanel />
      </div>
    </div>
  );
};

export default FlightBannerCard;
