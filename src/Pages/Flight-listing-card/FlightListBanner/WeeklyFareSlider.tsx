/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Nav } from "rsuite";
import LeftArrowIcon from "../../../assets/images/LeftArrowGrey.svg";
import RightArrowIcon from "../../../assets/images/RightArrowIconB.svg";

import styles from "../../../assets/styles/weekly-farefetails.module.css";


interface WeeklyFareDetailsProps {
  flightType: string; // Adjust the type based on your actual use case
}
const panelData = [
  { day: "Mon", date: "12", month: "Sep", fare: "₹3566" },
  { day: "Tue", date: "13", month: "Sep", fare: "₹3678" },
  { day: "Wed", date: "14", month: "Sep", fare: "₹3790" },
  { day: "Thur", date: "15", month: "Sep", fare: "₹3902" },
  { day: "Fri", date: "16", month: "Sep", fare: "₹4014" },
  { day: "Sat", date: "17", month: "Sep", fare: "₹4126" },
  { day: "Sun", date: "18", month: "Sep", fare: "₹4238" },
  { day: "Mon", date: "19", month: "Sep", fare: "₹4350" },
  { day: "Tue", date: "20", month: "Sep", fare: "₹4462" },
  { day: "Wed", date: "21", month: "Sep", fare: "₹4574" },
  { day: "Thur", date: "22", month: "Sep", fare: "₹4686" },
  { day: "Fri", date: "23", month: "Sep", fare: "₹4798" },
];

const WeeklyFareDetails : React.FC<WeeklyFareDetailsProps> = ({flightType}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = flightType === "One Way"? 6: 4; // Number of items to show at a time
  const [active, setActive] = useState(panelData[0].day); // Default first item selected

  const handleNext = () => {
    if (currentIndex + itemsPerPage < panelData.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const itemsToDisplay = panelData.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const handleSelect = (eventKey: any) => {
    setActive(eventKey);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0",  }}>
      <div
        style={{
          position: "relative",
          background: "#fff",
       
          // padding: "10px",
          border: "1px solid lightgrey",
          overflow: "hidden",
          borderRadius: "15px",
        }}
      >
        {/* Left Arrow */}
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 1,
          }}
          onClick={handlePrev}
        >
          <img
            src={LeftArrowIcon}
            alt="Left Arrow Icon"
            width={24}
            height={24}
          />
        </div>

        {/* Nav Container */}
        <Nav
          appearance="subtle"
          activeKey={active}
          onSelect={handleSelect}
          className={styles.customNav} // Added custom class
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75px",
            overflow: "hidden",
          }}
        >
          {itemsToDisplay.length > 0 ? (
            itemsToDisplay.map((card) => (
              <Nav.Item
                key={card.day}
                eventKey={card.day}
                style={{
                  flex: `0 0 calc(100% / ${flightType === "One Way" ? 6 : 4})`,// 6 items per row
                
                  textAlign: "center",
                  borderRight:"1px solid lightgrey"
                }}
              >
                <div >
                  <h6
                    style={{
                      margin: "5px 0",
                      fontWeight: "bold",
                      fontSize: "14px",
                
                    }}
                  >
                    {card.day}, {card.date} {card.month}
                  </h6>
                  <h6
                    style={{
                      margin: "0",
                      fontSize: "12px",
                      color: "#019901",
                      lineHeight: "26px",
                    }}
                  >
                    {card.fare}
                  </h6>
                </div>
              </Nav.Item>
            ))
          ) : (
            <div
              style={{
                flex: "0 0 calc(100% / 6)",
                height: "100%",
                background: "#000", // Black background if no data
              }}
            ></div>
          )}
        </Nav>

        {/* Right Arrow */}
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 1,
          }}
          onClick={handleNext}
        >
          <img
            src={RightArrowIcon}
            alt="Right Arrow Icon"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyFareDetails;
