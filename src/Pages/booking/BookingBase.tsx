/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import {
  Grid,
  Row,
  Col,
  Panel,
  Modal,
  SelectPicker,
  InputGroup,
  Input,
  Loader,
  Button,
} from "rsuite";

import styles from "../../assets/styles/booking.module.css";
import TTimer from "../../Component/Common/TTimer";
import TAccordion from "../../Component/Common/TAccordion";
import FareDetailsPanel from "./FareDetails";

import Addons from "./Addons";

import TButton from "../../Component/Common/TButton";

import TravellerIcon from "../../assets/icons/TravellerIcon.svg";
import GSTIcon from "../../assets/icons/GSTIcon.svg";

import AddonIcon from "../../assets/icons/AddonIcon.svg";
import FlightSummaryIcon from "../../assets/icons/FlightSummaryIcon.svg";
import ContectIcon from "../../assets/icons/ContactIcon.svg";
import PromoCode from "./PromoCode";
import FlightSeatSelection from "./AddonsComponent/SeatSelection";
import SeatBlue from "../../assets/icons/SeatBlue.svg";

import TimerIcon from "../../assets/images/Timer.svg";
import FareRule from "./FareRule";
// import { fetchFlightReviews } from "../../Store/Slice/flightReviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";

import {
  addTravellerInfo,
  setBookingId,
  setContactInfo,
  setGstInfo,
} from "../../Store/Slice/bookingPayloadSlice";
import StepperHeader from "./StepperHeader";
import TForm from "../../Component/Common/TForm";

import { reviewBooking } from "../../Api/reviewFlight.api";

interface GstInfo {
  gstNumber: string;
  email: string;
  registeredName: string;
  mobile: string;
  address: string;
}

interface FlightDetails {
  id: string;
  sI: {
    id: string;
    fD: {
      aI: {
        code: string;
        name: string;
        isLcc: boolean;
      };
      fN: string;
      eT: string;
    };
    stops: number;
    duration: number;
    da: {
      code: string;
      name: string;
      cityCode: string;
      city: string;
      country: string;
      countryCode: string;
    };
    aa: {
      code: string;
      name: string;
      cityCode: string;
      city: string;
      country: string;
      countryCode: string;
      terminal: string;
    };
    dt: string;
    at: string;
    iand: boolean;
    isRs: boolean;
    sN: number;
  }[];
}

const fontColor: string = "#F88D02";

const privacyPolicyUrl = "#";
const userAgreementUrl = "#";
const termsOfServiceUrl = "#";
const flightListUrl = "/flightlist";

// const FareDetailsList = [
//   {
//     title: "Base Fare",
//     value: "₹7,246",
//   },
//   {
//     title: "Taxes",
//     value: "₹1,500",
//   },
//   {
//     title: "Service Fee",
//     value: "₹500",
//   },
// ];

// const dataCancellation = [
//   { price: "Price", amount: "8999" },
//   // Add more rows if needed
// ];

// const dataReschedule = [
//   { price: "Price", amount: "8999" },
//   // Add more rows if needed
// ];

// const headers = ["Price", "Amount"];

const ContectFields = [
  {
    title: "Mobile Number",
    placeholder: "Mobile Number",
    name: "mobile_number",
    type: "input",
  },
  {
    title: "Email Id",
    placeholder: "Email Id",
    name: "email_id",
    type: "input",
  },
];

// const flightDetails = {
//   fareRules: [
//     {
//       title: "Additional Information",
//       content: [
//         "* GST and RAF charges will be applicable on the cancellation penalty.",
//         "* The above data is indicative, fare rules are subject to changes by the airline depending upon Fare class, and change/cancellation fee amounts may fluctuate in currency conversion rates.",
//         "* Although we try to keep this section updated regularly.",
//         "* Cancellation/Reissue fee will follow the more restrictive fare type.",
//         "* Feel free to call our Contact Centre for exact cancellation/change fee.",
//         "* Cancellation/date change request will be accepted 30hrs prior to departure.",
//       ],
//     },
//   ],
// };

