'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import RiveAnimation from '../components/RiveAnimation';

function GamblingContent() {
    const searchParams = useSearchParams();
    const upgradePrice = parseInt(searchParams.get('upgrade') || '24');

    return (
        <div className="fixed inset-0 w-screen h-screen bg-white flex items-center justify-center">
            <RiveAnimation upgradePrice={upgradePrice} />
        </div>
    );
}

export default function AnimPage() {
    return (
        <Suspense fallback={<div className="fixed inset-0 w-screen h-screen bg-white" />}>
            <GamblingContent />
        </Suspense>
    );
}