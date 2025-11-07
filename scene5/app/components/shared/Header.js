'use client';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="absolute w-[1440px] h-[156px] left-0 top-0 z-50">
      {/* Frame 52 - exact Figma specs */}
      <div
        className={`box-border flex flex-row justify-between items-center p-[16px_32px] gap-[36px] absolute w-[808px] h-[88px] left-[calc(50%-808px/2)] rounded-[100px] backdrop-blur-sm transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        style={{
          top: `${38 + scrollY * 0.1}px`,
          backgroundColor: `rgba(255,255,255,${0.4 + Math.min(scrollY * 0.001, 0.3)})`,
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: scrollY > 50 ? '0 10px 25px rgba(0,0,0,0.1)' : 'none'
        }}
      >

        {/* Frame 155 - Logo */}
<a
  href="/"
  className="flex flex-row items-center p-0 gap-[8px] w-[183px] h-[32px] order-0 transition-all duration-300 ease-out group focus:outline-none"
>
  {/* Logo container with circular background */}
  <div className="w-[32px] h-[32px] rounded-full relative order-0 flex items-center justify-center overflow-hidden transition-all duration-300 ease-out ">
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="32" fill="#261033"/>
      <path d="M20 24L20 16L24 20L28 24L20 24Z" fill="#D89EFA"/>
      <rect width="8" height="8" transform="translate(20 24)" fill="#D89EFA"/>
      <rect width="8" height="8" transform="translate(20 32)" fill="#D89EFA"/>
      <rect width="8" height="8" transform="translate(28 32)" fill="#D89EFA"/>
      <path d="M36 40L36 32L40 36L44 40L36 40Z" fill="#D89EFA"/>
      <rect width="8" height="8" transform="translate(20 40)" fill="#D89EFA"/>
      <rect width="8" height="8" transform="translate(36 40)" fill="#D89EFA"/>
      <path d="M28 32L28 24L32 28L36 32L28 32Z" fill="#D89EFA"/>
      <rect width="8" height="8" transform="translate(36 24)" fill="#D89EFA"/>
    </svg>
  </div>
  <span className="w-[143px] h-[24px] font-alata font-normal text-[40px] leading-[20px] tracking-[-0.05em] text-[#261033] order-1 transition-all duration-300 ease-out group">
    harangè
  </span>
</a>


       {/* Frame 50 - About Us */}
<a
  href="/about-us"
  className="flex flex-row items-center p-0 gap-[12px] order-2 transition-all duration-300 ease-out hover:text-[#261033] group focus:outline-none"
>
  <span
    className="font-['Inter'] text-[20px] leading-[24px] tracking-[-0.02em] capitalize text-[#000000] whitespace-nowrap transition-all duration-300 ease-out group-hover:text-[#B1B1B1] group-hover:font-bold"
    style={{ fontWeight: 500 }}
  >
    About Us
  </span>
</a>

{/* Frame 51 - Mosaic Of Voices */}
<a
  href="/mosaic-of-voices"
  className="flex flex-row items-center p-0 gap-[12px] order-3 transition-all duration-300 ease-out hover:text-[#261033] group focus:outline-none"
>
  <span
    className="font-['Inter'] text-[20px] leading-[24px] tracking-[-0.02em] capitalize text-[#000000] whitespace-nowrap transition-all duration-300 ease-out group-hover:text-[#B1B1B1] group-hover:font-bold"
    style={{ fontWeight: 500 }}
  >
    Mosaic Of Voices
  </span>
</a>

{/* Frame 1 - Get Involved */}
<a
  href="/contact"
  className="box-border flex flex-row justify-center items-center p-[16px_20px] gap-[8px] bg-[#FFFFFF] border border-[rgba(0,0,0,0.1)] rounded-[100px] order-4 transition-all duration-300 ease-out hover:bg-[#F5F5F5] hover:shadow-lg active:scale-95 group focus:outline-none"
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="order-0 transition-all duration-300 ease-out group-hover:fill-[#FF6B6B]"
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#000000"
    />
  </svg>
  <span
    className="font-['Inter'] text-[20px] leading-[24px] tracking-[-0.02em] text-[#000000] whitespace-nowrap transition-all duration-300 ease-out group-hover:font-bold"
    style={{ fontWeight: 500 }}
  >
    Get Involved
  </span>
</a>

      </div>
    </header>
  );
}
