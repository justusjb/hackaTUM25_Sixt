'use client';

import { useRive } from '@rive-app/react-canvas';

export default function RiveAnimation() {
    const { RiveComponent } = useRive({
        src: '/animations/9863-18814-fortune-wheel-mini-game.riv',
        autoplay: false,
    });

    return (
        <div className="w-full h-full flex items-center justify-center">
            <RiveComponent
                style={{
                    width: '400px',
                    height: '400px'
                }}
            />
        </div>
    );
}
