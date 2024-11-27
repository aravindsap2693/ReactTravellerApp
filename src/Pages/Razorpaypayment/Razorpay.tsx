/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { loadRazorpayScript, verifyPayment } from '../../Api/loadRazorpay.api';

interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface OrderData {
    amount: number; // in paise
    passengerName: string;
    email: string;
    id: string; // Order ID from backend
}

const PaymentButton = ({ orderData }: { orderData: OrderData }) => {
    const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);

    useEffect(() => {
        const loadRazorpay = async () => {
            const loaded: boolean = await loadRazorpayScript(); // Explicitly cast as boolean
            setRazorpayLoaded(loaded); // No more error
        };
        loadRazorpay();
    }, []);

    const initiateRazorpay = async () => {
        if (!razorpayLoaded) {
            alert('Razorpay SDK failed to load.');
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,  
            amount: orderData.amount,
            currency: 'INR',
            name: 'Flight Booking',
            description: `Booking for ${orderData.passengerName}`,
            order_id: orderData.id,  // The order ID returned by the backend
            handler: async (response: RazorpayResponse) => {
                const paymentDetails = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                };
                // Verify payment with the backend
                const verified = await verifyPayment(paymentDetails);
                if (verified.success) {
                    alert('Payment successful!');
                } else {
                    alert('Payment verification failed!');
                }
            },
            prefill: {
                name: orderData.passengerName,
                email: orderData.email,
            },
            theme: {
                color: '#F37254',
            },
        };

        const rzp = new (window as any).Razorpay(options); // Make sure to cast window to any for TypeScript
        rzp.open();
    };

    return <button onClick={initiateRazorpay} disabled={!razorpayLoaded}>Pay Now</button>;
};

export default PaymentButton;
