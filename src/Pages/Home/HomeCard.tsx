/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { Panel, Radio, RadioGroup } from "rsuite";

import FlightIcon from "../../assets/images/Flight.svg";
import FlightIconG from "../../assets/images/FlightIconGrey.svg";
import HotelIcon from "../../assets/images/Hotel.svg";
import HotelIconB from "../../assets/images/HomeIconBlue.svg";
import CabsIconB from "../../assets/images/Cabs.svg";
import CabsIcon from "../../assets/images/CabIconBlue.svg";
import TrainIcon from "../../assets/images/Train.svg";
import TrainIconB from "../../assets/images/TrainIconBlue.svg";
import BusIcon from "../../assets/images/Bus.svg";
import BusIconB from "../../assets/images/BusIconBlue.svg";
import HolidayIcon from "../../assets/images/HolidayIcon.svg";
import HolidayIconB from "../../assets/images/HolidayIconBlue.svg";
import FlightCard from "./Flights/FlightCard";
import Card from "./Card";

const _nav = [
  {
    name: "Flight",
    values: ["Flight"],
    activeIcon: FlightIcon,
    inactiveIcon: FlightIconG,
  },
  {
    name: "Hotel",
    values: ["Hotel"],
    inactiveIcon: HotelIconB,
    activeIcon: HotelIcon,
  },
  {
    name: "Train",
    values: ["Train"],
    inactiveIcon: TrainIconB,
    activeIcon: TrainIcon,
  },
  {
    name: "Cabs",
    values: ["Cabs"],
    inactiveIcon: CabsIcon,
    activeIcon: CabsIconB,
  },
  {
    name: "Bus",
    values: ["Bus"],
    inactiveIcon: BusIconB,
    activeIcon: BusIcon,
  },
  {
    name: "Holiday",
    values: ["Holiday"],
    inactiveIcon: HolidayIconB,
    activeIcon: HolidayIcon,
  },
];

const HomeCard = () => {
  const [backdrop, setBackdrop] = React.useState("Flight");
  // const [open, setOpen] = React.useState(false);
  // const [from, setFrom] = React.useState(null);
  // const [to, setTo] = React.useState(null);

  const handleBackdropChange = (
    value: string,
    _event: React.SyntheticEvent
  ) => {
    setBackdrop(value);
  };

  const renderCard = () => {
    switch (backdrop) {
      case "Flight":
        return <FlightCard backdrop={backdrop} />;
      case "Hotel":
        return <Card backdrop={backdrop} />;
      case "Train":
        return <Card backdrop={backdrop} />;
      case "Cabs":
        return <Card backdrop={backdrop} />;
      case "Bus":
        return <Card backdrop={backdrop} />;
      case "Holiday":
        return <Card backdrop={backdrop} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          position: "relative",
          // backgroundColor: "white",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <RadioGroup
          name="radioList"
          appearance="picker"
          inline
          value={backdrop}
          onChange={(value, event) =>
            handleBackdropChange(value as string, event)
          }
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "0px",
            backgroundColor: "#8B226B",
            border: "transparent",
            marginLeft: "0px",
            marginBottom: "50px",
          }}
        >
          {_nav.map((item) => (
            // <div
            //   style={{
            //     padding: "0em",
            //     borderLeft: [1, 2, 3, 4, 5].includes(index)
            //       ? "1px solid black"
            //       : "none",
            //   }}
            // >
            <Radio
              key={item.name}
              value={item.values[0]}
              // style={{ padding: "10px", height: "auto", margin: "5px" }}
              style={{
                padding: "10px",
                height: "auto",
                margin: "5px",
                backgroundColor:
                  backdrop === item.values[0] ? "#B26696" : "transparent", // Active background color
                borderRadius: "8px", // Optional: Add rounded corners for better styling
                transition: "background-color 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "45px",
                }}
              >
                <img
                  src={
                    backdrop === item.values[0]
                      ? item.activeIcon
                      : item.inactiveIcon
                  }
                  alt={`${item.name} Icon`}
                  width={30}
                  height={20}
                  style={{
                    // filter: backdrop === item.values[0] ? 'invert(0.4) sepia(1) saturate(4) hue-rotate(0deg)' : 'invert(53%) sepia(100%) saturate(600%) hue-rotate(180deg) brightness(85%) contrast(100%)',
                    transition: "filter 0.3s ease",
                  }}
                />
                <span style={{ marginTop: "5px", color: "#FFF" }}>
                  {item.name}
                </span>
              </div>
            </Radio>
            // </div>
          ))}
        </RadioGroup>
      </div>

      <Panel
        bordered
        style={{
          backgroundColor: "white",
          position: "relative",
          overflow: "visible",
          color: "lightgrey",
          padding: "1",
          height: backdrop === "Flight" ? "auto" : "310px",
        }}
      >
        {renderCard()}
      </Panel>
    </div>
  );
};

export default HomeCard;
