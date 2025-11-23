'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
   { id: 1, key: 'gear', question: 'All 3 of you bringing ski gear?', image: '/ski-gear.jpg' },
   { id: 2, key: 'alpine', question: 'Taking the high alpine passes?', image: '/alpine-pass.jpg' },
   { id: 3, key: 'snow', question: 'Expecting snow on the roads?', image: '/snow-on-the-road.jpg' },
];

export default function Questions() {
   const router = useRouter();
   const [cards, setCards] = useState(questions);
   const [answers, setAnswers] = useState<Record<string, boolean>>({});
   const [exitX, setExitX] = useState(0);
   const [isAnimating, setIsAnimating] = useState(false);

   const handleAnswer = (isYes: boolean) => {
      if (isAnimating || cards.length === 0) return;

      const currentCard = cards[cards.length - 1];
      const newAnswers = { ...answers, [currentCard.key]: isYes };
      setAnswers(newAnswers);

      setIsAnimating(true);
      setExitX(isYes ? 300 : -300);

      setTimeout(() => {
         if (cards.length <= 1) {
            const params = new URLSearchParams({
               refined: 'true',
               gear: String(newAnswers.gear ?? true),
            });
            router.push(`/checkin?${params.toString()}`);
         } else {
            setCards((prev) => prev.slice(0, -1));
         }
         setIsAnimating(false);
      }, 200);
   };

   return (
      <motion.div
         className='px-4 py-4 flex flex-col gap-4'
         style={{ minHeight: 'calc(100dvh - 80px - 64px - env(safe-area-inset-bottom))' }}
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.2, ease: 'easeOut' }}
      >
         <h1 className='text-[#FF5000] text-xl font-bold'>Quick Questions</h1>

         <div className='bg-[#2B2D3380] rounded-2xl p-3 flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full overflow-hidden shrink-0'>
               <Image
                  src='/agent-picture.png'
                  alt='Agent'
                  width={40}
                  height={40}
                  className='w-full h-full object-cover'
               />
            </div>
            <span className='text-white text-sm'>
               Let me find something better...
            </span>
         </div>

         {/* Card Stack */}
         <div className='relative flex-1 mx-2 mb-4 min-h-0 max-h-[50vh]'>
            <AnimatePresence mode='popLayout'>
               {cards.map((card, index) => {
                  const stackIndex = cards.length - 1 - index;

                  return (
                     <motion.div
                        key={card.id}
                        className='absolute inset-0 bg-[#2B2D33]/60 backdrop-blur-md rounded-2xl overflow-hidden'
                        initial={{ scale: 0.9, y: 30, rotate: 0 }}
                        animate={{
                           scale: 1 - stackIndex * 0.06,
                           y: stackIndex * 20,
                           rotate:
                              stackIndex === 1 ? -6 : stackIndex === 2 ? 5 : 0,
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
                           restDelta: 0.5,
                        }}
                     >
                        <div className='flex flex-col h-full'>
                           <div className='flex-1 relative'>
                              <Image
                                 src={card.image}
                                 alt={card.question}
                                 fill
                                 className='object-cover'
                              />
                           </div>
                           <div className='p-5 shrink-0'>
                              <h2 className='text-white text-2xl font-medium text-center'>
                                 {card.question}
                              </h2>
                           </div>
                        </div>
                     </motion.div>
                  );
               })}
            </AnimatePresence>
         </div>

         {/* Buttons */}
         <div className='flex gap-3 shrink-0'>
            <button
               onClick={() => handleAnswer(false)}
               disabled={isAnimating}
               className='flex-1 bg-[#2B2D33] text-white font-semibold py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-50'
            >
               No
            </button>
            <button
               onClick={() => handleAnswer(true)}
               disabled={isAnimating}
               className='flex-1 bg-[#FF5000] text-white font-semibold py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-50'
            >
               Yes
            </button>
         </div>
      </motion.div>
   );
}
