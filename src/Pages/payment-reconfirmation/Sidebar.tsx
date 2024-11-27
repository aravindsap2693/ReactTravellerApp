import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Nav } from "rsuite";
import BillPayment from "./BillPayment";
import PaymentButton from "../Razorpaypayment/Razorpay";
import { loadRazorpayScript } from "../../Api/loadRazorpay.api";

const Sidebar: React.FC = () => {
  const [activeKey, setActiveKey] = useState("wallet");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);

  const bookingPayload = useSelector((state: any) => state.bookingPayload);

  const handleSelect = async (eventKey: string | null) => {
    if (eventKey) {
      setActiveKey(eventKey);

      if (eventKey === "razorpay") {
        // Load the Razorpay script
        const loaded = await loadRazorpayScript();
        setRazorpayLoaded(loaded);

        if (!loaded) {
          alert("Failed to load Razorpay SDK. Please try again.");
          return;
        }

        // Create the order by making the API call
        try {
          const accessToken = localStorage.getItem("accessToken");
          const response = await fetch(
            "https://traveller.mroot.in/backend/api/v1/payment/create/order",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                amount: (bookingPayload?.totalAmount || 0) * 100, // amount in paise
                currency: "INR",
              }),
            }
          );

          const data = await response.json();
          console.log("-------data",data)
          if (data.status === "Success" && !data.error) {
            setOrderId(data.response.orderId);
          } else {
            console.error("Failed to create order", data.message);
          }
        } catch (error) {
          console.error("Error creating order:", error);
        }
      }
    }
  };

  return (
    <div style={{ backgroundColor: "white", padding: "10px" }}>
      <Nav appearance="subtle" vertical activeKey={activeKey} onSelect={handleSelect}>
        <Nav.Item eventKey="wallet">Wallet</Nav.Item>
        <Nav.Item eventKey="razorpay">Razor PAY</Nav.Item>
      </Nav>

      {activeKey === "wallet" && <BillPayment />}
      {activeKey === "razorpay" && orderId && razorpayLoaded && (
        <PaymentButton
          orderData={{
            id: orderId,
            amount: bookingPayload?.totalAmount || 0,
            passengerName: bookingPayload?.passengerName || "Guest",
            email: bookingPayload?.email || "guest@example.com",
          }}
        />
      )}
    </div>
  );
};

export default Sidebar;
