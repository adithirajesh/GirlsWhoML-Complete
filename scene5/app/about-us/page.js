import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function AboutUs() {
  return (
    <div className="relative w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center">
    
      <Header />

      {/* topSection - exact Figma specs */}
      <section className="absolute w-[1440px] h-[1023px] left-0 top-[156px]">
        {/* content */}
        <div className="flex flex-col items-center p-0 gap-[93px] absolute w-[1065px] h-[732px] left-[188px] top-[146px]">

          {/* About us heading */}
          <h1 className="w-[915px] h-[87px] font-['Inter'] text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000] order-0" style={{fontWeight: 500}}>
            About us
          </h1>

          {/* Description */}
          <p className="w-[1065px] h-[273px] font-['Inter'] text-[32px] leading-[39px] text-center tracking-[-0.04em] text-[#000000] order-1" style={{fontWeight: 500}}>
            Harangè is collective that is born out of the necessity to capture women's ambitions, dreams and aspirations of their AI-mediated futures. Led by GirlsWhoML and supported by Women AI Collective and Oeuvre, it took shape as an interactive installation at the Mozilla Festival 2025 and has since taken a life of its own. Harangè - as the Korean word means to fly skyward - makes space for people to reflect, reframe and reimagine our collective digital futures.
          </p>

          {/* logos - exact Figma specs */}
          <div className="flex flex-row items-center p-0 gap-[60px] w-[863px] h-[186px] order-2">

            {/* Frame 156 - Harangè Logo */}
            <div className="flex flex-col items-center p-0 gap-[12px] w-[189px] h-[186px] order-0">
              <img src="/images/about/logo1.png" alt="Harangè logo" className="w-full h-full object-contain" />
            </div>

            {/* image 1 - x separator */}
            <div className="w-[40px] h-[40px] order-1 flex items-center justify-center relative">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="8" y1="8" x2="32" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="32" y1="8" x2="8" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Oeuvre Logo */}
            <div className="w-[196px] h-[186px] order-2">
              <img src="/images/about/logo2.png" alt="Oeuvre logo" className="w-full h-full object-contain" />
            </div>

            {/* image 2 - x separator */}
            <div className="w-[40px] h-[40px] order-3 flex items-center justify-center relative">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="8" y1="8" x2="32" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="32" y1="8" x2="8" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            {/* GirlsWhoML Logo */}
            <div className="w-[174px] h-[174px] order-4">
              <img src="/images/about/logo3.png" alt="GirlsWhoML logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* bottomSection - exact Figma specs */}
      <section className="flex flex-col items-center py-[200px] gap-[80px] absolute w-full left-0 top-[1179px] bg-[#F5F3ED]">
        {/* Quote */}
        <p className="w-[1077px] h-[420px] font-['Inter'] text-[58px] leading-[70px] text-center tracking-[-0.04em] text-[#000000] order-0" style={{fontWeight: 500}}>
          "If we don't get women and people of colour at the table – real technologists doing the real work – we will bias systems. Trying to reverse that a decade or two from now will be so much more difficult, if not close to impossible."
        </p>

        {/* Attribution */}
        <p className="w-[529px] h-[77px] font-['Inter'] text-[28px] leading-[34px] text-center tracking-[-0.04em] text-[#000000] opacity-50 order-1" style={{fontWeight: 500}}>
          Melinda Gates, Co-chair Bill & Melinda Gates Foundation
        </p>
      </section>
 
      {/* footer */}
      <div className="absolute w-full h-[781px] left-[-1px] top-[2156px]">
        <Footer />
      </div>
    
    </div>
  );
} 