import React, { useState } from "react";
import { Panel } from "rsuite";
import styles from "../../assets/styles/booking.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { setTotalAmount } from "../../Store/Slice/bookingPayloadSlice";

interface FareDetailslistProps {
  title: string;
  value: string;
}

interface FareDetailsProps {
  list?: FareDetailslistProps[]; // Make list optional
  Total?: string; // Make Total optional
}

const FareDetailsPanel: React.FC<FareDetailsProps> = ({ list = [], Total = "0" }) => {
  const dispatch = useDispatch();
  const totalPrice = useSelector((state: RootState) => state?.meal?.totalPrice);
  const baggagePrice = useSelector((state: RootState) => state?.baggage.totalPrice);
  const totalAmount = useSelector((state: RootState) => state.bookingPayload.totalAmount);
  const seatAmount = useSelector((state: RootState) => state.seatSelection.initialAmount);

  // State to track the expansion of the additional fare details
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate and dispatch total amount whenever dependencies change
  React.useEffect(() => {
    const numericTotal = Number(String(Total).replace(/[^\d.-]/g, "")) || 0;
    const newTotal = numericTotal + (totalPrice || 0) + (baggagePrice || 0) + (seatAmount || 0);
    dispatch(setTotalAmount(newTotal));
  }, [baggagePrice, totalPrice, seatAmount, Total, dispatch]);

  // Format the totalAmount to display with the ₹ symbol
  const formattedTotalAmount = `₹${totalAmount}`;

  // Toggle the visibility of additional fare details
  const toggleExpand = (title: string) => {
    if (title === "Total Amount (Fare)") {
      setIsExpanded((prev) => !prev);
    }
  };
  console.log("totalAmount", totalAmount);
  console.log("Total", Total);
  console.log("totalPrice", totalPrice);
  // Base fare and total fare to show initially
  const baseDetails = Array.isArray(list) ? list.slice(0, 2) : [];
  const additionalDetails = Array.isArray(list) ? list.slice(2) : [];

  return (
    <Panel
      bordered
      style={{
        borderRadius: "14px",
        border: "1px solid lightgrey",
        background: "#fff",
      }}
    >
      <div style={headerStyle}>Fare Details</div>

      {/* Render base fare and total amount fare */}
      <div className={styles.FareList}>
        {baseDetails.map((item, index) => (
          <div
            key={index}
            style={rowStyle}
            onClick={() => toggleExpand(item.title)}
          >
            <div style={leftStyle}>
              <span>{item.title}</span>
            </div>
            <div style={rightStyle}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Render additional details when expanded */}
      {isExpanded && (
        <div className={styles.FareList}>
          {additionalDetails.map((item, index) => (
            <div key={index} style={rowStyle}>
              <div style={leftStyle}>
                <span>{item.title}</span>
              </div>
              <div style={rightStyle}>{item.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Render additional fare amounts */}
      <div className={styles.FareList}>
        <div style={rowStyle}>
          <div style={leftStyle}>
            <span>Meal Amount</span>
          </div>
          <div style={rightStyle}>₹{totalPrice || 0}</div>
        </div>
      </div>
      <div className={styles.FareList}>
        <div style={rowStyle}>
          <div style={leftStyle}>
            <span>Baggage Amount</span>
          </div>
          <div style={rightStyle}>₹{baggagePrice || 0}</div>
        </div>
      </div>
      <div className={styles.FareList}>
        <div style={rowStyle}>
          <div style={leftStyle}>
            <span>Seat Amount</span>
          </div>
          <div style={rightStyle}>₹{seatAmount || 0}</div>
        </div>
      </div>

      {/* Total Amount */}
      <div style={rowAmtStyle}>
        <div style={leftAmtStyle}>
          <span>Total Amount</span>
        </div>
        <div style={rightAmtStyle}>{formattedTotalAmount}</div>
      </div>
    </Panel>
  );
};

// Styles remain unchanged
const headerStyle: React.CSSProperties = {
  fontWeight: "bold",
  borderBottom: "1px solid lightgrey",
  backgroundColor: "#f2f4f5",
  borderTopLeftRadius: "14px",
  borderTopRightRadius: "14px",
  fontSize: "16px",
  padding: "10px 15px",
  margin: "-20px -20px 0 -20px",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 0px",
  width: "100%",
  boxSizing: "border-box",
  margin: 0,
};

const leftStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flex: 1,
};

const rightStyle: React.CSSProperties = {
  fontWeight: "bold",
  textAlign: "right",
  flexShrink: 0,
};

const leftAmtStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flex: 1,
  fontSize: "16px",
  fontWeight: "bold",
};

const rightAmtStyle: React.CSSProperties = {
  fontWeight: "bold",
  textAlign: "right",
  flexShrink: 0,
  color: "#0770E3",
};

const rowAmtStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 3px 5px",
  width: "100%",
  boxSizing: "border-box",
  margin: 0,
  borderTop: "1px solid lightgrey",
  cursor: "pointer",
};

export default FareDetailsPanel;
