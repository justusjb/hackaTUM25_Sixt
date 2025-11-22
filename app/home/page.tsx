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

            {/* Car Image Card */}
            <div className='bg-white rounded-2xl p-4 flex items-center justify-center'>
               <Image
                  src='/car.jpg'
                  alt='Seat Ibiza'
                  width={400}
                  height={200}
                  className='object-contain'
               />
            </div>

            {/* Booking Details Card */}
            <div className='bg-[#2B2D3380] rounded-2xl p-5 flex flex-col gap-4'>
               {/* Car Name */}
               <div className='flex items-baseline gap-2'>
                  <h2 className='text-white text-xl font-bold'>Seat Ibiza</h2>
                  <span className='text-[#9DA3AF] text-sm'>or similar</span>
               </div>

               {/* Location */}
               <div className='flex items-center gap-3'>
                  <svg
                     className='w-5 h-5 text-[#9DA3AF]'
                     fill='none'
                     stroke='currentColor'
                     viewBox='0 0 24 24'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                     />
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                     />
                  </svg>
                  <span className='text-white'>Munich Airport</span>
               </div>

               {/* Date/Time */}
               <div className='flex items-center gap-3 py-1'>
                  <svg
                     className='w-5 h-5 text-[#9DA3AF]'
                     fill='none'
                     stroke='currentColor'
                     viewBox='0 0 24 24'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                     />
                  </svg>
                  <span className='text-white'>
                     Nov 25 | 12:00 PM - Nov 28 | 12:00 PM
                  </span>
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
