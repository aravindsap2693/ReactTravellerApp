import  { useState } from "react";
import { Row, Col, Panel, Stack } from "rsuite"; // Assuming you're using Rsuite components

import NoticeBoard from "../../assets/icons/NoticeBoard.svg"; // Replace with your actual image import
import LeftArrowIcon from "../../assets/images/Tripvista_LeftArrowGrey.svg";
import RightArrowIcon from "../../assets/images/Tripvista_RightArrowGrey.svg";
// Importing Next.js Link component
import AirlineUpdate from "../../assets/icons/AirlineUpdate.svg";
import Recharge from "../../assets/icons/Recharge.svg";
import GstInvoice from "../../assets/icons/GstInvoice.svg";
import offlineRequest from "../../assets/icons/offlineRequest.svg";
import SearchIitinery from "../../assets/icons/SearchIitinery.svg";
import Travelcalendar from "../../assets/icons/Travelcalendar.svg";
import Holditinery from "../../assets/icons/Holditinery.svg";
import styles from "../../assets/styles/offerforyou.module.css"

const panelData = [
  { id: 1, title: "Notice Board ", image: NoticeBoard, link: "/noticeboard" },
  { id: 2, title: "Recharge", image: Recharge, link: "/recharge" },
  { id: 3, title: "Airline Update", image: AirlineUpdate, link: "/airlineupdate" },
  { id: 4, title: "GST Invoice Format", image: GstInvoice, link: "/invoice" },
  { id: 5, title: "Offline Request", image: offlineRequest, link: "/offlinerequest" },
  { id: 6, title: "Search itineraries", image: SearchIitinery, link: "/searchitineraries" },
  { id: 6, title: "Travel Calendar", image: Travelcalendar, link: "/travelcalendar" },
  { id: 6, title: "Hold itineraries", image: Holditinery, link: "/holditineraries" }
];

const NoticeBoardPanel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

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

  return (
    <div style={{ textAlign: "center" }}>
      {/* Header with Preferences title and arrows */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Stack className={styles.heading}>
          <h3>
            <span style={{ color: "#FA503F" }}>Preferences</span>
          </h3>
        </Stack>
        <Stack style={{ margin: "20px 0px" }}>
          <div
            style={{ padding: "0px 20px", cursor: "pointer" }}
            onClick={handlePrev}
          >
            <img src={LeftArrowIcon} alt="LeftArrowIcon" />
          </div>
          <div style={{ cursor: "pointer" }} onClick={handleNext}>
            <img src={RightArrowIcon} alt="RightArrowIcon" />
          </div>
        </Stack>
      </div>

      {/* Card Panel */}
      <div style={{ marginTop: "20px" }}>
        <Row gutter={16} className={styles.heading}>
          {panelData.slice(currentIndex, currentIndex + itemsPerPage).map((card) => (
            <Col key={card.id} xs={24} sm={12} md={6}>
              {/* <link href={card.link}  style={{ textDecoration: "none",}}> */}
                <div
                  style={{
                    background: "#fff",
                    color: "black",
                    borderRadius: "10px",
                    textAlign: "center",
                    padding: "20px",
                    cursor: "pointer", // Make it look clickable
                    transition: "transform 0.3s ease-in-out", // Apply smooth transition
                    boxShadow: "0px 18.63px 53.13px 0px #00000017",
                   
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  <Panel
                    bodyFill
                    style={{
                      padding: "0",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      boxSizing: "border-box",
                      flex: "1 1 300px",
                      marginTop: "20px",
                      border: "0px",
                      borderRadius: "18px",
                      background: "#fff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {/* Centered Image */}
                      <img
                        src={card.image}
                        alt={card.title}
                        height={35}
                        width={35}
                        style={{ border: "none" }} 
                      />
                      {/* Title below the image */}
                      <h6
                        style={{
                          marginTop: "10px",
                          fontWeight:"bold"
                         
                        }}
                      >
                        {card.title}
                      </h6>
                    </div>
                  </Panel>
                </div>
              {/* </link> */}
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default NoticeBoardPanel;
