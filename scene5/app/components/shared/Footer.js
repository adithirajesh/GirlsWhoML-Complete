'use client';
import { useState, useEffect, useRef } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="w-full h-[781px] bg-[#393939] order-4"> 
      {/* Empowering women in ML and AI - exact Figma specs */}
      <h2
        className={`absolute w-[706px] h-[174px] left-[calc(50%-706px/2-288.5px)] top-[102px] font-['Inter'] text-[72px] leading-[87px] tracking-[-0.04em] text-[#FFFFFF] transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{fontWeight: 500, animationDelay: '200ms'}}
      >
        Empowering women in ML and AI
      </h2>

      {/* cta - exact Figma specs */}
      <a
        href="/mosaic-of-voices"
  className={`group flex flex-row justify-center items-center p-[20px_28px] gap-[8px] absolute w-[257px] h-[64px] left-[calc(50%-257px/2-513px)] top-[327px] bg-[#D89EFA] rounded-[100px] transition-all duration-700 ease-out hover:bg-[#000000] ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
  style={{animationDelay: '400ms'}}
  onMouseEnter={(e) => {
    e.currentTarget.querySelector('span').style.color = '#ffffff';
    e.currentTarget.querySelector('svg').style.color = '#ffffff';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.querySelector('span').style.color = '#000000';
    e.currentTarget.querySelector('svg').style.color = '#231F20';
  }}
>
  <span className="w-[169px] h-[24px] font-['Inter'] text-[20px] leading-[24px] tracking-[-0.02em] text-[#000000] order-0 transition-colors duration-700" style={{fontWeight: 500}}>
    See the live action
  </span>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="order-1 transition-all duration-700 ease-out group-hover:translate-x-1 text-[#231F20]">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</a>

      {/* divider */}
      <div
        className={`absolute w-[1275px] h-0 left-[calc(50%-1275px/2-4px)] top-[456px] border border-[#8A8A8A] transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
        style={{animationDelay: '600ms'}}
      ></div>

      {/* harangè logo */}
      <span
        className={`absolute w-[275px] h-[24px] left-[calc(50%-1275px/2-4px)]  top-[521px] font-alata font-normal text-[56px] leading-[20px] tracking-[-0.05em] text-[#FFFFFF] transition-all duration-700 ease-out  ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{animationDelay: '800ms'}}
      >
        harangè
      </span>

      {/* socialMedia - exact Figma specs */}
      <div
        className={`flex flex-row items-center p-0 gap-[16px] absolute w-[218px] h-[62px] left-[calc(50%-1275px/2-4px)]  top-[614px] transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{animationDelay: '1000ms'}}
      >
        {/* Frame 109 - Instagram */}
        <a
          href="https://www.instagram.com/girlswhoml/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[58px] h-[58px] bg-[#575757] rounded-[31px] flex items-center justify-center transition-all duration-300 ease-out order-0 group"
          aria-label="Instagram"
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path d="M16 2.8812C20.275 2.8812 20.7813 2.9 22.4625 2.975C24.025 3.0437 24.8688 3.3063 25.4313 3.525C26.175 3.8125 26.7125 4.1625 27.2688 4.7188C27.8313 5.2812 28.175 5.8125 28.4625 6.5563C28.6813 7.1188 28.9438 7.9688 29.0125 9.525C29.0875 11.2125 29.1063 11.7188 29.1063 15.9875C29.1063 20.2625 29.0875 20.7688 29.0125 22.45C28.9438 24.0125 28.6813 24.8563 28.4625 25.4188C28.175 26.1625 27.825 26.7 27.2688 27.2563C26.7063 27.8188 26.175 28.1625 25.4313 28.45C24.8688 28.6688 24.0188 28.9313 22.4625 29C20.775 29.075 20.2688 29.0938 16 29.0938C11.725 29.0938 11.2188 29.075 9.5375 29C7.975 28.9313 7.1313 28.6688 6.5688 28.45C5.825 28.1625 5.2875 27.8125 4.7313 27.2563C4.1688 26.6938 3.825 26.1625 3.5375 25.4188C3.3188 24.8563 3.0563 24.0063 2.9875 22.45C2.9125 20.7625 2.8938 20.2563 2.8938 15.9875C2.8938 11.7125 2.9125 11.2063 2.9875 9.525C3.0563 7.9625 3.3188 7.1188 3.5375 6.5563C3.825 5.8125 4.175 5.275 4.7313 4.7188C5.2938 4.1562 5.825 3.8125 6.5688 3.525C7.1313 3.3063 7.9813 3.0437 9.5375 2.975C11.2188 2.9 11.725 2.8812 16 2.8812ZM16 0C11.6563 0 11.1125 0.0187 9.4063 0.0938C7.7063 0.1688 6.5375 0.4437 5.525 0.8375C4.4688 1.25 3.575 1.7938 2.6875 2.6875C1.7938 3.575 1.25 4.4688 0.8375 5.5188C0.4437 6.5375 0.1688 7.7 0.0938 9.4C0.0188 11.1125 0 11.6562 0 16C0 20.3438 0.0188 20.8875 0.0938 22.5938C0.1688 24.2938 0.4437 25.4625 0.8375 26.475C1.25 27.5313 1.7938 28.425 2.6875 29.3125C3.575 30.2 4.4688 30.75 5.5188 31.1562C6.5375 31.55 7.7 31.825 9.4 31.9C11.1063 31.975 11.65 31.9937 15.9938 31.9937C20.3375 31.9937 20.8813 31.975 22.5875 31.9C24.2875 31.825 25.4563 31.55 26.4688 31.1562C27.5188 30.75 28.4125 30.2 29.3 29.3125C30.1875 28.425 30.7375 27.5313 31.1438 26.4813C31.5375 25.4625 31.8125 24.3 31.8875 22.6C31.9625 20.8938 31.9813 20.35 31.9813 16.0063C31.9813 11.6625 31.9625 11.1188 31.8875 9.4125C31.8125 7.7125 31.5375 6.5438 31.1438 5.5312C30.75 4.4688 30.2063 3.575 29.3125 2.6875C28.425 1.8 27.5313 1.25 26.4813 0.8438C25.4625 0.45 24.3 0.175 22.6 0.1C20.8875 0.0188 20.3438 0 16 0Z" fill="white"/>
            <path d="M16 7.7812C11.4625 7.7812 7.7812 11.4625 7.7812 16C7.7812 20.5375 11.4625 24.2188 16 24.2188C20.5375 24.2188 24.2188 20.5375 24.2188 16C24.2188 11.4625 20.5375 7.7812 16 7.7812ZM16 21.3312C13.0563 21.3312 10.6687 18.9438 10.6687 16C10.6687 13.0563 13.0563 10.6687 16 10.6687C18.9438 10.6687 21.3312 13.0563 21.3312 16C21.3312 18.9438 18.9438 21.3312 16 21.3312Z" fill="white"/>
            <path d="M26.4625 7.4562C26.4625 8.5187 25.6 9.375 24.5438 9.375C23.4813 9.375 22.625 8.5125 22.625 7.4562C22.625 6.3937 23.4875 5.5375 24.5438 5.5375C25.6 5.5375 26.4625 6.4 26.4625 7.4562Z" fill="white"/>
          </svg>
        </a>

        {/* Frame 110 - LinkedIn */}
        <a
          href="https://www.linkedin.com/company/girlswhoml/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[58px] h-[58px] bg-[#575757] rounded-[31px] flex items-center justify-center transition-all duration-300 ease-out  order-1 group"
          aria-label="LinkedIn"
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path d="M29.631 0H2.3625C1.0562 0 0 1.0313 0 2.3063V29.6875C0 30.9625 1.0562 32 2.3625 32H29.631C30.938 32 32 30.9625 32 29.6938V2.3063C32 1.0313 30.938 0 29.631 0ZM9.494 27.2687H4.7438V11.9937H9.494V27.2687ZM7.119 9.9125C5.5938 9.9125 4.3625 8.6812 4.3625 7.1625C4.3625 5.6438 5.5938 4.4125 7.119 4.4125C8.638 4.4125 9.869 5.6438 9.869 7.1625C9.869 8.675 8.638 9.9125 7.119 9.9125ZM27.269 27.2687H22.525V19.8438C22.525 18.075 22.494 15.7937 20.056 15.7937C17.587 15.7937 17.212 17.725 17.212 19.7188V27.2687H12.475V11.9937H17.025V14.0813H17.087C17.719 12.8813 19.269 11.6125 21.575 11.6125C26.381 11.6125 27.269 14.775 27.269 18.8875V27.2687Z" fill="white"/>
          </svg>
        </a>

        {/* Frame 111 - X/Twitter */}
        <a
          href="https://x.com/girlswhoml"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[58px] h-[58px] bg-[#575757] rounded-[31px] flex items-center justify-center transition-all duration-300 ease-out  order-2 group"
          aria-label="X"
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path d="M25.435 2.5386H29.933L20.106 13.7699L31.666 29.0532H22.615L15.525 19.784L7.413 29.0532H2.912L13.423 17.04L2.333 2.5386H11.614L18.023 11.011L25.435 2.5386ZM23.856 26.3609H26.348L10.26 5.0894H7.586L23.856 26.3609Z" fill="white"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
