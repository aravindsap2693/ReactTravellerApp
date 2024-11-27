


export const LOGIN = "/login";
export const REGISTER = "/register";
export const HOME = "/home";
export const BOOKING = "/booking";


export const TravelAgentList = [
  {
    number: 1,
    fontColor: "#564FFD",
    color: "#FD6922",
    text: "Fill in the join us form",
  },
  {
    number: 2,
    fontColor: "#E34444",
    color: "#68B7FF",
    text: "Send us your documents",
  },
  {
    number: 3,
    fontColor: "#50C878",
    color: "#50C878",
    text: "Receive your authorized license and start your travel business",
  },
];

export const AdvantagesList = [
  {
    color: "#68B7FF",
    class: "steperOne",
    title: "Get easy access to booking and payment records",
  },
  {
    color: "#85E0A3",
    title: "Manage easy post-booking modifications on flights",
  },
  {
    color: "#E6E6E6",
    title: "Safe and hygienic stays with MySafety compliant properties",
  },
  {
    color: "#FFAFA3",
    title: "Share options directly with your audience on WhatsApp",
  },
  {
    color: "#FFC470",
    title: "Enjoy the best-in-class cancellation policies on hotels",
  },
  {
    color: "#D9B8FF",
    title: "Get booking confirmations printed under your agency’s logo",
  },
];

export const PassengerFields = [
  {
    title: "Search Criteria",
    placeholder: "Reference No",
    type: "select",
    name: "title",
    options: [
      { label: "100", value: "100" },
      { label: "101", value: "101" },
      { label: "102", value: "102" },
    ],
  },
  {
    title: "Search",
    placeholder: "Search Text",
    type: "input",
    name: "Search",
  },
  {
    title: "Service",
    placeholder: "flight",
    type: "select",
    name: "Service",
    options: [
      { label: "flight", value: "flight" },
      { label: "hotel", value: "hotel" },
    ],
  },
  {
    title: "Airline",
    placeholder: "Airline",
    type: "select",
    name: "Airline",
    options: [
      { label: "Indigo", value: "indigo" },
      { label: "Air Vistara", value: "airvistara" },
    ],
  },
  {
    title: "Status",
    placeholder: "All",
    type: "select",
    name: "Status",
    options: [
      { label: "Indigo", value: "indigo" },
      { label: "Air Vistara", value: "airvistara" },
    ],
  },
];

export const planDetails = [
  {
    title: "3 Years",
    priceMonthly: "₹50,000",
    priceTotal: "₹150,000",
    description: "Everything you need to get started",
    features: [
      "Basic online booking system",
      "Priority Support 24/7",
      "WhatsApp support",
      "Sales Representative support",
      "Email notifications for new bookings",
      "Advanced analytics and reporting",
      "Annual renewal charges ₹ 3000",
      "Marketing automation tools",
    ],
  },
  {
    title: "1 Year",
    priceMonthly: "₹40,000",
    priceTotal: "₹120,000",
    description: "Everything you need to get started",
    features: [
      "Basic online booking system",
      "Priority Support 24/7",
      "Email notifications for new bookings",
      "Advanced analytics and reporting",
      "Annual renewal charges ₹ 2000",
    ],
  },
  {
    title: "6 Months",
    priceMonthly: "₹30,000",
    priceTotal: "₹90,000",
    description: "A great starter package",
    features: [
      "Basic online booking system",
      "WhatsApp support",
      "Email notifications for new bookings",
      "Annual renewal charges ₹ 1500",
    ],
  },
];

export const wayList = ["One-way", "Two-way", "Multi-City"];

export const airPortList = [
  
  {
    id: 245,
    code: "WSY",
    name: "Whitsunday Airstrip",
    cityCode: "WSY",
    city: "Airlie Beach",
    countryCode: "AU",
    country: "Australia",
  },
  {
    id: 286,
    code: "CTL",
    name: "Charleville Arpt",
    cityCode: "CTL",
    city: "Charleville",
    countryCode: "AU",
    country: "Australia",
  },
  {
    id: 326,
    code: "LNZ",
    name: "Hoersching Arpt",
    cityCode: "LNZ",
    city: "Linz",
    countryCode: "AT",
    country: "Austria",
  },
  {
    id: 359,
    code: "CGP",
    name: "Patenga Arpt",
    cityCode: "CGP",
    city: "Chittagong",
    countryCode: "BD",
    country: "Bangladesh",
  },
  {
    id: 380,
    code: "ZYZ",
    name: "Antwerp Berchem Rail Station",
    cityCode: "BRU",
    city: "Brussels",
    countryCode: "BE",
    country: "Belgium",
  },
  {
    id: 381,
    code: "CRL",
    name: "Brussels South Charleroi Arpt",
    cityCode: "BRU",
    city: "Brussels",
    countryCode: "BE",
    country: "Belgium",
  },
  {
    id: 394,
    code: "CAM",
    name: "Choreti Arpt",
    cityCode: "CAM",
    city: "Camiri",
    countryCode: "BO",
    country: "Bolivia",
  },
  {
    id: 400,
    code: "CBB",
    name: "J Wilsterman Arpt",
    cityCode: "CBB",
    city: "Cochabamba",
    countryCode: "BO",
    country: "Bolivia",
  },
  {
    id: 403,
    code: "SAB",
    name: "Juancho Yraus Quinl",
    cityCode: "SAB",
    city: "Saba Island",
    countryCode: "BQ",
    country: "Bonaire",
  },
  {
    id: 416,
    code: "ERM",
    name: "Comandante Kraemer Airport",
    cityCode: "ERM",
    city: "Erechim",
    countryCode: "BR",
    country: "Brazil",
  },
  {
    id: 444,
    code: "MAA",
    name: "Chennai Arpt",
    cityCode: "MAA",
    city: "Chennai",
    countryCode: "IN",
    country: "India",
  },
  {
    id: 555,
    code: "DEL",
    name: "Delhi Indira Gandhi Intl",
    cityCode: "DEL",
    city: "Delhi",
    countryCode: "IN",
    country: "India",
  }
];
