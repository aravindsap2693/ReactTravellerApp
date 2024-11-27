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
import { setFareDetailsListt } from "../../Store/Slice/fareDetailsSlice";

import {
  addTravellerInfo,
  setBookingId,
  setContactInfo,
  setGstInfo,
} from "../../Store/Slice/bookingPayloadSlice";
import StepperHeader from "./StepperHeader";

import { reviewBooking } from "../../Api/reviewFlight.api";
import {
  setSearchQuery,
  setSt,
  setTotalPriceInfo,
  setTripInfos,
} from "../../Store/Slice/tripDataSlice";
import { FlightDetails } from "../../Interfaces/models/flight.model";

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

const steperList = [
  {
    title: "Flight Itinerary",
  },
  {
    title: "Add ons",
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
  const onwardFlightId = useSelector(
    (state: RootState) => state.booking.onwardFlightId
  );
  const returnFlightId = useSelector(
    (state: RootState) => state.booking.returnFlightId
  );
  const flightType = useSelector((state: RootState) => state.flight.flightType);
  const totalAmount = useSelector(
    (state: RootState) => state.bookingPayload.totalAmount
  );
  const errorMessages = useSelector(
    (state: RootState) => state.bookingPayload.errors
  );
  console.log(errorMessages, "errorMessages");
  const travellerInfo = useSelector(
    (state: any) => state.bookingPayload?.travellerInfo
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
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function findEmptySpecificFields(data: { [x: string]: string }, path = "") {
    let emptyFields: any[] = [];
    let fieldsToCheck: string | string[] = [];
    fieldsToCheck = ["email", "firstName", "lastName", "mobile"];

    for (let key in data) {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof data[key] === "object" && data[key] !== null) {
        // Recursively check nested objects or arrays
        emptyFields = emptyFields.concat(
          findEmptySpecificFields(data[key], currentPath)
        );
      } else if (fieldsToCheck.includes(key) && data[key] === "") {
        // If the field is in fieldsToCheck and is empty, store the path
        emptyFields.push(currentPath);
      }
    }

    return emptyFields;
  }
  const goStep = (emptyValidate: any[]) => {
    if (emptyValidate.length == 0) {
      setStep((prevStep) => Math.min(prevStep + 1, 4));
    }
  };
  const handleNextStep = () => {
    if (step == 0) {
      setStep((prevStep) => Math.min(prevStep + 1, 4));
    }
    if (step == 1) {
      const emptyValidate = findEmptySpecificFields(passengerData);
      goStep(emptyValidate);
    }
    if (step == 1) {
      if (gstData?.gstin == "") {
        setStep((prevStep) => Math.min(prevStep + 1, 4));
      } else {
        if (gstData?.gstin !== undefined && gstData?.gstin !== "") {
          if (
            gstData?.gstinMobile !== "" &&
            gstData?.gstinEmail &&
            gstData?.gstinPhone !== ""
          ) {
            setStep((prevStep) => Math.min(prevStep + 1, 4));
          }
        }
      }
    }
    if (step == 3) {
      if (
        contactDetails?.email_id !== undefined &&
        contactDetails?.mobile_number !== undefined
      ) {
        if (
          contactDetails?.email_id !== "" &&
          contactDetails?.mobile_number !== ""
        ) {
          setStep((prevStep) => Math.min(prevStep + 1, 4));
        }
      }
    }
    if (step == 2) {
      if (
        contactDetails?.email_id !== undefined &&
        contactDetails?.mobile_number !== undefined
      ) {
        if (
          contactDetails?.email_id !== "" &&
          contactDetails?.mobile_number !== ""
        ) {
          setStep((prevStep) => Math.min(prevStep + 1, 4));
        }
      }
    }
  };

  const [flightDetails, setFlightDetails] = useState<FlightDetails[]>([]);
  const [fareDetailsList, setFareDetailsList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [passengerData, setPassengerData] = useState<any>({
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
    email: gstInfo?.email || "",
    registeredName: gstInfo?.registeredName || "",
    mobile: gstInfo?.mobile || "",
    address: gstInfo?.address || "",
    gstin: gstInfo?.gstin || "",
    gstinMobile: gstInfo?.gstinMobile || "",
    gstinEmail: gstInfo?.gstinEmail || "",
    gstinPhone: gstInfo?.gstinPhone || "",
  });

  const [contactDetails, setContactDetails] = useState({
    emails: contactUser?.emails || "",
    contacts: contactUser?.contacts || "",
    email_id: contactUser?.contacts || "",
    mobile_number: contactUser?.mobile_number || "",
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
    if (flightType === "One Way") {
      // Call the API when the component mounts or flightId changes for One Way
      callBookingApi(flightType, flightId, null, null, dispatch);
    } else if (flightType === "Round Trip") {
      // Call the API when the component mounts or flight IDs change for round trip
      callBookingApi(
        flightType,
        null,
        onwardFlightId,
        returnFlightId,
        dispatch
      );
    }
    console.log("-==flightDetail", flightDetails);
  }, [dispatch, flightType, flightId, onwardFlightId, returnFlightId]);

  const callBookingApi = async (
    flightType: string,
    flightId: string | null,
    onwardFlightId: string | null,
    returnFlightId: string | null,
    dispatch: AppDispatch
  ) => {
    const payload =
      flightType === "One Way"
        ? { priceIds: [flightId] }
        : { priceIds: [onwardFlightId, returnFlightId].filter(Boolean) }; // Filter out null values

    setLoading(true);

    try {
      const apiResponse = await dispatch(reviewBooking(payload));

      if (apiResponse) {
        const data = apiResponse;

        dispatch(setBookingId(data.bookingId));
        dispatch(setTripInfos(data.tripInfos));
        dispatch(setSearchQuery(data.searchQuery));
        dispatch(setTotalPriceInfo(data.totalPriceInfo));

        // Handle setting 'st' from conditions properly
        if (data.conditions?.st) {
          dispatch(setSt(data.conditions.st)); // Assuming conditions is not inside tripInfos
        } else {
          console.error("Missing 'st' in conditions.");
        }

        // Check for status errors
        if (data.status === "Error") {
          setOpenModal(true);
        }

        // Handle tripInfos data
        if (flightType === "One Way") {
          if (data?.tripInfos) {
            setFlightDetails(data.tripInfos);

            const tripInfos = data.tripInfos;
            console.log(tripInfos, "tripInfos");

            // Extract fare details safely from tripInfos
            const fareDetailsList = tripInfos
              .flatMap((tripInfo: any) => {
                return tripInfo.totalPriceList.map((priceInfo: any) => {
                  const fareDetails = priceInfo?.fd?.ADULT?.fC;
                  const additionalFareDetails = priceInfo?.fd?.ADULT?.afC?.TAF;

                  // Safely handle missing fare details
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
              .filter(Boolean); // Removes null or undefined entries

            setFareDetailsList(fareDetailsList);
            dispatch(setFareDetailsListt(fareDetailsList));
          } else {
            console.error("Invalid data structure:", data);
          }
        } else if (flightType === "Round Trip") {
          if (data?.totalPriceInfo?.totalFareDetail) {
            setFlightDetails(data.tripInfos);
            const totalFareDetail = data.totalPriceInfo.totalFareDetail;
            let fareDetailsList = [];

            if (Array.isArray(totalFareDetail)) {
              fareDetailsList = totalFareDetail.flatMap((tripInfo: any) => {
                console.log("fareDetailsList====", tripInfo);
                return tripInfo.totalFareDetail.map((priceInfo: any) => {
                  const fareDetails = priceInfo?.fC;
                  console.log("fareDetails====", fareDetails);
                  const additionalFareDetails = priceInfo?.afC?.TAF;

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
              });
            } else if (typeof totalFareDetail === "object") {
              const fareDetails = totalFareDetail.fC;
              const additionalFareDetails = totalFareDetail.afC?.TAF;

              if (fareDetails && additionalFareDetails) {
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
                fareDetailsList = [
                  { list: FareDetailsList, Total: totalAmount },
                ];
              } else {
                console.error(
                  "Fare details missing for totalFareDetail:",
                  totalFareDetail
                );
              }
            } else {
              console.error(
                "totalFareDetail is not an array or object:",
                totalFareDetail
              );
            }

            setFareDetailsList(fareDetailsList);
            dispatch(setFareDetailsListt(fareDetailsList));
          } else {
            console.error("Total fare details are missing in the response.");
          }
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
    setPassengerData((prevState: any) => {
      const updatedPassengers = prevState[type].map(
        (passenger: any, i: number) => {
          if (i === parseInt(index)) {
            return { ...passenger, [field]: value };
          }
          return passenger;
        }
      );
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
                    type={
                      field.placeholder?.includes("umber")
                        ? "number"
                        : field.placeholder?.includes("Name")
                        ? "text"
                        : "email"
                    }
                    required={
                      field.placeholder == "Aadhar number" ? false : true
                    }
                    placeholder={field.placeholder}
                    value={passengerData[type]?.[index]?.[field.name] || ""} // Controlled component
                    onChange={(value) => {
                      handleInputChange(
                        `${type}-${index}-${field.name}`,
                        field.placeholder?.includes("Mobile")
                          ? value.toString().length <= 10
                            ? value
                            : value.toString().slice(0, 10)
                          : value // Truncate if longer than 10 digits
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
      ...passengerData.adults.map((data: any) => ({ ...data, pt: "ADULT" })),
      ...passengerData.children.map((data: any) => ({ ...data, pt: "CHILD" })),
      ...passengerData.infants.map((data: any) => ({ ...data, pt: "INFANT" })),
    ];
    // allPassengerData.forEach((traveller: any) => {
    //   dispatch(addTravellerInfo(traveller));
    // });
    dispatch(addTravellerInfo(allPassengerData));

    dispatch(setGstInfo(gstData as any));
    dispatch(setContactInfo(contactDetails));
    setStep((prevStep) => Math.min(prevStep + 1, 4));
  };
  const [is_agree, setIs_agree] = useState(true);
  const handleAgree = () => {
    setIs_agree(!is_agree);
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
                              {flight.sI.map((segment) => (
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
                        <TAccordion
                          header="Traveller Details"
                          icon={TravellerIcon}
                          defaultExpanded={step === 0 ? true : undefined}
                          classname={styles.bookingAccordian}
                          render={
                            <div>
                              {passengers.adults > 0 &&
                                generatePassengerFields(
                                  "adults",
                                  passengers.adults
                                )}
                              {passengers.children > 0 &&
                                generatePassengerFields(
                                  "children",
                                  passengers.children
                                )}
                              {passengers.infants > 0 &&
                                generatePassengerFields(
                                  "infants",
                                  passengers.infants
                                )}
                            </div>
                          }
                        />
                        <br />
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
                                      <div
                                        key={idx}
                                        style={{ marginBottom: "10px" }}
                                      >
                                        <label>{field.title}</label>

                                        {/* RSuite Input for input type fields */}
                                        <Input
                                          required={
                                            gstData?.gstin !== undefined &&
                                            gstData?.gstin !== "" &&
                                            gstData?.gstin !== null
                                              ? true
                                              : false
                                          }
                                          type={
                                            field.placeholder.includes("Email")
                                              ? "email"
                                              : "number"
                                          }
                                          placeholder={field.placeholder}
                                          value={
                                            gstData[
                                              field.name as keyof typeof gstData
                                            ] || ""
                                          } // Bind value from gstData
                                          onChange={(value) =>
                                            handleGstInputChange(
                                              field.name,
                                              field.placeholder?.includes(
                                                "Mobile"
                                              )
                                                ? value.toString().length <= 10
                                                  ? value
                                                  : value
                                                      .toString()
                                                      .slice(0, 10)
                                                : value // Truncate if longer than 10 digits
                                            )
                                          } // Handle change
                                        />
                                      </div>
                                    )
                                )}
                              </div>
                            </>
                          }
                        />
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
                      // background: "#b9d7fa",
                      background: "#91246830",
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
                                    flight.sI.map((segment: any) => (
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
                                          segment.so.map(
                                            (stop: any, stopIndex: number) => (
                                              <span key={stopIndex}>
                                                {stop.city} ({stop.code}) →{" "}
                                              </span>
                                            )
                                          )}
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
                        <Col
                          xs={12}
                          xsPush={4}
                          style={{ marginTop: "10px", verticalAlign: "middle" }}
                        >
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

                {step === 1 ? (
                  <>
                    {" "}
                    <TAccordion
                      header="Addons (Optional)"
                      classname={styles.bookingAccordian}
                      icon={AddonIcon}
                      defaultExpanded={step === 1 ? true : undefined}
                      render={<Addons />}
                    />
                    <br />
                    <div
                      style={{
                        display: "flex",
                        padding: "20px",
                        justifyContent: "center",
                      }}
                    >
                      <TButton label={"Continue"} onClick={handleNextStep} />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        // background: "#b9d7fa",
                        background: "#91246830",
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
                                gap: "20px",
                              }}
                            >
                              <div>
                                <img
                                  style={{
                                    width: "55px",
                                    height: "100%",
                                  }}
                                  src={AddonIcon}
                                  alt="AddonIcon"
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
                                    marginBottom: "5px",
                                  }}
                                >
                                  Add ons
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Grid>
                    </div>
                    <br />
                  </>
                )}

                {step === 3 ? (
                  <>
                    <TAccordion
                      header="Seat Selection"
                      classname={styles.bookingAccordian}
                      icon={SeatBlue}
                      defaultExpanded={step === 3 ? true : undefined}
                      render={<FlightSeatSelection />}
                    />
                    {/* {step === 2 ? (
                      <div
                        style={{
                          display: "flex",
                          padding: "20px",
                          justifyContent: "center",
                        }}
                      >
                        <TButton label={"Continue"} onClick={handleNextStep} />
                      </div>) : (<br />)} */}
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        background: "#91246830",
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
                                gap: "20px",
                              }}
                            >
                              <div>
                                <img
                                  style={{
                                    width: "55px",
                                    height: "100%",
                                  }}
                                  src={SeatBlue}
                                  alt="SeatBlue"
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "flex-start",
                                  gap: "20px",
                                }}
                              >
                                <div
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    marginBottom: "5px",
                                    marginTop: "20px",
                                  }}
                                >
                                  Seat Selection
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Grid>
                    </div>
                    <br />
                  </>
                )}

                {step === 3 ? (
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
                                    required={true}
                                    type={
                                      field.placeholder.includes("Number")
                                        ? "number"
                                        : "email"
                                    }
                                    id={field.name}
                                    placeholder={field.placeholder}
                                    value={
                                      contactDetails[
                                        field.name as keyof typeof contactDetails
                                      ] || ""
                                    }
                                    onChange={(value) =>
                                      handleContactUser(
                                        field.name,
                                        field.placeholder?.includes("Mobile")
                                          ? value.toString().length <= 10
                                            ? value
                                            : value.toString().slice(0, 10)
                                          : value // Truncate if longer than 10 digits
                                      )
                                    }
                                  />
                                </div>
                              )
                          )}
                        </div>
                      )
                    }
                  />
                ) : (
                  <>
                    <div
                      style={{
                        // background: "#b9d7fa",
                        background: "#91246830",
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
                                gap: "20px",
                              }}
                            >
                              <div>
                                <img
                                  style={{
                                    width: "55px",
                                    height: "100%",
                                  }}
                                  src={ContectIcon}
                                  alt="SeatBlue"
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "flex-start",
                                  gap: "20px",
                                }}
                              >
                                <div
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    marginBottom: "5px",
                                    marginTop: "20px",
                                  }}
                                >
                                  Review & Confirm
                                </div>
                              </div>
                            </div>
                          </Col>
                          {/* <Col xs={12}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                gap: "20px",
                              }}
                            >
                              <div>
                                <img
                                  style={{
                                    width: "55px",
                                    height: "100%",
                                  }}
                                  src={ContectIcon}
                                  alt="ContectIcon"
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
                                    marginBottom: "5px",
                                    marginTop: "20px",
                                  }}
                                >
                                  <div>
                                    <img
                                      style={{
                                        width: "55px",
                                        height: "100%",
                                      }}
                                      src={ContectIcon}
                                      alt="ContectIcon"
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
                                        marginBottom: "5px",
                                        marginTop: "20px",
                                      }}
                                    >
                                      Review & Confirm
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col> */}
                        </Row>
                      </Grid>
                    </div>

                    <br />
                  </>
                )}

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
                      style={{
                        borderRadius: "4px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        textDecoration: "none",
                        width: "100px",
                        backgroundColor: "#FA503F",
                        border: "none",
                        color: "#FFF",
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                ) : (
                  <br />
                )}

                {/* <Button
                  type="submit"
                  // onClick={handleNextStep}
                  style={{
                    borderRadius:"4px",
                    padding:"10px 20px",
                    cursor:"pointer",
                    textDecoration:"none",
                    width:"100px",
                    backgroundColor:"#FA503F",
                    border:"none",
                    color:"#FFF"
                  }}
                >
                  Continue
                </Button> */}
                {/* )} */}
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
            <input
              type="checkbox"
              id="agree"
              name="agree"
              onChange={handleAgree}
            />
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
              ₹{totalAmount}
            </span>
            <TButton
              disabled={is_agree}
              label={"Confirm Payment"}
              link="/payment"
            />
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
