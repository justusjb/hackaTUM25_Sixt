'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
   return (
      <>
         {/* Animated Content */}
         <motion.div
            className='px-4 py-10 flex flex-col gap-4'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
         >
            {/* Booking Status */}
            <div className='flex items-center gap-2'>
               <div className='w-6 h-6 rounded-full border-2 border-[#FF5000] flex items-center justify-center'>
                  <svg
                     className='w-4 h-4 text-[#FF5000]'
                     fill='none'
                     stroke='currentColor'
                     viewBox='0 0 24 24'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                     />
                  </svg>
               </div>
               <span className='text-[#FF5000] font-semibold'>
                  Booking Confirmed
               </span>
            </div>

            {/* Combined Car Card */}
            <div className='bg-[#2B2D3380] rounded-2xl overflow-hidden flex flex-col'>
               {/* Car Image */}
               <div className='bg-white rounded-t-2xl p-4 flex items-center justify-center'>
                  <Image
                     src='/seat.png'
                     alt='Seat Ibiza'
                     width={400}
                     height={200}
                     className='w-full h-auto object-contain'
                  />
               </div>

               {/* Car Details */}
               <div className='p-4 pb-2'>
                  <div className='flex items-baseline gap-2'>
                     <h2 className='text-white text-lg font-bold'>Seat Ibiza</h2>
                     <span className='text-[#9DA3AF] text-xs'>or similar</span>
                  </div>

                  {/* Feature Pills */}
                  <div className='flex gap-2 mt-2'>
                     <span className='flex items-center gap-1 bg-[#3A3A3A] text-white text-xs px-2 py-1 rounded-full'>
                        <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                           <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                        </svg>
                        FWD
                     </span>
                     <span className='flex items-center gap-1 bg-[#3A3A3A] text-white text-xs px-2 py-1 rounded-full'>
                        <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                           <path d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' />
                        </svg>
                        5
                     </span>
                     <span className='flex items-center gap-1 bg-[#3A3A3A] text-white text-xs px-2 py-1 rounded-full'>
                        <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                           <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                        </svg>
                        292L
                     </span>
                  </div>
               </div>

               {/* Booking Details */}
               <div className='px-4 pb-4 flex flex-col gap-2'>
                  <div className='flex items-center gap-2'>
                     <svg className='w-4 h-4 text-[#9DA3AF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                     </svg>
                     <span className='text-white text-sm'>Sölden, Austria</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <svg className='w-4 h-4 text-[#9DA3AF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                     </svg>
                     <span className='text-white text-sm'>Nov 28, 10:00 AM – Nov 30, 6:00 PM</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <svg className='w-4 h-4 text-[#9DA3AF]' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-6 8v-2c0-2.66 5.33-4 6-4s6 1.34 6 4v2H6zm13-8.5c0 .83-.67 1.5-1.5 1.5H16v-3h1.5c.83 0 1.5.67 1.5 1.5zM15 12h2.5c1.38 0 2.5 1.12 2.5 2.5V18h-2v-3.5c0-.28-.22-.5-.5-.5H15v-2z' />
                     </svg>
                     <span className='text-white text-sm'>3 passengers</span>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* Fixed Button - Not animated with y */}
         <motion.div
            className='fixed bottom-16 left-0 right-0 p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
         >
            <Link href='/checkin'>
               <button className='w-full bg-[#FF5000] text-white font-semibold py-4 rounded-2xl'>
                  Check in
               </button>
            </Link>
         </motion.div>
      </>
   );
}
