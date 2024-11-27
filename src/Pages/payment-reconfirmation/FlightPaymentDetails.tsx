import React from "react";
import { Grid, Row, Col, Panel } from "rsuite";
import { FlightInfo } from "../Flight-listing-card/FlightListBanner/FlightDetailsPopup";
import styles from "../../assets/styles/booking.module.css";
import FareDetailsPanel from "../booking/FareDetails";

// import luggage from "../../assets/images/Luggage.svg";

import { Modal, Button } from "rsuite";
import TButton from "../../Component/Common/TButton";
import TTable from "../../Component/Common/TTable";


//const fontColor: string = "#F88D02";

const privacyPolicyUrl = "#";
const userAgreementUrl = "#";
const termsOfServiceUrl = "#";

const FareDetailsList = [
  {
    title: "Base Fare",
    value: "₹7,246",
  },
  {
    title: "Tax & charges",
    value: "₹1,500",
  },
];

// const PassengerFields = [
//   {
//     title: "Title",
//     placeholder: "Mr/...",
//     type: "select",
//     name: "title",
//     options: [
//       { label: "Mr", value: "mr" },
//       { label: "Ms", value: "ms" },
//       { label: "Mrs", value: "mrs" },
//     ],
//   },
//   {
//     title: "First Name",
//     placeholder: "First Name",
//     type: "input",
//     name: "firstName",
//   },
//   {
//     title: "Last Name",
//     placeholder: "Last Name",
//     type: "input",
//     name: "lastName",
//   },
//   {
//     title: "Mobile Number",
//     placeholder: "Mobile Number",
//     type: "input",
//     name: "mobile",
//   },
//   {
//     title: "Email ID",
//     placeholder: "Email ID",
//     type: "input",
//     name: "email",
//   },
// ];

// const GSTFields = [
//   { title: "GSTIN", placeholder: "GSTIN", name: "gstin", type: "input" },
//   {
//     title: "GSTIN Mobile Number",
//     placeholder: "GSTIN Mobile Number",
//     name: "gstinMobile",
//     type: "input",
//   },
//   {
//     title: "GSTIN Email Address",
//     placeholder: "GSTIN Email Address",
//     name: "gstinEmail",
//     type: "input",
//   },
//   {
//     title: "GSTIN Phone Number",
//     placeholder: "GSTIN Phone Number",
//     name: "gstinPhone",
//     type: "input",
//   },
// ];

const Tabledata = {
  sections: [
    {
      title: "Passenger Details",
      headers: ["Passenger Name", "Sector"],
      data: [
        {
          passengername: "Mr.John",
          sector: "BLR - DEL",
        },
      ],
    },
    {
      title: "Fare Details",
      headers: ["Pax Name", "Base Fare", "Tax and Charges", "Total Booking"],
      data: [
        {
          paxname: "Mr.Varatharajan",
          basefare: "₹9999",
          taxandcharges: "₹723",
          totalbooking: "₹9999",
        },
      ],
    },
    {
      title: "Payment methods",
      headers: ["Payment Mode", "Gateway Charges"],
      data: [
        {
          paymentmode: "Deposit Account/UPI",
          gatewaycharges: "Nil",
        },
      ],
    },
    {
      title: "Contact Details",
      headers: ["Mobile", "Email"],
      data: [
        {
          mobile: "+91 9751759216",
          email: "varadharajan@gmail.com",
        },
      ],
    },
  ],
};

export default function FlightPaymentDetails() {
  const flightListUrl = "/flightlist";
  // const [formData, setFormData] = useState(() =>
  //   fields.reduce((acc, field) => {
  //     acc[field.name] = field.type === "checkbox" ? false : "";
  //     return acc;
  //   }, {} as Record<string, string | boolean>)
  // );

  // // Handle field changes
  // const handleFieldChange = (name: string, value: string | boolean) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // Function to handle button click
  // const handlePaymentClick = () => {
  //   setOpen(true);
    
  // };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        width: "72%",
        padding: "20px 0px",
        margin: "auto",
      }}
    >
      <Row>
        <Col>
          <Panel className={styles.bookingPanel}>
            <Panel
              bordered
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "15px",
                padding: "2px",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                marginBottom: "20px", // Add margin-bottom to create a gap between the two panels
              }}
            >
              <Grid fluid>
                <Row gutter={16}>
                  <Col xs={18}>
                    <div
                      style={{
                        borderLeft: "4px solid orange",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#222222",
                        }}
                      >
                        Depart 14th July 2024
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        Bangalore (BLE) → New Delhi (DEL)
                      </div>
                      <div
                        style={{
                          color: "#9E9E9E",
                          padding: "0px 0px 10px",
                        }}
                      >
                        Non Stop | 02 hrs 50 min
                      </div>
                    </div>
                  </Col>
                  <Col
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end", // Align to the right
                      alignItems: "center", // Vertically center
                      marginTop: "30px", // Adjust this value to slightly move the button upwards
                    }}
                  >
                    <TButton label={"Change Flight"} link={flightListUrl} />
                  </Col>
                </Row>
              </Grid>
            </Panel>

            <Row>
              <Col xs={18}>
                <Panel
                  className={styles.bookingPanel}
                  style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                  }}
                >
                  <FlightInfo />
                </Panel>
              </Col>
              <Col xs={6}>
                <FareDetailsPanel list={FareDetailsList} Total="₹9,999" />
              </Col>
            </Row>
            <div>
              {Tabledata.sections.map((section, index) => (
                <div key={index}>
                  <Panel
                    style={{
                      marginBottom: "20px",
                      background: "#fff",
                      borderRadius: "10px",
                      marginTop: "20px",
                      boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        marginBottom: "10px",
                      }}
                    >
                      {section.title}
                    </div>
                    <TTable headers={section.headers} data={section.data} />
                  </Panel>
                </div>
              ))}
            </div>
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: "20px",
                fontSize: "14px",
                background: "#fff",
                padding: "20px",
                boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
              }}
            >
              {/* Checkbox with Label */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <input type="checkbox" id="agree" name="agree" />
                <label htmlFor="agree" style={{ marginLeft: "10px" }}>
                  By continuing to pay, I understand and agree with the {""}
                  <a
                    href={privacyPolicyUrl}
                    style={{ textDecoration: "none", color: "#0770E3" }}
                  >
                    privacy policy
                  </a>
                  , <br />
                  <a
                    href={userAgreementUrl}
                    style={{ textDecoration: "none", color: "#0770E3" }}
                  >
                    user agreement
                  </a>{" "}
                  and
                  <a
                    href={termsOfServiceUrl}
                    style={{ textDecoration: "none", color: "#0770E3" }}
                  >
                    terms of service
                  </a>
                  .
                </label>
              </div>

              {/* Total Amount and Make Payment Button */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: 700, marginRight: "20px" }}>
                  ₹9999
                </span>
                <TButton label={"MakePayment"} link="/billpayment" />
              </div>

              <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                  <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {open && (
                    <div style={{ marginTop: "20px" }}>
                      <iframe
                        src="payment"
                        width="100%"
                        height="500px"
                        title="Payment Iframe"
                        style={{ border: "none" }}
                      />
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose} appearance="primary">
                    Ok
                  </Button>
                  <Button onClick={handleClose} appearance="subtle">
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Panel>
        </Col>
      </Row>
    </div>
  );
}

// const rowStyle: React.CSSProperties = {
//   display: "flex",
//   flexWrap: "wrap",
//   gap: "16px",
// };
