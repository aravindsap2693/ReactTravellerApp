import React, { useState } from "react";
import {
  
  Button,
  Input,
  IconButton,
  InputGroup,
  SelectPicker,
} from "rsuite";
import AngleDownIcon from "@rsuite/icons/legacy/AngleDown"; // Correct icon import
import AngleUpIcon from "@rsuite/icons/legacy/AngleUp";

import styles from "../../assets/styles/booking.module.css";
import QRCode from "react-qr-code";
import TDPanel from "../../Component/Common/TDPanel";


const BillPayment: React.FC = () => {
  const [openUPI, setOpenUPI] = useState(false); // UPI toggle state
  const [openCard, setOpenCard] = useState(false); // Card toggle state
  const [openNetBanking, setOpenNetBanking] = useState(false); // Net Banking toggle state

  // Handle the opening of UPI, ensuring the other dropdowns are closed
  const handleUPIToggle = () => {
    setOpenUPI(!openUPI);
    setOpenCard(false);
    setOpenNetBanking(false);
  };

  // Handle the opening of Card, ensuring the other dropdowns are closed
  const handleCardToggle = () => {
    setOpenCard(!openCard);
    setOpenUPI(false);
    setOpenNetBanking(false);
  };

  // Handle the opening of Net Banking, ensuring the other dropdowns are closed
  const handleNetBankingToggle = () => {
    setOpenNetBanking(!openNetBanking);
    setOpenUPI(false);
    setOpenCard(false);
  };

  const bankOptions = [
    { label: "Axis", value: "Axis" },
    { label: "Hdfc", value: "Hdfc" },
    { label: "Sbi", value: "Sbi" },
    
  ];

  // Disable outer Pay Now button if any dropdown is open
  const isAnyDropdownOpen = openUPI || openCard || openNetBanking;
  const amount = "9999";
  return (
    <div style={{ padding: "20px", width: "100%", maxWidth: "1000px", margin: "0 auto"}}>
      {/* Wallet Section */}
      <TDPanel
        header="Wallet"
        defaultExpanded={true}
        classname={styles.bookingAccordian}
        render={
          <div style={{ padding:"10px" }}>
            <p>Use your Travelwallet for this booking below that Wallet</p>
            <p>Available Balance: $9,999.00</p>
          </div>
        }
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          appearance="primary"
          style={{ marginTop: "10px" }}
          disabled={isAnyDropdownOpen}
        >
          Pay Now
        </Button>
      </div>

      {/* Payment Section */}
      <TDPanel
        header="Payment"
        defaultExpanded={true}
        classname={styles.bookingAccordian}
        render={
          <div style={{ padding: "15px" }}>
            {/* UPI Section with Toggle */}
            <div
              style={{
                marginBottom: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleUPIToggle}
            >
              <h5 style={{ flex: 1 }}>UPI</h5>
              <IconButton
                icon={openUPI ? <AngleUpIcon /> : <AngleDownIcon />}
                appearance="subtle"
              />
            </div>
            {openUPI && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: 1, paddingRight: "10px" }}>
                  <p>Virtual Address (Ex. CustomerName@BankName)</p>
                  <p>All Major Banks Are Here</p>
                  <InputGroup>
                    <Input placeholder="xyz@BankName" />
                  </InputGroup>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button appearance="primary" style={{ marginTop: "10px" }}>
                      Pay Now
                    </Button>
                  </div>
                </div>

                {/* Horizontal separator */}
                <div
                  style={{
                    width: "1px",
                    backgroundColor: "grey",
                    height: "160px",
                    margin: "0 10px",
                  }}
                />

                <div
                  style={{ flex: 1, display: "flex", justifyContent: "center" }}
                >
                  <QRCode
                    size={256}
                    style={{ height: "120px", width: "120px" }}
                    value={amount}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            )}

            {/* Debit/Credit Card Section with Toggle */}
            <div
              style={{
                marginBottom: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleCardToggle}
            >
              <h5 style={{ flex: 1 }}>Debit/Credit Card</h5>
              <IconButton
                icon={openCard ? <AngleUpIcon /> : <AngleDownIcon />}
                appearance="subtle"
              />
            </div>
            {openCard && (
              <div>
                <p>Enter your card details</p>
                <InputGroup style={{ marginBottom: "10px" }}>
                  <Input placeholder="Card Number" />
                </InputGroup>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <InputGroup style={{ flex: 1, marginRight: "10px" }}>
                    <Input placeholder="MM/YY" />
                  </InputGroup>
                  <InputGroup style={{ flex: 1 }}>
                    <Input placeholder="CVV" />
                  </InputGroup>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button appearance="primary" style={{ marginTop: "10px" }}>
                    Pay Now
                  </Button>
                </div>
              </div>
            )}

            {/* Net Banking Section with Toggle */}
            <div
              style={{
                marginBottom: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleNetBankingToggle}
            >
              <h5 style={{ flex: 1 }}>Net Banking</h5>
              <IconButton
                icon={openNetBanking ? <AngleUpIcon /> : <AngleDownIcon />}
                appearance="subtle"
              />
            </div>
            {openNetBanking && (
              <div>
                <p>Select your bank</p>
                <SelectPicker
                  data={bankOptions}
                  style={{ width: "100%" }}
                  placeholder="Select Bank"
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button appearance="primary" style={{ marginTop: "10px" }}>
                    Pay Now
                  </Button>
                </div>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};

export default BillPayment;
