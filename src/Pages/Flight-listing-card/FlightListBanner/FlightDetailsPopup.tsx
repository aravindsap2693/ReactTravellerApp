// FlightDetailsModal.tsx

import React, { useState } from "react";
import { Modal, Nav } from "rsuite";

import AirlineIcon from "../../../assets/images/Indigo.svg"; // Adjust path as needed
import TimerIcon from "../../../assets/images/Timer.svg"; // Adjust path as needed
import styles from "../../../assets/styles/flight-modal.module.css";
import TTable from "../../../Component/Common/TTable";
// import TTable from "../../Common/TTable";

interface FlightDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

const flightInfo = {
  departure: {
    time: "05:35",
    date: "Sun, 14 Jul 24",
    airportCode: "BLR",
    airportName: "Bengaluru International Airport, India",
  },
  arrival: {
    time: "08:25",
    date: "Sun, 14 Jul 24",
    airportCode: "DEL",
    airportName: "Indira Gandhi International Airport, India",
  },
  duration: "2hr 50 Min",
  isNonStop: true,
};
const flightDetails = {
  navItems: [
    { eventKey: "BLR-DEL", label: "BLR - DEL" },
    { eventKey: "Fare-Rules", label: "Fare Rules" },
    { eventKey: "Baggage-Inclusion", label: "Baggage & Inclusion" },
  ],

  fareRules: [
    {
      title: "Changes",
      content: [
        "Charge INR 3000 for reissue/revalidation.",
        "Note- Text below not validated for autopricing.",
        "Till 3 days charge nil per component for Reissue/Revalidation.",
        "Within 3 days up to 02hrs charge INR 3000 Per Component for reissue/revalidation.",
        "---------------------------------------------------",
        "The change/reissue charge is Non-refundable.",
        "---------------------------------------------------",
        "Downselling to a lower RBD is permitted provided no downselling to lower fare/lower cabin.",
        "---------------------------------------------------",
        "No revalidation or cancellation fee would be applicable on infant tickets.",
        "---------------------------------------------------",
        "Any ticket presented for revalidation/cancellation/refund after or within two hours of scheduled departure of the flight.",
      ],
    },
    {
      title: "Additional Information",
      content: [
        "* GST and RAF charges will be applicable on the cancellation penalty.",
        "* The above data is indicative, fare rules are subject to changes by the airline depending upon Fare class, and change/cancellation fee amounts may fluctuate in currency conversion rates.",
        "* Although we try to keep this section updated regularly.",
        "* Cancellation/Reissue fee will follow the more restrictive fare type.",
        "* Feel free to call our Contact Centre for exact cancellation/change fee.",
        "* Cancellation/date change request will be accepted 30hrs prior to departure.",
      ],
    },
  ],
  baggageInclusion: [
    {
      baggagetype: "Adult",
      checkinweight: "15 Kgs (1 Piece only)",
      cabinweight: "7 Kgs (1 Piece only)",
    },
  ],
};