const steperList = [
  {
    title: "Flight Itinerary",
  },
  {
    title: "Traveller Details",
  },
  {
    title: "Seat Selection",
  },
  {
    title: "Review and Confirm",
  },
];
const GSTFields = [
  { title: "GSTIN", placeholder: "GSTIN", name: "gstin", type: "input" },
  {
    title: "GSTIN Mobile Number",
    placeholder: "GSTIN Mobile Number",
    name: "gstinMobile",
    type: "input",
  },
  {
    title: "GSTIN Email Address",
    placeholder: "GSTIN Email Address",
    name: "gstinEmail",
    type: "input",
  },
  {
    title: "GSTIN Phone Number",
    placeholder: "GSTIN Phone Number",
    name: "gstinPhone",
    type: "input",
  },
];

const BookingBase: React.FC = () => {
  const flightId = useSelector((state: RootState) => state.booking.flightId);
  const errorMessages = useSelector(
    (state: RootState) => state.bookingPayload.errors
  );
  console.log(errorMessages, "errorMessages");
  const travellerInfo = useSelector(
    (state: RootState) => state.bookingPayload?.travellerInfo
  );
  const gstInfo = useSelector((state: any) => state.bookingDetails?.gstInfo);
  const contactUser = useSelector(
    (state: any) => state.bookingDetails?.contactInfo
  );

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
  const passengers = useSelector((state: any) => state.flightBanner.passengers);
  const [step, setStep] = useState<number>(0);
  const [showAccordion, setShowAccordion] = useState<boolean>(true);
  const [isAccordionExpanded, setIsAccordionExpanded] =
    useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 4));
    setShowAccordion(false);
  };
  const [flightDetails, setFlightDetails] = useState<FlightDetails[]>([]);
  const [fareDetailsList, setFareDetailsList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [passengerData, setPassengerData] = useState({
    adults: Array.from({ length: passengers.adults }, (_, index) => ({
      title: travellerInfo[index]?.title || "",
      firstName: travellerInfo[index]?.firstName || "",
      lastName: travellerInfo[index]?.lastName || "",
      dob: "",
      pNat: "",
      pNum: "",
      eD: "",
      ssrSeatInfos: [
        { key: "", code: "" },
        { key: "", code: "" },
      ],
      mobile: travellerInfo[index]?.mobile || "",
      email: travellerInfo[index]?.email || "",
      aadharNumber: travellerInfo[index]?.aadharNumber || "",
    })),
    children: Array.from({ length: passengers.children }, (_, index) => ({
      title: travellerInfo[index]?.title || "",
      firstName: travellerInfo[index]?.firstName || "",
      lastName: travellerInfo[index]?.lastName || "",
      dob: "",
      pNat: "",
      pNum: "",
      eD: "",
      ssrSeatInfos: [
        { key: "", code: "" },
        { key: "", code: "" },
      ],
      mobile: travellerInfo[index]?.mobile || "",
      email: travellerInfo[index]?.email || "",
      aadharNumber: travellerInfo[index]?.aadharNumber || "",
    })),
    infants: Array.from({ length: passengers.infants }, (_, index) => ({
      title: travellerInfo[index]?.title || "",
      firstName: travellerInfo[index]?.firstName || "",
      lastName: travellerInfo[index]?.lastName || "",
      dob: "",
      pNat: "",
      pNum: "",
      eD: "",
      ssrSeatInfos: [
        { key: "", code: "" },
        { key: "", code: "" },
      ],
      mobile: travellerInfo[index]?.mobile || "",
      email: travellerInfo[index]?.email || "",
      aadharNumber: travellerInfo[index]?.aadharNumber || "",
    })),
  });

  const [gstData, setGstData] = useState({
    gstNumber: gstInfo?.gstNumber || "",
    mobile: gstInfo?.mobile || "",
    email: gstInfo?.email || "",
    phone: gstInfo?.phone || "",
  });

  const [contactDetails, setContactDetails] = useState({
    emails: contactUser?.emails || "",
    contacts: contactUser?.contacts || "",
  });

  const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/review");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();

  //       if (data?.data?.payload?.tripInfos) {
  //         setFlightDetails(data.data.payload.tripInfos);
  //         const tripInfos = data.data.payload.tripInfos;

  //         const fareDetailsList = tripInfos.flatMap((tripInfo:any) => {
  //           return tripInfo.totalPriceList.map((priceInfo:any) => {
  //             const fareDetails = priceInfo?.fd?.ADULT?.fC;
  //             const additionalFareDetails = priceInfo?.fd?.ADULT?.afC?.TAF;

  //             if (!fareDetails || !additionalFareDetails) {
  //               console.error("Fare details missing for this priceInfo:", priceInfo);
  //               return null;
  //             }

  //             const totalAmount = `₹${fareDetails.TF || 0}`;
  //             const FareDetailsList = [
  //               {
  //                 title: "Base Fare",
  //                 value: `₹${fareDetails.BF || 0}`,
  //               },

  //               {
  //                 title: "Total Amount (Fare)",
  //                 value: `₹${fareDetails.TAF || 0}`,
  //               },
  //               {
  //                 title: "Other Charges (OT)",
  //                 value: `₹${additionalFareDetails.OT || 0}`,
  //               },
  //               {
  //                 title: "Miscellaneous Charges",
  //                 value: `₹${additionalFareDetails.MU || 0}`,
  //               },
  //               {
  //                 title: "Yearly Charges",
  //                 value: `₹${additionalFareDetails.YR || 0}`,
  //               },
  //               {
  //                 title: "AGST",
  //                 value: `₹${additionalFareDetails.AGST || 0}`,
  //               },
  //             ];
  //             return { list: FareDetailsList, Total: totalAmount };
  //           });
  //         }).filter(Boolean);

  //         setFareDetailsList(fareDetailsList);
  //       } else {
  //         console.error("Invalid data structure:", data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching plan details:", error);
  //     }
  //   };

  //   fetchPlans();
  // }, []);

  //   useEffect(() => {
  //     if (flightId) {
  //       // Call the API when the component mounts or flightId changes
  //       callBookingApi(flightId);
  //     }
  //   }, [flightId]);

  //   const callBookingApi = async (flightId: string) => {
  //     const payload = {
  //       priceIds: [flightId],
  //     };

  //   try {
  //     const response = await fetch(
  //       "https://traveller.mroot.in/backend/api/v1/booking/review",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       dispatch(setBookingId(data.bookingId));

  //       if (data.status === "Error") {
  //         setOpenModal(true);
  //       }
  //       if (data?.tripInfos) {
  //                 setFlightDetails(data.tripInfos);
  //                 const tripInfos = data.tripInfos;
  //                 // const isLCC = tripInfos.map((tripInfo: any) => {
  //                 //   return tripInfo.SI.map((seatInfo: any) => {
  //                 //     return seatInfo.fD?.aI?.isLcc;  // Extract the isLcc value
  //                 //   });
  //                 // });

  //                 // console.log("isLCC" , isLCC);  // Log the fully populated isLCC array

  //                 const fareDetailsList = tripInfos.flatMap((tripInfo:any) => {

  //                   return tripInfo.totalPriceList.map((priceInfo:any) => {
  //                     const fareDetails = priceInfo?.fd?.ADULT?.fC;
  //                     const additionalFareDetails = priceInfo?.fd?.ADULT?.afC?.TAF;

  //                     if (!fareDetails || !additionalFareDetails) {
  //                       console.error("Fare details missing for this priceInfo:", priceInfo);
  //                       return null;
  //                     }

  //                     const totalAmount = `₹${fareDetails.TF || 0}`;
  //                     const FareDetailsList = [
  //                       {
  //                         title: "Base Fare",
  //                         value: `₹${fareDetails.BF || 0}`,
  //                       },

  //                       {
  //                         title: "Total Amount (Fare)",
  //                         value: `₹${fareDetails.TAF || 0}`,
  //                       },
  //                       {
  //                         title: "Other Charges (OT)",
  //                         value: `₹${additionalFareDetails.OT || 0}`,
  //                       },
  //                       {
  //                         title: "Miscellaneous Charges",
  //                         value: `₹${additionalFareDetails.MU || 0}`,
  //                       },
  //                       {
  //                         title: "Yearly Charges",
  //                         value: `₹${additionalFareDetails.YR || 0}`,
  //                       },
  //                       {
  //                         title: "AGST",
  //                         value: `₹${additionalFareDetails.AGST || 0}`,
  //                       },
  //                     ];
  //                     return { list: FareDetailsList, Total: totalAmount };
  //                   });
  //                 }).filter(Boolean);

  //                 setFareDetailsList(fareDetailsList);

  //               } else {

  //                 console.error("Invalid data structure:", data);
  //               }
  //             }

  //   } catch (error) {
  //     console.error("Error calling the API:", error);
  //     setErrorMessage("An unexpected error occurred.");
  //     // Show modal for unexpected errors
  //   }
  // };

  useEffect(() => {
    if (flightId) {
      // Call the API when the component mounts or flightId changes
      callBookingApi(flightId, dispatch);
    }
  }, [flightId]);

  const callBookingApi = async (flightId: string, dispatch: AppDispatch) => {
    const payload = {
      priceIds: [flightId],
    };
    setLoading(true);
    try {
      const apiResponse = await dispatch(reviewBooking(payload));
      if (apiResponse) {
        const data = apiResponse;
        dispatch(setBookingId(data.bookingId));

        // Check for errors in the response
        if (data.status === "Error") {
          setOpenModal(true);
        }
        if (data?.tripInfos) {
          setFlightDetails(data.tripInfos);

          const tripInfos = data.tripInfos;
          console.log(tripInfos, "tripInfos");

          // Extract fare details from tripInfos
          const fareDetailsList = tripInfos
            .flatMap((tripInfo: any) => {
              return tripInfo.totalPriceList.map((priceInfo: any) => {
                const fareDetails = priceInfo?.fd?.ADULT?.fC;
                const additionalFareDetails = priceInfo?.fd?.ADULT?.afC?.TAF;

                if (!fareDetails || !additionalFareDetails) {
                  console.error(
                    "Fare details missing for this priceInfo:",
                    priceInfo
                  );
                  return null;
                }

                const totalAmount = `₹${fareDetails.TF || 0}`;
                const FareDetailsList = [
                  { title: "Base Fare", value: `₹${fareDetails.BF || 0}` },
                  {
                    title: "Total Amount (Fare)",
                    value: `₹${fareDetails.TAF || 0}`,
                  },
                  {
                    title: "Other Charges (OT)",
                    value: `₹${additionalFareDetails.OT || 0}`,
                  },
                  {
                    title: "Miscellaneous Charges",
                    value: `₹${additionalFareDetails.MU || 0}`,
                  },
                  {
                    title: "Yearly Charges",
                    value: `₹${additionalFareDetails.YR || 0}`,
                  },
                  {
                    title: "AGST",
                    value: `₹${additionalFareDetails.AGST || 0}`,
                  },
                ];
                return { list: FareDetailsList, Total: totalAmount };
              });
            })
            .filter(Boolean);

          setFareDetailsList(fareDetailsList);
        } else {
          console.error("Invalid data structure:", data);
        }
      } else {
        console.error("API call unsuccessful:", apiResponse);
      }
    } catch (error) {
      console.error("Error calling the API:", error);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  console.log("flightDetails", flightDetails);

  // useEffect(() => {
  //   if (flightId) {
  //     dispatch(fetchBooking(flightId));
  //   }
  // }, [dispatch, flightId]);
  const handleCloseModal = () => {
    setOpenModal(false);
    //router.push("/flightlist");
  };

  const PassengerFields = [
    {
      title: "Title",
      placeholder: "Mr/...",
      type: "select",
      name: "title",
      options: [
        { label: "Mr", value: "mr" },
        { label: "Ms", value: "ms" },
        { label: "Mrs", value: "mrs" },
      ],
    },
    {
      title: "First Name",
      placeholder: "First Name",
      type: "input",
      name: "firstName",
    },
    {
      title: "Last Name",
      placeholder: "Last Name",
      type: "input",
      name: "lastName",
    },
    {
      title: "Mobile Number",
      placeholder: "Mobile Number",
      type: "input",
      name: "mobile",
    },
    {
      title: "Email ID",
      placeholder: "Email ID",
      type: "input",
      name: "email",
    },
    {
      title: "Aadhar number",
      placeholder: "Aadhar number",
      type: "input",
      name: "aadharNumber",
    },
  ];

  // Handle changes for each passenger's field
  const handleInputChange = (name: string, value: string) => {
    const [type, index, field] = name.split("-"); // Split the name into parts
    setPassengerData((prevState) => {
      const updatedPassengers = prevState[type].map((passenger, i) => {
        if (i === parseInt(index)) {
          return { ...passenger, [field]: value };
        }
        return passenger;
      });
      return { ...prevState, [type]: updatedPassengers }; // Return updated state
    });
  };

  const generatePassengerFields = (type: string, count: number) => {
    const passengerType =
      type === "adults" ? "Adult" : type === "children" ? "Child" : "Infant";
    return Array.from({ length: count }, (_, index) => (
      <div key={`${type}-${index}`} className="passenger-section">
        <h5>{`${passengerType} ${index + 1}`}</h5>
        <div className="passenger-fields-row" style={rowStyle}>
          {PassengerFields.map((field, idx) => (
            <div
              key={`${type}-${index}-${idx}`}
              className="passenger-field"
              style={{ marginBottom: "10px" }}
            >
              {field.type === "select" ? (
                // If the field is a select type, use SelectPicker from RSuite
                <SelectPicker
                  placeholder={field.placeholder}
                  data={field.options || []} // Ensure this is an array of objects with value and label
                  value={passengerData[type]?.[index]?.[field.name] || ""} // Controlled component
                  onChange={(value) => {
                    handleInputChange(`${type}-${index}-${field.name}`, value); // Call input change handler
                  }}
                />
              ) : (
                // Otherwise, use Input for text fields
                <InputGroup inside>
                  <Input
                    placeholder={field.placeholder}
                    value={passengerData[type]?.[index]?.[field.name] || ""} // Controlled component
                    onChange={(value) => {
                      handleInputChange(
                        `${type}-${index}-${field.name}`,
                        value
                      ); // Call input change handler
                    }}
                  />
                  {/* If you want to add additional buttons, you can add them here */}
                </InputGroup>
              )}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const handleContactUser = (name: string, value: string) => {
    setContactDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGstInputChange = (name: any, value: any) => {
    setGstData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const allPassengerData = [
      ...passengerData.adults.map((data) => ({ ...data, pt: "ADULT" })),
      ...passengerData.children.map((data) => ({ ...data, pt: "CHILD" })),
      ...passengerData.infants.map((data) => ({ ...data, pt: "INFANT" })),
    ];
    allPassengerData.forEach((traveller: any) => {
      dispatch(addTravellerInfo(traveller));
    });
    dispatch(setGstInfo(gstData as any));
    dispatch(setContactInfo(contactDetails));
    setStep((prevStep) => Math.min(prevStep + 1, 4));
    setShowAccordion(false);
  };

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage || "An unexpected error occurred. Please try again."}
        </Modal.Body>
        <Modal.Footer>
          <TButton
            onClick={handleCloseModal}
            label={"Go Back"}
            link="/flightlist"
          />
        </Modal.Footer>
      </Modal>
      <Grid
        fluid
        style={{
          // background: "linear-gradient(to right, #0770E3, #0087E1, #174495)",
          padding: "0 20px",
          color: "#fff",
        }}
        className="stepperContainer"
      >
        <Row>
          <Col
            xs={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "77%",
                margin: "0 auto",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <StepperHeader step={step} list={steperList} />
            </div>
          </Col>
        </Row>
      </Grid>
      <div
        style={{
          width: "72%",
          padding: "20px 0px",
          margin: "auto",
        }}
      >
        <Row>
          <Col xs={19}>
            <form onSubmit={handleSubmit}>
              <Panel>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    padding: "10px 0px 20px",
                  }}
                >
                  Complete Your Booking Details
                </div>

                {step === 0 ? (
                  <>
                    {loading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "20px",
                        }}
                      >
                        <Loader />
                      </div>
                    ) : (
                      <>
                        <div>
                          {flightDetails.map((flight) => (
                            <div key={flight.id}>
                              {flight.sI.map((segment, index) => (
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
                                            Depart{" "}
                                            {new Date(
                                              segment.dt
                                            ).toLocaleDateString()}
                                          </div>
                                          <div
                                            style={{
                                              fontSize: "14px",
                                              fontWeight: 700,
                                            }}
                                          >
                                            {segment.da.city} ({segment.da.code}
                                            ) →{" "}
                                            {segment.stops > 0 &&
                                              segment.so.map(
                                                (stop: any, stopIndex: any) => (
                                                  <span key={stopIndex}>
                                                    {stop.city} ({stop.code}) →
                                                    stop
                                                  </span>
                                                )
                                              )}
                                            {segment.aa.city} ({segment.aa.code}
                                            )
                                          </div>
                                          <div
                                            style={{
                                              color: "#9E9E9E",
                                              padding: "0px 0px 10px",
                                            }}
                                          >
                                            {segment.stops === 0
                                              ? "Non Stop"
                                              : `${segment.stops} Stop(s)`}{" "}
                                            |{" "}
                                            {Math.floor(segment.duration / 60)}{" "}
                                            hrs {segment.duration % 60} min
                                          </div>
                                        </div>
                                      </Col>
                                      <Col
                                        xs={6}
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          alignItems: "center",
                                          marginTop: "30px",
                                        }}
                                      >
                                        <TButton
                                          label={"Change Flight"}
                                          link={flightListUrl} // Update with actual link
                                        />
                                      </Col>
                                    </Row>
                                  </Grid>
                                </Panel>
                              ))}
                              <div>
                                {flight.sI.map((segment) => (
                                  <div
                                    key={segment.id}
                                    style={{
                                      display: "flex",
                                      padding: "10px 0",
                                    }}
                                  >
                                    <Panel
                                      bordered
                                      style={{
                                        backgroundColor: "#FFFFFF",
                                        borderRadius: "15px",
                                        padding: "10px",
                                        boxShadow:
                                          "0 3px 10px rgb(0 0 0 / 0.2)",
                                        marginTop: "20px",
                                        width: "100%",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "10px 0",
                                        }}
                                      >
                                        <div
                                          style={{
                                            borderRight: "1px solid lightgrey",
                                            paddingRight: "25px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "flex-start",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <div
                                              style={{ marginRight: "10px" }}
                                            >
                                              <img
                                                src={`https://static.tripjack.com/img/airlineLogo/v1/${segment.fD.aI.code}.png`}
                                                alt="Airline Icon"
                                                width={45}
                                                height={45}
                                              />
                                            </div>
                                            <div>
                                              <p
                                                style={{
                                                  fontWeight: "500",
                                                  fontSize: "18px",
                                                }}
                                              >
                                                {segment.fD.aI.name}
                                              </p>
                                              <span
                                                style={{
                                                  fontWeight: "500",
                                                  color: "#9E9E9E",
                                                  fontSize: "14px",
                                                }}
                                              >
                                                ({segment.fD.aI.code})
                                              </span>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              color: "#019901",
                                              padding: "5px 0px",
                                            }}
                                          >
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
                                            <div
                                              style={{
                                                fontWeight: "700",
                                                fontSize: "18px",
                                              }}
                                            >
                                              {new Date(
                                                segment.dt
                                              ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </div>
                                            <div style={{ color: "#9E9E9E" }}>
                                              {new Date(
                                                segment.dt
                                              ).toLocaleDateString()}
                                            </div>
                                            <div
                                              style={{
                                                fontWeight: "700",
                                                fontSize: "18px",
                                                marginTop: "10px",
                                              }}
                                            >
                                              {segment.da.code}
                                            </div>
                                            <div style={{ color: "#9E9E9E" }}>
                                              {segment.da.name}
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              textAlign: "center",
                                              marginTop: "30px",
                                              padding: "15px",
                                            }}
                                          >
                                            <img
                                              src={TimerIcon}
                                              alt="Flight Duration"
                                            />
                                            <div
                                              style={{
                                                fontWeight: "700",
                                                fontSize: "18px",
                                              }}
                                            >
                                              {Math.floor(
                                                segment.duration / 60
                                              )}
                                              h {segment.duration % 60}m
                                            </div>
                                            <div style={{ color: "#9E9E9E" }}>
                                              {segment.stops === 0
                                                ? "Non Stop"
                                                : `${segment.stops} Stop(s)`}
                                            </div>
                                            <div>
                                              {segment.stops !== 0 &&
                                                segment.so.map(
                                                  (
                                                    stop: any,
                                                    stopIndex: any
                                                  ) => (
                                                    <span key={stopIndex}>
                                                      {stop.city} ({stop.code})
                                                    </span>
                                                  )
                                                )}
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              textAlign: "left",
                                              paddingLeft: "20px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                fontWeight: "700",
                                                fontSize: "18px",
                                              }}
                                            >
                                              {new Date(
                                                segment.at
                                              ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </div>
                                            <div style={{ color: "#9E9E9E" }}>
                                              {new Date(
                                                segment.at
                                              ).toLocaleDateString()}
                                            </div>
                                            <div
                                              style={{
                                                fontWeight: "700",
                                                fontSize: "18px",
                                                marginTop: "10px",
                                              }}
                                            >
                                              {segment.aa.code}
                                            </div>
                                            <div style={{ color: "#9E9E9E" }}>
                                              {segment.aa.name}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "20px",
                          }}
                        >
                          <TButton
                            label={"Continue"}
                            onClick={handleNextStep}
                          />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div
                    style={{
                      background: "#b9d7fa",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <Grid fluid>
                      <Row gutter={16}>
                        <Col xs={12}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "flex-start",
                              gap: "10px",
                            }}
                          >
                            <div>
                              <img
                                style={{
                                  width: "55px",
                                  height: "100%",
                                }}
                                src={FlightSummaryIcon}
                                alt="FlightSummaryIcon"
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "1px",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{
                                  fontWeight: "700",
                                  fontSize: "18px",
                                  marginBottom: "2px",
                                }}
                              >
                                Flight Summary Flight Summary
                              </div>
                              <div
                                style={{
                                  fontWeight: "600",
                                  fontSize: "15px",
                                  marginBottom: "10px",
                                }}
                              >
                                <>
                                  {flightDetails.map((flight) =>
                                    flight.sI.map((segment, index) => (
                                      <div
                                        key={segment.id}
                                        style={{
                                          fontWeight: "600",
                                          fontSize: "15px",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        {/* Display Departure City and Airport */}
                                        {segment.da.city} ({segment.da.code}) →{" "}
                                        {/* If there is a stopover, display the stopover information */}
                                        {segment.stops > 0 &&
                                          segment.so.map((stop, stopIndex) => (
                                            <span key={stopIndex}>
                                              {stop.city} ({stop.code}) →{" "}
                                            </span>
                                          ))}
                                        {/* Display Final Destination */}
                                        {
                                          flight.sI[flight.sI.length - 1].aa
                                            .city
                                        }{" "}
                                        (
                                        {
                                          flight.sI[flight.sI.length - 1].aa
                                            .code
                                        }
                                        )
                                      </div>
                                    ))
                                  )}
                                </>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} xsPush={8}>
                          <div>
                            <TButton
                              label={"Change Flight"}
                              link={flightListUrl}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Grid>
                  </div>
                )}
                <br />
                {/* <TAccordion
                header="Traveller Details"
                icon={TravellerIcon}
                defaultExpanded={step === 1 ? true : undefined}
                classname={styles.bookingAccordian}
                render={
                  <div>
                    {passengers.adults > 0 && generatePassengerFields("adults", passengers.adults)}
                    {passengers.children > 0 && generatePassengerFields("children", passengers.children)}
                    {passengers.infants > 0 && generatePassengerFields("infants", passengers.infants)}
                  </div>
                }
              /> */}

                <TAccordion
                  header="Traveller Details"
                  icon={TravellerIcon}
                  defaultExpanded={step === 1 ? true : undefined}
                  classname={styles.bookingAccordian}
                  render={
                    <div>
                      {passengers.adults > 0 &&
                        generatePassengerFields("adults", passengers.adults)}
                      {passengers.children > 0 &&
                        generatePassengerFields(
                          "children",
                          passengers.children
                        )}
                      {passengers.infants > 0 &&
                        generatePassengerFields("infants", passengers.infants)}
                    </div>
                  }
                />

                <br />

                <TAccordion
                  header="Addons (Optional)"
                  classname={styles.bookingAccordian}
                  icon={AddonIcon}
                  defaultExpanded={step === 1 ? true : undefined}
                  render={<Addons />}
                />
                <TAccordion
                  header="GST Details for Business travel (Optional)"
                  icon={GSTIcon}
                  defaultExpanded={true} // Expand based on your logic
                  classname={styles.bookingAccordian}
                  render={
                    <>
                      <div style={rowStyle}>
                        {GSTFields.map(
                          (field, idx) =>
                            // Only render fields that are of type 'input'
                            field.type === "input" && (
                              <div key={idx} style={{ marginBottom: "10px" }}>
                                <label>{field.title}</label>

                                {/* RSuite Input for input type fields */}
                                <Input
                                  placeholder={field.placeholder}
                                  value={
                                    gstData[
                                      field.name as keyof typeof gstData
                                    ] || ""
                                  } // Bind value from gstData
                                  onChange={(value) =>
                                    handleGstInputChange(field.name, value)
                                  } // Handle change
                                />
                              </div>
                            )
                        )}
                      </div>
                    </>
                  }
                />
                <br />
                {step === 1 ? (
                  <div
                    style={{
                      display: "flex",
                      padding: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <TButton label={"Continue"} onClick={handleNextStep} />
                  </div>
                ) : (
                  <br />
                )}

                {errorMessages !==
                  "Seat Selection Not Applicable for this Itinerary" && (
                  <TAccordion
                    header="Seat Selection"
                    classname={styles.bookingAccordian}
                    icon={SeatBlue}
                    defaultExpanded={step === 2 ? true : undefined}
                    render={<FlightSeatSelection />}
                  />
                )}
                {step === 2 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                  >
                    <TButton label={"Continue"} onClick={handleNextStep} />
                  </div>
                ) : (
                  <br />
                )}
                <TAccordion
                  header="Contact Details"
                  icon={ContectIcon}
                  defaultExpanded={step === 3 ? true : undefined}
                  classname={styles.bookingAccordian}
                  render={
                    ContectFields.length > 0 && (
                      <div style={rowStyle}>
                        {ContectFields.map(
                          (field, idx) =>
                            // Render only input fields
                            field.type === "input" && (
                              <div key={idx} style={{ marginBottom: "10px" }}>
                                <label htmlFor={field.name}>
                                  {field.title}
                                </label>
                                <Input
                                  id={field.name}
                                  placeholder={field.placeholder}
                                  value={
                                    contactDetails[
                                      field.name as keyof typeof contactDetails
                                    ] || ""
                                  }
                                  onChange={(value) =>
                                    handleContactUser(field.name, value)
                                  }
                                />
                              </div>
                            )
                        )}
                      </div>
                    )
                  }
                />
                {step === 3 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                  >
                    <Button
                      type="submit"
                      // onClick={handleNextStep}
                    >
                      Continue
                    </Button>
                  </div>
                ) : (
                  <br />
                )}
              </Panel>
            </form>
            {/* <button>Submit Passenger Details</button> */}
          </Col>
          <Col xs={5}>
            {fareDetailsList.map((fareDetails, index) => (
              <FareDetailsPanel
                key={index}
                list={fareDetails.list}
                Total={fareDetails.Total}
              />
            ))}

            <FareRule />
            <div style={{ padding: "20px" }}>
              <TTimer fontColor={fontColor} timeInSec={1200} />
            </div>
            <PromoCode />
          </Col>
        </Row>
        {/* Terms and condition */}
      </div>
      {step === 4 ? (
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
            <span style={{ fontWeight: 700, marginRight: "20px" }}>₹9999</span>
            <TButton label={"ConfirmPayment"} link="/payment" />
          </div>
        </div>
      ) : (
        <br />
      )}
    </>
  );
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  // flexWrap: "wrap",
  gap: "16px",
  paddingTop: "20px",
};

export default BookingBase;
