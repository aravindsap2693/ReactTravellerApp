import { useState } from "react";
import { Row, Col, Panel, Stack } from "rsuite"; 
import { ArrowLeftLine, ArrowRightLine } from "@rsuite/icons"; 
import NoticeBoard from "../../assets/icons/NoticeBoard.svg"; 
import AirlineUpdate from "../../assets/icons/AirlineUpdate.svg";
import Recharge from "../../assets/icons/Recharge.svg";
import GstInvoice from "../../assets/icons/GstInvoice.svg";
import offlineRequest from "../../assets/icons/offlineRequest.svg";
import SearchIitinery from "../../assets/icons/SearchIitinery.svg";
import Travelcalendar from "../../assets/icons/Travelcalendar.svg";
import Holditinery from "../../assets/icons/Holditinery.svg";
import styles from "../../assets/styles/offerforyou.module.css";

const panelData = [
  { id: 1, title: "Notice Board ", image: NoticeBoard, link: "/noticeboard" },
  { id: 2, title: "Recharge", image: Recharge, link: "/recharge" },
  { id: 3, title: "Airline Update", image: AirlineUpdate, link: "/airlineupdate" },
  { id: 4, title: "GST Invoice Format", image: GstInvoice, link: "/invoice" },
  { id: 5, title: "Offline Request", image: offlineRequest, link: "/offlinerequest" },
  { id: 6, title: "Search itineraries", image: SearchIitinery, link: "/searchitineraries" },
  { id: 7, title: "Travel Calendar", image: Travelcalendar, link: "/travelcalendar" },
  { id: 8, title: "Hold itineraries", image: Holditinery, link: "/holditineraries" },
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Stack className={styles.heading}>
          <h3>
            <span style={{ color: "#FA503F" }}>Preferences</span>
          </h3>
        </Stack>
        <Stack style={{ margin: "20px 0px", alignItems: "center",gap: "20px" }}>
          {/* Previous Arrow */}
          <div
            onClick={currentIndex > 0 ? handlePrev : undefined}
            style={{
              cursor: currentIndex > 0 ? "pointer" : "not-allowed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: currentIndex > 0 ? "#FA503F" : "#FFC2C2",
              backgroundColor: currentIndex > 0 ? "#FA503F" : "transparent",
            }}
          >
            <ArrowLeftLine
              style={{
                fontSize: "30px",
                color: currentIndex > 0 ? "#fff" : "#FFC2C2",
              }}
            />
          </div>
          {/* Next Arrow */}
          <div
            onClick={
              currentIndex + itemsPerPage < panelData.length
                ? handleNext
                : undefined
            }
            style={{
              cursor:
                currentIndex + itemsPerPage < panelData.length
                  ? "pointer"
                  : "not-allowed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor:
                currentIndex + itemsPerPage < panelData.length
                  ? "#FA503F"
                  : "#FFC2C2",
              backgroundColor:
                currentIndex + itemsPerPage < panelData.length
                  ? "#FA503F"
                  : "transparent",
            }}
          >
            <ArrowRightLine
              style={{
                fontSize: "30px",
                color:
                  currentIndex + itemsPerPage < panelData.length
                    ? "#fff"
                    : "#FFC2C2",
              }}
            />
          </div>
        </Stack>
      </div>

      {/* Card Panel */}
      <div style={{ marginTop: "20px" }}>
        <Row gutter={16} className={styles.heading}>
          {panelData.slice(currentIndex, currentIndex + itemsPerPage).map((card) => (
            <Col key={card.id} xs={24} sm={12} md={6}>
              <div
                style={{
                  background: "#fff",
                  color: "black",
                  borderRadius: "10px",
                  textAlign: "center",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
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
                        fontWeight: "bold",
                      }}
                    >
                      {card.title}
                    </h6>
                  </div>
                </Panel>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default NoticeBoardPanel;
