'use client';

import { useRive, Fit, Alignment, Layout } from '@rive-app/react-canvas';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function RiveAnimation() {
    const router = useRouter();
    const hitboxCount = useRef(0);
    const hasRedirected = useRef(false);

    const { rive, RiveComponent } = useRive({
        src: '/animations/9863-18814-fortune-wheel-mini-game.riv',
        stateMachines: "Fortune Wheel",
        autoplay: true,
        layout: new Layout({
            fit: Fit.Cover, // Makes it cover the entire space
            alignment: Alignment.Center,
        }),
    });

    useEffect(() => {
        if (rive && !hasRedirected.current) {
            // @ts-ignore - TypeScript workaround for event listener
            rive.on('statechange', (event: any) => {
                console.log('State changed to:', event);

                // Check if it's the Hitbox Animation state
                if (event.data && event.data.includes('Hitbox Animation')) {
                    hitboxCount.current += 1;
                    console.log('Hitbox Animation count:', hitboxCount.current);

                    // On the second Hitbox Animation, pause and redirect
                    if (hitboxCount.current === 2) {
                        console.log('Second Hitbox detected - pausing and redirecting...');
                        hasRedirected.current = true;
                        rive.pause(); // Freeze the animation

                        //setTimeout(() => {
                        //    router.push('/win'); // Change to your next page
                        //}, 1500); // Wait 1.5 seconds so user can see result
                    }
                }
            });
        }
    }, [rive, router]);

    return (
            <RiveComponent
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
    );
}