const FlightDetailsModal: React.FC<FlightDetailsModalProps> = ({
  open,
  onClose,
}) => {
  const [activeKey, setActiveKey] = useState<string>("BLR-DEL");
  const headers = ["Baggage Type", "Check in Weight", "Cabin Weight"];

  const handleSelect = (eventKey: string) => {
    setActiveKey(eventKey);
  };

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <Modal.Header>
        <Modal.Title>Flight Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{ borderBottom: "1px solid lightgrey", marginBottom: "20px" }}
        ></div>

        <Nav appearance="subtle" activeKey={activeKey} onSelect={handleSelect}>
          {flightDetails.navItems.map((item) => (
            <Nav.Item
              key={item.eventKey}
              eventKey={item.eventKey}
              style={{
                color: activeKey === item.eventKey ? "black" : "#9E9E9E",
                fontWeight: activeKey === item.eventKey ? "bold" : "normal",
              }}
            >
              {item.label}
            </Nav.Item>
          ))}
        </Nav>

        {activeKey === "Fare-Rules" && (
          <>
            {flightDetails.fareRules.map((section, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "10px",
                  padding: "15px",
                  marginBottom: "20px",
                  height: section.title === "Changes" ? "300px" : "null",
                  backgroundColor:
                    section.title === "Changes" ? "null" : "#f7f7f7",
                  overflowY: section.title === "Changes" ? "auto" : "visible",
                }}
                className={styles.scrollbar}
              >
                <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {section.title}
                </div>
                {section.content.map((paragraph, i) => (
                  <div key={i}>{paragraph}</div>
                ))}
              </div>
            ))}
          </>
        )}

        {activeKey === "BLR-DEL" && <FlightInfo />}
        {/* {activeKey === 'Baggage-Inclusion' && (
          <div style={{ marginTop: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
              backgroundColor: '#D9D9D9',
              borderRadius: '10px',
              border: '1px solid lightgrey'
            }}>
              <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Baggage Type</div>
              <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Check-in</div>
              <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Cabin</div>
            </div>

            {flightDetails.baggageInclusion.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  borderBottom: '1px solid lightgrey',
                  borderRadius: index === flightDetails.baggageInclusion.length - 1 ? '0 0 10px 10px' : 'none'
                }}
              >
                <div style={{ flex: 1, textAlign: 'center' }}>{item.type}</div>
                <div style={{ flex: 1, textAlign: 'center' }}>{item.checkIn}</div>
                <div style={{ flex: 1, textAlign: 'center' }}>{item.cabin}</div>
              </div>
            ))}
          </div>
        )} */}
        {activeKey === "Baggage-Inclusion" && (
          <TTable data={flightDetails.baggageInclusion} headers={headers} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FlightDetailsModal;

export const FlightInfo: React.FC = () => {
  return (
    <div style={{ display: "flex", padding: "10px 0"  }}>
      <div style={{ borderRight: "1px solid lightgrey", paddingRight: "25px"}}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "10px",
          }}
        >
          <div style={{ marginRight: "10px" }}>
            <img
              src={AirlineIcon}
              alt="Airline Icon"
              width={45}
              height={45}
            />
          </div>
          <div>
            <p style={{ fontWeight: "500", fontSize: "18px" }}>IndiGo</p>
            <span
              style={{ fontWeight: "500", color: "#9E9E9E", fontSize: "14px" }}
            >
              (PUIP)
            </span>
          </div>
        </div>
        <div style={{ color: "#019901", padding: "5px 0px" }}>
          Partially Refundable
        </div>
        <div>Economy Class</div>
      </div>

      <div
        style={{
          flex: 2,
          display: "flex",
          justifyContent: "space-around",
          padding: "0px 15px",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <div style={{ fontWeight: "700", fontSize: "18px" }}>
            {flightInfo.departure.time}
          </div>
          <div style={{ color: "#9E9E9E" }}>{flightInfo.departure.date}</div>
          <div
            style={{ fontWeight: "700", fontSize: "18px", marginTop: "10px" }}
          >
            {flightInfo.departure.airportCode}
          </div>
          <div style={{ color: "#9E9E9E" }}>
            {flightInfo.departure.airportName}
          </div>
        </div>

        <div
          style={{ textAlign: "center", marginTop: "30px", padding: "15px" }}
        >
          <img src={TimerIcon} alt="Flight Duration" />
          <div style={{ fontWeight: "700", fontSize: "18px" }}>
            {flightInfo.duration}
          </div>
          <div style={{ color: "#9E9E9E" }}>
            {flightInfo.isNonStop ? "Non Stop" : ""}
          </div>
        </div>

        <div style={{ textAlign: "left", paddingLeft: "20px" }}>
          <div style={{ fontWeight: "700", fontSize: "18px" }}>
            {flightInfo.arrival.time}
          </div>
          <div style={{ color: "#9E9E9E" }}>{flightInfo.arrival.date}</div>
          <div
            style={{ fontWeight: "700", fontSize: "18px", marginTop: "10px" }}
          >
            {flightInfo.arrival.airportCode}
          </div>
          <div style={{ color: "#9E9E9E" }}>
            {flightInfo.arrival.airportName}
          </div>
        </div>
      </div>
    </div>
  );
};
