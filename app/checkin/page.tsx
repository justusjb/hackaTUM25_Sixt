'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CheckInOffer() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const isRefined = searchParams.get('refined') === 'true';
   const bringingGear = searchParams.get('gear') !== 'false';

   const [showContent, setShowContent] = useState(false);
   const [carSelected, setCarSelected] = useState(true);
   const [protectionSelected, setProtectionSelected] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => setShowContent(true), 2200);
      return () => clearTimeout(timer);
   }, []);

   // Messages adapt based on context
   const initialMessage =
      "Sölden this weekend? The Ibiza won't cut it. Here's a Passat with 4Motion – fits 2 full ski setups comfortably.";

   const refinedMessage = bringingGear
      ? 'All 3 of you bringing gear? The X3 fits 3 full ski setups – skis, boots, bags. xDrive handles the snow.'
      : "Not everyone bringing gear? The X3's still perfect – xDrive AWD for the pass, tons of space for the crew.";

   const message = isRefined ? refinedMessage : initialMessage;

   const carPrice = isRefined ? 24 : 12;
   const protectionPrice = 15;

   const totalPrice =
      (carSelected ? carPrice : 0) +
      (isRefined && protectionSelected ? protectionPrice : 0);
   const hasSelection = carSelected || (isRefined && protectionSelected);

   return (
      <div className='px-4 py-6 pb-4 flex flex-col gap-4 overflow-y-auto'>
         <motion.h1
            className='text-[#FF5000] text-xl font-bold'
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
         >
            {isRefined ? 'Your Perfect Match' : 'Check In'}
         </motion.h1>

         {/* Agent Message */}
         <motion.div
            className='bg-[#2B2D3380] rounded-2xl p-3 flex items-start gap-3'
            animate={{
               opacity: 1,
               y: showContent ? 0 : 200,
            }}
            transition={{
               y: { type: 'spring', stiffness: 80, damping: 20 },
            }}
         >
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
               {message}
            </span>
         </motion.div>

         {/* Car Upgrade Card - Selectable */}
         <motion.div
            className={`rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all ${
               carSelected
                  ? 'bg-[#2B2D3380] ring-2 ring-[#FF5000]'
                  : 'bg-[#2B2D3380] opacity-60'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            onClick={() => setCarSelected(!carSelected)}
         >
            {/* Car Image */}
            <div className='bg-white p-4 flex items-center justify-center relative'>
               <Image
                  src={isRefined ? '/bmw.png' : '/passat.png'}
                  alt={isRefined ? 'BMW X3' : 'VW Passat'}
                  width={400}
                  height={200}
                  className='w-full h-auto object-contain'
               />
               {/* Checkbox overlay */}
               <div
                  className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                     carSelected
                        ? 'bg-[#FF5000] border-[#FF5000]'
                        : 'border-[#9DA3AF] bg-white/80'
                  }`}
               >
                  {carSelected && (
                     <svg
                        className='w-4 h-4 text-white'
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
                  )}
               </div>
            </div>

            {/* Car Details */}
            <div className='p-4 pb-2'>
               <div className='flex items-center justify-between'>
                  <h2 className='text-white text-lg font-bold'>
                     {isRefined ? 'BMW X3 xDrive' : 'VW Passat Variant'}
                  </h2>
                  <span className='text-[#FF5000] font-bold'>
                     +€{carPrice}/day
                  </span>
               </div>

               {/* Feature Pills */}
               <div className='flex gap-2 mt-2'>
                  <span className='bg-[#3A3A3A] text-white text-xs px-2 py-1 rounded-full'>
                     {isRefined ? 'xDrive AWD' : '4Motion AWD'}
                  </span>
                  <span className='bg-[#3A3A3A] text-white text-xs px-2 py-1 rounded-full'>
                     5 seats
                  </span>
                  <span
                     className={`text-xs px-2 py-1 rounded-full ${
                        isRefined
                           ? 'bg-[#FF5000] text-white'
                           : 'bg-[#3A3A3A] text-white'
                     }`}
                  >
                     {isRefined ? '3 ski setups' : '2 ski setups'}
                  </span>
               </div>
            </div>

            {/* Key benefit */}
            <div className='px-4 pb-4'>
               <p className='text-[#9DA3AF] text-sm'>
                  {isRefined
                     ? bringingGear
                        ? 'Skis, boots, bags for all 3. No roof box needed.'
                        : 'Plenty of room + Quattro for the snowy pass.'
                     : 'Great for 2 with gear. Tight if all 3 are bringing skis.'}
               </p>
            </div>
         </motion.div>

         {/* Protection Card - Only in refined view, Selectable */}
         {isRefined && (
            <motion.div
               className={`rounded-2xl p-4 flex flex-col gap-3 cursor-pointer transition-all ${
                  protectionSelected
                     ? 'bg-[#2B2D3380] ring-2 ring-[#FF5000]'
                     : 'bg-[#2B2D3380] opacity-60'
               }`}
               initial={{ opacity: 0, y: 20 }}
               animate={{
                  opacity: showContent ? 1 : 0,
                  y: showContent ? 0 : 20,
               }}
               transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
               onClick={() => setProtectionSelected(!protectionSelected)}
            >
               {/* Header */}
               <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                     <h3 className='text-white font-bold'>All Inclusive</h3>
                     <span className='bg-[#FF5000] text-white text-xs px-2 py-0.5 rounded-full'>
                        -30%
                     </span>
                  </div>
                  <div className='flex items-center gap-3'>
                     <span className='text-[#FF5000] font-bold'>
                        +€{protectionPrice}/day
                     </span>
                     <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                           protectionSelected
                              ? 'bg-[#FF5000] border-[#FF5000]'
                              : 'border-[#9DA3AF]'
                        }`}
                     >
                        {protectionSelected && (
                           <svg
                              className='w-4 h-4 text-white'
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
                        )}
                     </div>
                  </div>
               </div>

               {/* Personalized pitch */}
               <p className='text-[#9DA3AF] text-sm'>
                  Mountain roads are rough. You paid €400 for that Garmisch
                  scratch – this covers tires, windshield, and wet gear damage.
               </p>

               {/* Social proof */}
               <div className='flex items-center gap-2'>
                  <div className='flex -space-x-1'>
                     <div className='w-5 h-5 rounded-full bg-[#FF5000] text-white text-xs flex items-center justify-center font-bold'>
                        J
                     </div>
                     <div className='w-5 h-5 rounded-full bg-[#4A90D9] text-white text-xs flex items-center justify-center font-bold'>
                        M
                     </div>
                     <div className='w-5 h-5 rounded-full bg-[#50C878] text-white text-xs flex items-center justify-center font-bold'>
                        T
                     </div>
                  </div>
                  <span className='text-[#9DA3AF] text-xs'>
                     84% of Sölden renters chose this
                  </span>
               </div>
            </motion.div>
         )}

         {/* Total & Buttons */}
         <motion.div
            className='flex flex-col gap-3 shrink-0 mt-auto pt-2'
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
         >
            {/* Total when in refined view */}
            {isRefined && hasSelection && (
               <div className='flex justify-between items-center px-1'>
                  <span className='text-[#9DA3AF] text-sm'>Total upgrade</span>
                  <span className='text-[#FF5000] font-bold text-lg'>
                     +€{totalPrice}/day
                  </span>
               </div>
            )}

            <button
               onClick={() => router.push('/home')}
               disabled={!hasSelection}
               className={`w-full font-semibold py-4 rounded-2xl active:scale-[0.98] transition-all ${
                  hasSelection
                     ? 'bg-[#FF5000] text-white'
                     : 'bg-[#3A3A3A] text-[#9DA3AF]'
               }`}
            >
               {isRefined
                  ? hasSelection
                     ? 'Upgrade'
                     : 'Select an option'
                  : 'Upgrade'}
            </button>
            <button
               onClick={() =>
                  router.push(isRefined ? '/lucky' : '/checkin/questions')
               }
               className='w-full bg-[#2B2D33] text-white font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform'
            >
               {isRefined
                  ? "I'm too broke for this"
                  : 'Not exactly what I need'}
            </button>
         </motion.div>
      </div>
   );
}
