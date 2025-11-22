'use client';

import { useStripe } from '@stripe/react-stripe-js';
import { PaymentRequest } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

export default function ApplePayButton() {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!stripe) return;

        const pr = stripe.paymentRequest({
            country: 'DE',
            currency: 'eur',
            total: {
                label: 'Test Purchase',
                amount: 500, // $10.99 in cents
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });

        // Check if Apple Pay is available
        pr.canMakePayment().then((result) => {
            if (result) {
                setPaymentRequest(pr);
            }
        });

        pr.on('paymentmethod', async (ev) => {
            setMessage('Processing...');

            // Call your backend to create PaymentIntent
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 1099 }),
            });

            const { clientSecret } = await response.json();

            // Confirm the payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                { payment_method: ev.paymentMethod.id },
                { handleActions: false }
            );

            if (error) {
                ev.complete('fail');
                setMessage(`Payment failed: ${error.message}`);
            } else {
                ev.complete('success');
                setMessage('✅ Payment successful! (No charge in test mode)');
            }
        });
    }, [stripe]);

    if (!paymentRequest) {
        return <div>Apple Pay not available on this device</div>;
    }

    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <button
                onClick={() => paymentRequest.show()}
                className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold"
            >
                Pay with Apple Pay
            </button>
            {message && (
                <div className="text-center text-lg font-medium text-black">{message}</div>
            )}
        </div>
    );
}