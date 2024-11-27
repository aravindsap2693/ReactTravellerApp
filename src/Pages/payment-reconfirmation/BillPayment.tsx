/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Loader, Modal } from "rsuite";
import styles from "../../assets/styles/booking.module.css";
import TDPanel from "../../Component/Common/TDPanel";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BookingSuccess from "../../assets/images/BookingSuccess.svg";
import { APIURL } from "../../Utils/Constant/constant";
const BillPayment: React.FC = () => {
  const bookingPayload = useSelector((state: any) => state.bookingPayload);
  const [isPayNowEnabled, setIsPayNowEnabled] = useState(false);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const payload = {
        agent: 11,
        totalFare: bookingPayload?.totalAmount,
      };
      try {
        const response: AxiosResponse<any> = await axios.post(APIURL, payload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setIsLoading(true);
        if (response.data.status === "success") {
          toast.success(response.data.message);
          setIsLoading(false);
          setAvailableBalance(response.data.response[0].current_balance);
          setIsPayNowEnabled(true);
        } else {
          setIsLoading(false);
          setIsPayNowEnabled(false);
          toast.error(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching wallet balance:", error);
        setIsPayNowEnabled(false);
        toast.error("Failed to fetch wallet balance.");
      }
    };
    fetchWalletBalance();
  }, []);
  const handlePayNow = async () => {
    setIsLoading(true);

    const payload = {
      bookingId: bookingPayload?.bookingId || null,
      orderId:null,
      paymentInfos: [
        { amount: bookingPayload?.totalAmount || 0 }
      ],
      travellerInfo: bookingPayload?.travellerInfo.map((traveller: any) => ({
        ti: traveller.title || "Mr",
        fN: traveller.firstName || "Test",
        lN: traveller.lastName || "Na",
        pt: traveller.pt || "ADULT",
        dob: traveller.dob || "1996-08-09",
        pid: traveller.pid || "2018-09-08",
        pNat: traveller.pNat || "IN",
        pNum: traveller.pNum || "87UYITB",
        eD: traveller.eD || "2030-09-08",
      })) || [],
      deliveryInfo: {
        emails: Array.isArray(bookingPayload?.contactInfo.email_id)
          ? bookingPayload.contactInfo.email_id
          : [bookingPayload?.contactInfo.email_id].filter(Boolean),
        contacts: Array.isArray(bookingPayload?.contactInfo.mobile_number)
          ? bookingPayload.contactInfo.mobile_number
          : [bookingPayload?.contactInfo.mobile_number].filter(Boolean),
      },
      // gstInfo: {
      //   gstNumber: bookingPayload?.gstInfo.gstin || null,
      //   email: bookingPayload?.gstInfo.gstinEmail || null,
      //   registeredName: bookingPayload?.gstInfo.registeredName || null,
      //   mobile: bookingPayload?.gstInfo.gstinMobile || null,
      //   address: bookingPayload?.gstInfo.address || null,
      // },
      gstInfo: {
        gstNumber: null,
        email: null,
        registeredName: null,
        mobile: null,
        address: null,
      },
    };
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://traveller.mroot.in/backend/api/v1/booking/confirm?partner=1&agent=${11}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setIsLoading(false);
      const data = await response.json(); // Parse the JSON response
      console.log("BOOKING API CALL", data);
      // Handle the response
      if (data.status === "Success") {
        // toast.success(data.message);
        setBookingDetails(data.response);
        setShowModal(true);
      } else {
        // showNotification("error", "Payment failed: " + data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Failed to process payment.");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("bookingDetails", bookingDetails);

  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <TDPanel
        header="Wallet"
        defaultExpanded={true}
        classname={styles.bookingAccordian}
        render={
          <div style={{ padding: "10px" }}>
            <p>Use your Travelwallet for this booking below that Wallet</p>
            <p>Available Balance: ₹{availableBalance.toFixed(2)}</p>
          </div>
        }
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          appearance="primary"
          style={{ marginTop: "10px" }}
          disabled={!isPayNowEnabled}
          onClick={handlePayNow}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>
      </div>
      {/* Modal for Booking Details */}

      {isLoading ? (
        <div
          style={{
            position: "absolute", // Absolute positioning for the loader
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Centering the loader
            zIndex: 999, // Ensure the loader is on top
          }}
        >
          <Loader size="lg" />
        </div>
      ) : (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div style={{ borderRadius: "30px" }}>
            <Modal.Header>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={BookingSuccess}
                  alt="bookingsuccess"
                  width={250}
                  height={200}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <Modal.Title style={{ fontSize: "37px" }}>
                  Ticket Booked Successfully
                </Modal.Title>
                <p style={{ fontSize: "20px" }}>
                  Your Ticket details will be sent to your email
                </p>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {bookingDetails && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <strong>Your Booking ID is</strong>
                      <span style={{ margin: "0 4px" }}>:</span>
                      <span
                        style={{
                          color: "#FA503F",
                          marginLeft: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        {bookingDetails.order.bookingId}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <strong>Amount Paid</strong>
                      <span style={{ margin: "0 0 0 37px" }}>:</span>
                      <span
                        style={{
                          color: "#FA503F",
                          marginLeft: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        ₹
                        {
                          bookingDetails.itemInfos.AIR.totalPriceInfo
                            .totalFareDetail.fC.TF
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShowModal(false)} appearance="subtle">
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default BillPayment;
