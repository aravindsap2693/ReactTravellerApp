/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import MealsList from "./AddonsComponent/MealsList";

import BaggageList from "./AddonsComponent/BaggageList";
import TTab from "../../Component/Common/TTab";

const Addons: React.FC = () => {
  const TabNav = [
    {
      title: "Meals",
      key: "Meals",
      content: <MealsList />,
    },
    {
      title: "Baggage",
      key: "Baggage",
      content: <BaggageList />,
    },
  ];

  return (
    <>
      <div style={{ padding: "10px" }}>
        <TTab TabNav={TabNav} />
      </div>
    </>
  );
};

export default Addons;
