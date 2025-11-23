'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ApplePayButton from '../components/ApplePayButton';

export default function Lucky() {
   const router = useRouter();

   return (
      <motion.div
         className='px-4 py-6 flex flex-col gap-4 h-[calc(100vh-128px)]'
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
               I get it – upgrades aren't cheap. Pay €5 to spin the wheel and win up to 50% off your upgrade!
            </span>
         </div>

         <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
               <div className='text-6xl mb-4'>🎰</div>
               <p className='text-[#9DA3AF] text-sm'>Spin for a chance to save big</p>
            </div>
         </div>

         <div className='flex flex-col gap-3 shrink-0'>
            <ApplePayButton />
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
