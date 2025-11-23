'use client';

import Image from 'next/image';

export default function Header() {
   return (
      <header className='fixed top-0 left-0 right-0 h-14 bg-transparent backdrop-blur-md flex items-center justify-between px-4 z-50'>
         {/* Logo */}
         <Image src='/sixt-logo.svg' alt='SIXT' width={59} height={24} />

         {/* Profile */}
         <div className='w-9 h-9 rounded-full overflow-hidden'>
            <Image
               src='/profile-picture.jpg'
               alt='Profile'
               width={36}
               height={36}
               className='w-full h-full object-cover'
            />
         </div>
      </header>
   );
}
