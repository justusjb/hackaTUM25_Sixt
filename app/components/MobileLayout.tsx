'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import BottomNav from './BottomNav';

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Header />
      <main className="pt-14 pb-16 min-h-screen">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
