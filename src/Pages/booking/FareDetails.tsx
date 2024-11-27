import React, { useState } from "react";
import { Panel } from "rsuite";
import styles from "../../assets/styles/booking.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";


interface FareDetailslistProps {
  title: string;
  value: string;
}

interface FareDetailsProps {
  list: FareDetailslistProps[];
  Total: string;
  
}

const FareDetailsPanel: React.FC<FareDetailsProps> = ({ list, Total }) => {
  const totalPrice = useSelector((state: RootState) => state?.meal?.totalPrice);
  // State to track the expansion of the additional fare details
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalAmount, setTotalAmount] = useState<any>(0);

  // Update the `totalAmount` whenever `totalPrice` or `Total` changes
  // React.useEffect(() => {
  //   const totalValue = Number(totalAmount.replace(/[^\d]/g, '')) + (totalPrice || 0);
  //   setTotalAmount(totalValue);
  // }, [totalPrice, Total]);



// // Step 1: Extract the number part by removing the currency symbol
// const numericTotalAmount = Number(totalAmount.replace(/[^\d]/g, ''));

// // Step 2: Add the numeric value to totalPrice
// const PP = numericTotalAmount + totalPrice;

// // Step 3: Format the result back to include the ₹ symbol
// const formattedPP = `₹${PP}`;
// setTotalAmount(formattedPP)


  // Update the `totalAmount` whenever `totalPrice` or `Total` changes
  React.useEffect(() => {
    // Extract the numeric value from `Total`, assuming `Total` can have a currency symbol
    const numericTotal = Number(String(Total).replace(/[^\d.-]/g, '')) || 0;

    // Calculate the new total by adding or subtracting `totalPrice` from `numericTotal`
    const newTotal = numericTotal + (totalPrice || 0); // Use subtraction if needed

    // Update the state with the numeric value
    setTotalAmount(newTotal);
  }, [totalPrice, Total]);

  // Format the totalAmount to display with the ₹ symbol
  const formattedTotalAmount = `₹${totalAmount}`;



console.log("formattedPP",formattedTotalAmount);
console.log("totalAmount",totalAmount);











  // Toggle the visibility of additional fare details
  const toggleExpand = (title: string) => {
    if (title === "Total Amount (Fare)") {
      setIsExpanded((prev) => !prev);
    }
  };
console.log("totalAmount",totalAmount)
console.log("Total",Total)
console.log("totalPrice",totalPrice)
  // Base fare and total fare to show initially
  const baseDetails = list.slice(0, 2); // Display only first two details

  // Additional details to show when "Total Amount (Fare)" is clicked
  const additionalDetails = list.slice(2); // Remaining fare details


  return (
    <Panel
      bordered
      style={{ borderRadius: "14px", border: "1px solid lightgrey", background: "#fff" }}
    >
      <div style={headerStyle}>Fare Details</div>
      
      {/* Render base fare and total amount fare */}
      <div className={styles.FareList}>
        {baseDetails.map((item, index) => (
          <div key={index} style={rowStyle} onClick={() => toggleExpand(item.title)}>
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
      <div>
      
      </div>
      <div className={styles.FareList} >
      <div style={rowStyle}>
  <div style={leftStyle}>
    <span>Meal Amount</span>
  </div>
  <div style={rightStyle}>
    ₹{totalPrice||0}
  </div>
</div>
</div>

      
      {/* Clickable row for total amount fare */}
      <div style={rowAmtStyle}>
        <div style={leftAmtStyle}>
          <span>Total Amount</span>
        </div>
        {/* <div style={rightAmtStyle}>{totalAmount+ totalPrice} </div> */}
        <div style={rightAmtStyle}> {formattedTotalAmount}</div>
      </div>

    
    </Panel>
  );
};

// Styles (unchanged)
const headerStyle: React.CSSProperties = {
  fontWeight: "bold",
  borderBottom: "1px solid lightgrey",
  backgroundColor: "#f2f4f5",
  borderTopLeftRadius: "14px",
  borderTopRightRadius: "14px",
  fontSize: '16px',
  padding: "10px 15px",
  margin: "-20px -20px 0 -20px", // Removes any extra margin
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 0px",
  width: "100%",
  boxSizing: "border-box",
  margin: 0, // Ensure no margin between rows
};

const leftStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flex: 1,
  fontWeight: "400px",
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
  fontSize: '16px',
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
  margin: 0, // Ensure no margin between rows
  borderTop: "1px solid lightgrey",
  cursor: "pointer", // Change the cursor to pointer
};

export default FareDetailsPanel;
