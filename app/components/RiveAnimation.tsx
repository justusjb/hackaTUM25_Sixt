'use client';

import { useRive } from '@rive-app/react-canvas';
import { useEffect } from 'react';

export default function RiveAnimation() {
    const { rive, RiveComponent } = useRive({
        src: '/animations/9863-18814-fortune-wheel-mini-game.riv',
        stateMachines: "Fortune Wheel",
        autoplay: true,
    });

    useEffect(() => {
        if (rive) {
            console.log('Available animations:', rive.animationNames);
            console.log('Available state machines:', rive.stateMachineNames);
        }
    }, [rive]);

    return (
            <RiveComponent
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
    );
}
