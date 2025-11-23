'use client';

import { useStripe } from '@stripe/react-stripe-js';
import { PaymentRequest } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ApplePayButtonProps {
    amount?: number;
    upgradePrice?: number;
}

export default function ApplePayButton({ amount = 5, upgradePrice = 24 }: ApplePayButtonProps) {
    const stripe = useStripe();
    const router = useRouter();
    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
    const [message, setMessage] = useState('');
    const amountInCents = amount * 100;

    useEffect(() => {
        if (!stripe) return;

        const pr = stripe.paymentRequest({
            country: 'DE',
            currency: 'usd',
            total: {
                label: 'SIXT Lucky Spin',
                amount: amountInCents,
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
                body: JSON.stringify({ amount: amountInCents }),
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
                router.push(`/gambling?upgrade=${upgradePrice}`)
            }
        });
    }, [stripe, amountInCents, upgradePrice, router]);

    if (!paymentRequest) {
        return (
            <button
                disabled
                className="w-full bg-[#3A3A3A] text-[#9DA3AF] font-semibold py-4 rounded-2xl"
            >
                Apple Pay not available
            </button>
        );
    }

    return (
        <button
            onClick={() => paymentRequest.show()}
            className="w-full bg-[#FF5000] text-white font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Pay ${amount} with Apple Pay
        </button>
    );
}
