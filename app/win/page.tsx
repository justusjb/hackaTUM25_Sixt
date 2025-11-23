'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Win() {
   return (
      <motion.div
         className='px-4 py-4 flex flex-col gap-4'
         style={{
            minHeight:
               'calc(100dvh - 80px - 64px - env(safe-area-inset-bottom))',
         }}
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.3, ease: 'easeOut' }}
      >
         <h1 className='text-[#FF5000] text-xl font-bold'>
            Upgrade Confirmed!
         </h1>

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
               You beat the odds! The BMW X3 upgrade is yours – completely free.
               See you at pickup!
            </span>
         </div>

         <div className='flex-1 flex items-center justify-center min-h-0'>
            <div className='text-center'>
               <div className='text-5xl mb-3'>🎉</div>
               <div className='bg-[#FF5000] text-white text-xl font-bold px-5 py-2 rounded-2xl inline-block'>
                  FREE UPGRADE
               </div>
               <p className='text-white text-base font-semibold mt-3'>
                  BMW X3 xDrive
               </p>
               <p className='text-[#9DA3AF] text-sm mt-1'>
                  <span className='line-through'>+€24/day</span> → €0
               </p>
            </div>
         </div>
      </motion.div>
   );
}
