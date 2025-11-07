'use client';
import { useEffect } from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function Contact() {
  // Add smooth scrolling and hover animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      body {
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <div className="relative w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center">
    <div className="relative w-[1440px] bg-[#FFFFFF]">
      <Header />

      {/* Get Involved heading - exact Figma specs */}
      <h1 className="absolute w-[915px] h-[87px] left-[calc(50%-915px/2+0.5px)] top-[296px] font-['Inter'] text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000] order-0" style={{fontWeight: 500}}>
        Get Involved
      </h1>

      {/* Description - exact Figma specs */}
      <p className="absolute w-[1281px] h-[78px] left-[calc(50%-1281px/2+0.5px)] top-[445px] font-['Inter'] text-[32px] leading-[39px] text-center tracking-[-0.04em] text-[#000000] order-1" style={{fontWeight: 500}}>
        Your voice and generosity drive our mission forward.<br />
        Contact us to collaborate or donate to help us make lasting change.
      </p>

      {/* contactCards - exact Figma specs */}
      <div className="flex flex-row items-center justify-center gap-[39px] absolute w-full left-0 top-[585px]">

        {/* Frame 167 - Help Card */}
        <div className="flex flex-col justify-center items-center p-[40px_32px] gap-[40px] w-[519px] h-[325px] bg-[#FFFFFF] border border-[#E3E3E3] rounded-[20px] order-0 transition-all duration-300 ease-out">
          {/* helpIcon - heart */}
          <div className="w-[64px] h-[64px] relative flex-none order-0">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M46.1871 8.58665C52.0417 10.2408 56.5977 14.8475 58.1871 20.72C59.5548 26.3442 57.6847 32.2627 53.3338 36.08L33.9471 55.2267C32.9102 56.243 31.2507 56.243 30.2138 55.2267L10.6671 36.08C6.31612 32.2627 4.44607 26.3442 5.81376 20.72C7.40313 14.8475 11.9592 10.2408 17.8138 8.58665C22.7356 7.2376 28.0057 8.31738 32.0004 11.4933C35.9951 8.31738 41.2653 7.2376 46.1871 8.58665ZM32.0004 49.6L49.6804 32.2666C52.5801 29.7224 53.7888 25.7555 52.8004 22.0266C51.6676 18.0168 48.5399 14.8791 44.5338 13.7333C40.5942 12.6949 36.4038 13.9274 33.6538 16.9333C32.6168 17.9497 30.9573 17.9497 29.9204 16.9333C27.8364 14.7203 24.9589 13.4255 21.9204 13.3333C21.0177 13.3476 20.1209 13.4821 19.2538 13.7333C15.2476 14.8791 12.1199 18.0168 10.9871 22.0266C10.0491 25.7965 11.343 29.7713 14.3204 32.2666L32.0004 49.6Z" fill="#231F20"/>
            </svg>
          </div>

          {/* helpTitle */}
          <h3 className="w-[455px] h-[34px] font-['Inter'] text-[28px] leading-[34px] text-center tracking-[-0.02em] text-[#000000] order-1" style={{fontWeight: 700}}>
            Need help or have feedback?
          </h3>

          {/* helpEmail */}
          <div className="w-[455px] h-[29px] font-['Inter'] text-[24px] leading-[29px] text-center tracking-[-0.02em] text-[#000000] order-2" style={{fontWeight: 500}}>
            <span className="text-[#B1B1B1]">Email us at </span>
            <a href="mailto:team.harange@gmail.com" className="text-[#000000] underline hover:no-underline">
              team.harange@gmail.com
            </a>
          </div>
        </div>

        {/* Frame 168 - Support Card */}
        <div className="flex flex-col justify-center items-center p-[40px_32px] gap-[40px] w-[519px] h-[325px] bg-[#FFFFFF] border border-[#E3E3E3] rounded-[20px] order-1 transition-all duration-300 ease-out">
          {/* supportIcon - question mark */}
          <div className="w-[64px] h-[64px] relative flex-none order-0">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M58.6663 13.3333V50.6666C58.6663 55.0849 55.0846 58.6666 50.6663 58.6666H13.333C8.91473 58.6666 5.33301 55.0849 5.33301 50.6666V13.3333C5.33301 8.91503 8.91473 5.33331 13.333 5.33331H50.6663C55.0846 5.33331 58.6663 8.91503 58.6663 13.3333ZM25.9997 18.1066C28.2343 16.2808 31.1798 15.5739 33.9997 16.1866L34.0263 16.1066C38.1499 16.9906 41.1731 20.5229 41.4098 24.7334C41.6465 28.944 39.0382 32.7928 35.0397 34.1333C34.0325 34.6504 33.3807 35.6688 33.333 36.8V37.3333C33.333 38.8061 32.1391 40 30.6663 40C29.1936 40 27.9997 38.8061 27.9997 37.3333V36.72C28.0745 33.3278 30.1765 30.3114 33.333 29.0666C35.0704 28.5135 36.2139 26.8554 36.1134 25.0348C36.013 23.2142 34.6941 21.692 32.9063 21.3333C31.639 21.0624 30.3179 21.3977 29.333 22.24C28.4122 23.002 27.8833 24.1381 27.893 25.3333C27.893 26.8061 26.6991 28 25.2263 28C23.7536 28 22.5597 26.8061 22.5597 25.3333C22.5514 22.5275 23.8167 19.8694 25.9997 18.1066ZM33.4397 45.5466C33.433 45.1898 33.3607 44.8373 33.2263 44.5066C33.1048 44.1625 32.9038 43.8518 32.6397 43.6C31.5996 42.566 29.9198 42.566 28.8797 43.6C28.6302 43.8434 28.4309 44.1333 28.293 44.4533C28.1666 44.7853 28.1033 45.138 28.1063 45.4933C28.1162 46.1994 28.3924 46.8756 28.8797 47.3866C29.3829 47.8858 30.0642 48.1641 30.773 48.16H31.2797L31.7863 48C31.9455 47.9362 32.0975 47.8558 32.2397 47.76L32.6397 47.44C33.1486 46.9411 33.4367 46.2593 33.4397 45.5466ZM50.6663 10.6666C52.1391 10.6666 53.333 11.8606 53.333 13.3333V50.6666C53.333 52.1394 52.1391 53.3333 50.6663 53.3333H13.333C11.8602 53.3333 10.6663 52.1394 10.6663 50.6666V13.3333C10.6663 11.8606 11.8602 10.6666 13.333 10.6666H50.6663Z" fill="#231F20"/>
            </svg>
          </div>

          {/* supportTitle */}
          <h3 className="w-[455px] h-[34px] font-['Inter'] text-[28px] leading-[34px] text-center tracking-[-0.02em] text-[#000000] order-1" style={{fontWeight: 700}}>
            Want to support us?
          </h3>

          {/* supportEmail */}
          <div className="w-[455px] h-[29px] font-['Inter'] text-[24px] leading-[29px] text-center tracking-[-0.02em] text-[#000000] order-2" style={{fontWeight: 500}}>
            <span className="text-[#B1B1B1]">Email us at </span>
            <a href="mailto:megha@girlswhoml.com" className="text-[#000000] underline hover:no-underline">
              megha@girlswhoml.com
            </a>
          </div>
        </div>
      </div>
</div>
      {/* footer */}
      <div className="absolute w-full h-[781px] left-[-1px] top-[1050px] ">
        <Footer />
      </div>
    
    </div>
  );
}
