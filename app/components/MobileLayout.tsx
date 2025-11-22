'use client';

import Header from './Header';
import BottomNav from './BottomNav';

export default function MobileLayout({ children }: { children: React.ReactNode }) {
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
