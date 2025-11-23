'use client';

import { useStripe } from '@stripe/react-stripe-js';
import { PaymentRequest } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import RiveAnimation from './RiveAnimation';
import { useRouter } from 'next/navigation';


export default function ApplePayButton() {
    const stripe = useStripe();
    const router = useRouter();
    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
    const [message, setMessage] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false); // Add this state

    useEffect(() => {
        if (!stripe) return;

        const pr = stripe.paymentRequest({
            country: 'DE',
            currency: 'eur',
            total: {
                label: 'Test Purchase',
                amount: 500,
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });

        pr.canMakePayment().then((result) => {
            if (result) {
                setPaymentRequest(pr);
            }
        });

        pr.on('paymentmethod', async (ev) => {
            setMessage('Processing...');

            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 500 }),
            });

            const { clientSecret } = await response.json();

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
                // setPaymentSuccess(true); // Set success state
                // setMessage('✅ Payment successful!');
                router.push('/gambling')
            }
        });
    }, [stripe]);

    // Show animation after successful payment
    if (paymentSuccess) {
        return (
            <div className="flex flex-col items-center gap-4 p-8">
                <RiveAnimation />
                <div className="text-center text-lg font-medium text-green-600">
                    {message}
                </div>
            </div>
        );
    }

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