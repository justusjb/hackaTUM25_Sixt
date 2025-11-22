'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
   { id: 1, question: 'Are you traveling alone?' },
   { id: 2, question: 'Do you need a child seat?' },
   { id: 3, question: 'Would you like GPS navigation?' },
];

export default function CheckIn() {
   const router = useRouter();
   const [cards, setCards] = useState(questions);
   const [exitX, setExitX] = useState(0);
   const [isAnimating, setIsAnimating] = useState(false);

   const handleAnswer = (direction: 'left' | 'right') => {
      if (isAnimating || cards.length === 0) return;

      setIsAnimating(true);
      setExitX(direction === 'right' ? 300 : -300);

      setTimeout(() => {
         if (cards.length <= 1) {
            router.push('/home');
         } else {
            setCards((prev) => prev.slice(0, -1));
         }
         setIsAnimating(false);
      }, 200);
   };

   return (
      <>
         <motion.div
            className='px-4 py-6 pb-24 flex flex-col gap-6'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
         >
            <h1 className='text-[#FF5000] text-xl font-bold'>Check In</h1>

            <div className='bg-[#2B2D3380] rounded-2xl p-4 flex items-center gap-4'>
               <div className='w-12 h-12 rounded-full overflow-hidden shrink-0'>
                  <Image
                     src='/profile-picture.jpeg'
                     alt='Profile'
                     width={48}
                     height={48}
                     className='w-full h-full object-cover'
                  />
               </div>
               <div className='flex flex-col'>
                  <span className='text-white font-medium'>Hi User, quick question...</span>
                  <span className='text-[#9DA3AF] text-sm'>Do you want upgrades</span>
               </div>
            </div>

            {/* Card Stack */}
            <div className='relative h-[280px]'>
               <AnimatePresence mode='popLayout'>
                  {cards.map((card, index) => {
                     const stackIndex = cards.length - 1 - index;
                     const isFront = stackIndex === 0;

                     return (
                        <motion.div
                           key={card.id}
                           className='absolute inset-0 bg-[#2B2D33] rounded-2xl overflow-hidden'
                           initial={{ scale: 0.94, y: 20, rotate: 0 }}
                           animate={{
                              scale: 1 - stackIndex * 0.03,
                              y: stackIndex * 10,
                              rotate: stackIndex === 1 ? -3 : stackIndex === 2 ? 2 : 0,
                              zIndex: cards.length - stackIndex,
                           }}
                           exit={{
                              x: exitX,
                              opacity: 0,
                              rotate: exitX > 0 ? 15 : -15,
                           }}
                           transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 30,
                           }}
                        >
                           <div className='w-full h-48 bg-[#3A3A3A] flex items-center justify-center'>
                              <span className='text-[#9DA3AF] text-sm'>Image placeholder</span>
                           </div>
                           <div className='p-5'>
                              <h2 className='text-white text-2xl font-medium text-center'>
                                 {card.question}
                              </h2>
                           </div>
                        </motion.div>
                     );
                  })}
               </AnimatePresence>
            </div>
         </motion.div>

         <motion.div
            className='fixed bottom-16 left-0 right-0 p-4 flex gap-3'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
         >
            <button
               onClick={() => handleAnswer('left')}
               disabled={isAnimating}
               className='flex-1 bg-[#2B2D33] text-white font-semibold py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-50'
            >
               No
            </button>
            <button
               onClick={() => handleAnswer('right')}
               disabled={isAnimating}
               className='flex-1 bg-[#FF5000] text-white font-semibold py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-50'
            >
               Yes
            </button>
         </motion.div>
      </>
   );
}
