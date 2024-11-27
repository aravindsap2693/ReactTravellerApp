
import React from 'react';
import {Routes, Route } from "react-router-dom";
import LandingPage from '../Pages/LandingPage/landingPage';
import RegisterBase from "../Pages/register/RegisterBase"
import AppBanner from '../Pages/Home/AppBanner';
import FlightBannerCard from '../Pages/Flight-listing-card/FlightListBanner/FlightListBanner';
import BookingBase from '../Pages/booking/BookingBase';
import BillPayment from '../Pages/payment-reconfirmation/BillPayment';
import FlightPaymentDetails from '../Pages/payment-reconfirmation/FlightPaymentDetails';
import PaymentButton from '../Pages/Razorpaypayment/Razorpay';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterBase />} />
      <Route path="/home" element={<AppBanner />} />
      <Route path="/flightlist" element={<FlightBannerCard />} />
      <Route path="/booking" element={<BookingBase />} />
      <Route path="/payment" element={<FlightPaymentDetails />} />
      <Route path="/billpayment" element={<BillPayment />} />
      <Route path="/razorpayment" element={<PaymentButton/>} />
    </Routes>
  );
};

export default AppRoutes;





