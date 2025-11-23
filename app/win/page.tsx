'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Win() {
    return (
        <motion.div
            className='px-4 py-6 flex flex-col gap-4 h-[calc(100vh-128px)]'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <h1 className='text-[#FF5000] text-xl font-bold'>Upgrade Confirmed!</h1>

            <div className='bg-[#2B2D3380] rounded-2xl p-3 flex items-start gap-3'>
                <div className='w-10 h-10 rounded-full overflow-hidden shrink-0'>
                    <Image
                        src='/agent-picture.png'
                        alt='Agent'
                        width={40}
                        height={40}
                        className='w-full h-full object-cover'
                    />
                </div>
                <span className='text-white text-sm leading-relaxed'>
                    Nice spin! Your 20% discount has been applied. The BMW X3 is yours – see you at pickup!
                </span>
            </div>

            <div className='flex-1 flex items-center justify-center'>
                <div className='text-center'>
                    <div className='text-6xl mb-4'>🎉</div>
                    <div className='bg-[#FF5000] text-white text-2xl font-bold px-6 py-3 rounded-2xl inline-block'>
                        20% OFF
                    </div>
                    <p className='text-white text-lg font-semibold mt-4'>BMW X3 xDrive</p>
                    <p className='text-[#9DA3AF] text-sm mt-1'>
                        <span className='line-through'>€24</span> → €19/day
                    </p>
                </div>
            </div>

            <div className='bg-[#2B2D3380] rounded-2xl p-4'>
                <div className='flex items-center gap-2 mb-2'>
                    <svg className='w-5 h-5 text-[#FF5000]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                    <span className='text-white font-semibold'>Ready for pickup</span>
                </div>
                <p className='text-[#9DA3AF] text-sm'>Nov 28, 10:00 AM · Sölden, Austria</p>
            </div>
        </motion.div>
    );
}