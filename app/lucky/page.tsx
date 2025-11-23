'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import ApplePayButton from '../components/ApplePayButton';

function LuckyContent() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const upgradePrice = parseInt(searchParams.get('upgrade') || '24');
   const spinPrice = Math.round(upgradePrice * 0.2);

   return (
      <motion.div
         className='px-4 py-4 flex flex-col gap-4'
         style={{ minHeight: 'calc(100dvh - 80px - 64px - env(safe-area-inset-bottom))' }}
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.2, ease: 'easeOut' }}
      >
         <h1 className='text-[#FF5000] text-xl font-bold'>Feeling Lucky?</h1>

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
               Here's the deal: pay 20% of the upgrade price and get a 20% chance to win the full upgrade for free. Risk ${spinPrice}, potentially save ${upgradePrice}/day!
            </span>
         </div>

         <div className='flex-1 flex items-center justify-center min-h-0'>
            <div className='text-center'>
               <div className='text-5xl mb-3'>🎰</div>
               <p className='text-[#9DA3AF] text-sm'>Pay ${spinPrice} · 20% chance to win</p>
            </div>
         </div>

         <div className='flex flex-col gap-3 shrink-0'>
            <ApplePayButton amount={spinPrice} upgradePrice={upgradePrice} />
            <button
               onClick={() => router.push('/home')}
               className='w-full bg-[#2B2D33] text-white font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform'
            >
               No thanks, keep my booking
            </button>
         </div>
      </motion.div>
   );
}

export default function Lucky() {
   return (
      <Suspense fallback={<div className="px-4 py-4">Loading...</div>}>
         <LuckyContent />
      </Suspense>
   );
}
