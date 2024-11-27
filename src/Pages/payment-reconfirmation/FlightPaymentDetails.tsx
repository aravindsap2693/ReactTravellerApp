/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Grid, Row, Col, Panel } from "rsuite";
// import { FlightInfo } from "../Flight-listing-card/FlightListBanner/FlightDetailsPopup";
import styles from "../../assets/styles/booking.module.css";
import FareDetailsPanel from "../booking/FareDetails";

// import luggage from "../../assets/images/Luggage.svg";

import { Modal, Button } from "rsuite";
import TButton from "../../Component/Common/TButton";
import TTable from "../../Component/Common/TTable";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

import TimerIcon from "../../assets/images/Timer.svg"
import { DataItemProps } from "../../Interfaces/models/common.model";


export default function FlightPaymentDetails() {
  const flightDetails = useSelector((state:RootState) => state?.tripData?.tripInfos);

  console.log("tripDatas==========",flightDetails)
  const fareDetailsList:any = useSelector((state: RootState) => state.fareDetails.fareDetailsList);
  console.log("fareDetailsList==========",fareDetailsList)
  // const passengerDetails = useSelector((state: RootState) => state?.flightBanner);
 
  const bookingPayloadInfo = useSelector((state:RootState)=>state?.bookingPayload)
  const fromPlace = useSelector((state: RootState)=> state?.flightBanner?.departure?.code)
  const toPlace = useSelector((state: RootState)=> state?.flightBanner?.destination?.code)
 
 // Extract departure and destination details safely with optional chaining
// const departureCity = passengerDetails?.departure?.city;
// const departureCode = passengerDetails?.departure?.code;
// const destinationCity = passengerDetails?.destination?.city;
// const destinationCode = passengerDetails?.destination?.code;
const totalAmount = bookingPayloadInfo?.totalAmount
// const stops = tripDatas?.tripInfos[0]?.sI[0]?.so || [];
// const stopString = stops.map((stop: any) => `${stop.city} (${stop.code})`).join(" → ");
// const durationInMinutes = tripDatas?.tripInfos[0]?.sI[0]?.duration;
// const stopsCount = tripDatas?.tripInfos[0]?.sI[0]?.so?.length || 0

console.log("bookingPayloadInfo",bookingPayloadInfo)

// // Format the route string with stops if available
// const routeString = departureCity && departureCode && destinationCity && destinationCode
//   ? stops.length > 0
//     ? `${departureCity} (${departureCode}) → ${stopString} → ${destinationCity} (${destinationCode})`
//     : `${departureCity} (${departureCode}) → ${destinationCity} (${destinationCode})`
//   : "Route information unavailable";


// Calculate hours and minutes
// const hours = Math.floor(durationInMinutes / 60);
// const minutes = durationInMinutes % 60;
// const formattedDuration = `${hours}h ${minutes}min`;

// // Displaying "Non-stop" or stop count
// const stopInfo = stopsCount === 0 ? "Non-stop" : `${stopsCount} ${stopsCount > 1 ? 'stops' : 'stop'}`;

// depature date
// const originalDate = passengerDetails.departureDate;
//   let departureDate: string | undefined;
//   if (originalDate) {
//     const date = new Date(originalDate);
//     const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }; 
//     departureDate = date.toLocaleDateString('en-GB', options);
//   }

  const privacyPolicyUrl = "#";
  const userAgreementUrl = "#";
  const termsOfServiceUrl = "#";
  
  // const FareDetailsList = [
  //   {
  //     title: "Base Fare",
  //     value: "₹7,246",
  //   },
  //   {
  //     title: "Tax & charges",
  //     value: "₹1,500",
  //   },
  // ];
  
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
        data: bookingPayloadInfo.travellerInfo.map((traveller) => 
        ({
          passengername: `${traveller?.title.replace('m','M')}. ${traveller?.firstName} ${traveller?.lastName}`,
          sector: `${fromPlace} - ${toPlace}`,
        })),
      },
      {
        title: "Fare Details",
        headers: ["Pax Name", "Base Fare", "Tax and Charges", "Total Booking"],
        data: [
          {
            paxname: bookingPayloadInfo.contactInfo?.email_id,
            basefare: `${fareDetailsList[0]?.list[0]?.value}`,
            taxandcharges: `${fareDetailsList[0]?.list[1]?.value}`,
            totalbooking: totalAmount,
          },
        ],
      },
      // {
      //   title: "Payment methods",
      //   headers: ["Payment Mode", "Gateway Charges"],
      //   data: [
      //     {
      //       paymentmode: "Deposit Account/UPI",
      //       gatewaycharges: "Nil",
      //     },
      //   ],
      // },
      {
        title: "Contact Details",
        headers: ["Mobile", "Email"],
        data: [
          {
            mobile: bookingPayloadInfo.contactInfo?.mobile_number,
            email: bookingPayloadInfo.contactInfo?.email_id,
          },
        ],
      },
    ],
  };




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
  const [is_agree, setIs_agree]=useState(true);
  const handleAgree=()=>{
    setIs_agree(!is_agree);
  }



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
      <Col xs={18}>
          <Panel className={styles.bookingPanel}>
          <div>
      {flightDetails.map((flight: any) => (
        <div key={flight.id}>
          {flight.sI.map((segment: any) => (
            <Panel
              key={segment.id}
              bordered
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "15px",
                padding: "2px",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                marginBottom: "20px",
              }}
            >
              <Grid fluid>
                <Row gutter={16}>
                  <Col xs={18}>
                    <div style={{ borderLeft: "4px solid orange", padding: "10px" }}>
                      <div style={{ fontSize: "12px", fontWeight: 500, color: "#222222" }}>
                        Depart {new Date(segment.dt).toLocaleDateString()}
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 700 }}>
                        {segment.da.city} ({segment.da.code}) →
                        {segment.stops > 0 && segment.so.map((stop: any, stopIndex: number) => (
                          <span key={stopIndex}>
                            {stop.city} ({stop.code}){stopIndex < segment.so.length - 1 ? ' → ' : ' → '}
                          </span>
                        ))}
                        {segment.aa.city} ({segment.aa.code})
                      </div>
                      <div style={{ color: "#9E9E9E", padding: "0px 0px 10px" }}>
                        {segment.stops === 0 ? "Non Stop" : `${segment.stops} Stop(s)`} | {Math.floor(segment.duration / 60)} hrs {segment.duration % 60} min
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "30px" }}>
                    <TButton label={"Change Flight"} link={flightListUrl} /> {/* Update with actual link */}
                  </Col>
                </Row>
              </Grid>
            </Panel>
          ))}

         
        </div>
      ))}
    </div>
            {/* <Panel
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
                        Depart {departureDate}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        {routeString}
                      </div>
                      <div
                        style={{
                          color: "#9E9E9E",
                          padding: "0px 0px 10px",
                        }}
                      >
                        {stopInfo} | {formattedDuration}
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
            </Panel> */}


            <Row>
              <Col xs={18}>
              {flightDetails.map((flight: any) => (
        <div key={flight.id}>
              
            {flight.sI.map((segment: any) => (
              <div key={segment.id} style={{ display: "flex", padding: "10px 0" }}>
                <Panel
                  bordered
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "15px",
                    padding: "10px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                    marginTop: "20px",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", padding: "10px 0" }}>
                    <div style={{ borderRight: "1px solid lightgrey", paddingRight: "25px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "10px" }}>
                        <div style={{ marginRight: "10px" }}>
                          <img
                            src={`https://static.tripjack.com/img/airlineLogo/v1/${segment.fD.aI.code}.png`}
                            alt="Airline Icon"
                            width={45}
                            height={45}
                          />
                        </div>
                        <div>
                          <p style={{ fontWeight: "500", fontSize: "18px" }}>{segment.fD.aI.name}</p>
                          <span style={{ fontWeight: "500", color: "#9E9E9E", fontSize: "14px" }}>
                            ({segment.fD.aI.code})
                          </span>
                        </div>
                      </div>
                      <div style={{ color: "#019901", padding: "5px 0px" }}>Partially Refundable</div>
                      <div>Economy Class</div>
                    </div>
                    <div style={{ flex: 2, display: "flex", justifyContent: "space-around", padding: "0px 15px" }}>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: "700", fontSize: "18px" }}>
                          {new Date(segment.dt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div style={{ color: "#9E9E9E" }}>{new Date(segment.dt).toLocaleDateString()}</div>
                        <div style={{ fontWeight: "700", fontSize: "18px", marginTop: "10px" }}>{segment.da.code}</div>
                        <div style={{ color: "#9E9E9E" }}>{segment.da.name}</div>
                      </div>
                      <div style={{ textAlign: "center", marginTop: "30px", padding: "15px" }}>
                        <img src={TimerIcon} alt="Flight Duration" />
                        <div style={{ fontWeight: "700", fontSize: "18px" }}>
                          {Math.floor(segment.duration / 60)} h {segment.duration % 60} m
                        </div>
                        <div style={{ color: "#9E9E9E" }}>{segment.stops === 0 ? "Non Stop" : `${segment.stops} Stop(s)`}</div>
                        <div>
                          {segment.stops !== 0 && segment.so.map((stop: any, stopIndex: number) => (
                            <span key={stopIndex}>{stop.city} ({stop.code}){stopIndex < segment.so.length - 1 ? ', ' : ''}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: "left", paddingLeft: "20px" }}>
                        <div style={{ fontWeight: "700", fontSize: "18px" }}>
                          {new Date(segment.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div style={{ color: "#9E9E9E" }}>{new Date(segment.at).toLocaleDateString()}</div>
                        <div style={{ fontWeight: "700", fontSize: "18px", marginTop: "10px" }}>{segment.aa.code}</div>
                        <div style={{ color: "#9E9E9E" }}>{segment.aa.name}</div>
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
            ))}
          </div>
              ))}
              </Col>
              <Col xs={6}>
                {/* <FareDetailsPanel list={FareDetailsList} Total="₹9,999" /> */}
                {fareDetailsList.map((fareDetails:any, index:number) => (
              <FareDetailsPanel
                key={index}
                list={fareDetails?.list}
                Total={fareDetails?.Total}
              />
            ))}
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
                    <TTable headers={section.headers} data={section.data as DataItemProps[]}/>
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
                <input type="checkbox" id="agree" name="agree"  onChange={handleAgree} />
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
                  ₹ {totalAmount}
                </span>
                <TButton disabled={is_agree} label={"Make Payment"} link="/billpayment" />
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
