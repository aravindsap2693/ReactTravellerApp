import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage/landingPage";
import RegisterBase from "../Pages/register/RegisterBase";
import AppBanner from "../Pages/Home/AppBanner";
import FlightBannerCard from "../Pages/Flight-listing-card/FlightListBanner/FlightListBanner";
import BookingBase from "../Pages/booking/BookingBase";
// import BillPayment from '../Pages/payment-reconfirmation/BillPayment';
import FlightPaymentDetails from "../Pages/payment-reconfirmation/FlightPaymentDetails";
// import PaymentButton from '../Pages/Razorpaypayment/Razorpay';
import PrivateRoute from "../Api/Auth/protectedRoute";
import PublicLayout from "../Layout/publicLayout";
import PrivateLayout from "../Layout/privateLayout";
import Dashboard from "../Pages/Dashboard/dashboard";
import Sidebar from "../Pages/payment-reconfirmation/Sidebar";
import FlightMultiCity from "../Pages/Flight-listing-card/FlightListBanner/FlightMultiCity";

const AppRoutes: React.FC = () => {
  const publicRoutes = [
    { path: "/", element: <LandingPage /> },
    { path: "/register", element: <RegisterBase /> },
  ];

  const protectedRoutes = [
    { path: "/booking", element: <BookingBase /> },
    { path: "/payment", element: <FlightPaymentDetails /> },
    { path: "/billpayment", element: <Sidebar /> },
    { path: "/home", element: <AppBanner /> },
    { path: "/flightlist", element: <FlightBannerCard /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/multiple", element: <FlightMultiCity /> },
    // { path: '/razorpayment', element: <PaymentButton /> },
  ];

  return (
    <Routes>
      {/* Public Routes wrapped in PublicLayout */}
      <Route element={<PublicLayout />}>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      {/* Protected Routes wrapped in PrivateRoute and PrivateLayout */}
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>

      {/* Fallback route for undefined paths */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
