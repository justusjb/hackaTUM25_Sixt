'use client';

import { motion } from 'framer-motion';

export default function Lucky() {
   return (
      <motion.div
         className='flex items-center justify-center h-[calc(100vh-64px)]'
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
      >
         <h1 className='text-white text-2xl font-bold'>Time for some gambling</h1>
      </motion.div>
   );
}
