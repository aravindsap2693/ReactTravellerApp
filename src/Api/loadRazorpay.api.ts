

export const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);  // Explicitly resolve with boolean
        script.onerror = () => resolve(false); // Explicitly resolve with boolean
        document.body.appendChild(script);
    });
};

export const verifyPayment = async (paymentDetails: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}) => {
    try {
        const response = await fetch('/backend/api/v1/verifyPayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentDetails),
        });
        return await response.json();
    } catch (error) {
        console.error('Error verifying payment:', error);
        return { success: false };
    }
};

