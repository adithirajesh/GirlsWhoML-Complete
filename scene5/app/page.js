'use client';
import { useState, useEffect, useRef } from 'react';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import TestimonialSlider from './components/home/TestimonialSlider';

export default function Home() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [scrollY, setScrollY] = useState(0);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = new Map();

    const observerCallback = (entries, sectionId) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, sectionId]));
        }
      });
    };

    // Create observers for each section
    ['hero', 'live-badge', 'description', 'change1', 'change2', 'change3', 'cta', 'testimonials'].forEach(sectionId => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => observerCallback(entries, sectionId),
          { threshold: 0.1, rootMargin: '50px' }
        );
        observer.observe(element);
        observers.set(sectionId, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSectionClass = (sectionId, baseClass = '') => {
    const isVisible = visibleSections.has(sectionId);
    return `${baseClass} transition-all duration-1000 ease-out ${
      isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-8'
    }`;
  };
  // Add smooth scrolling styles
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
    <div className="relative w-[1440px]  bg-[#FFFFFF]">
      <div className="sticky top-0 z-50 bg-white w-full flex justify-center">
        <div className="w-[1440px]">
        <Header />
        </div>
      </div>
      {/* rest of your content */}


    {/* Main content */}
    <div className="relative w-[1440px] bg-[#FFFFFF]"></div>
      {/* topSection */}
      <section className="absolute w-[1441px] h-[1769px] left-[calc(50%-1441px/2+0.5px)] top-[156px]">
        {/* heroText */}
        <div
          ref={el => sectionRefs.current['hero'] = el}
          className={getSectionClass('hero', "flex flex-col items-center p-0 gap-[52px] absolute w-[881px] h-[368px] left-[281px] top-[120px]")}
        >
          {/* h1 */}
          <div className="flex flex-col items-center p-0 gap-[40px] w-[881px] h-[252px] flex-none order-0 self-stretch flex-grow-0">
            <h1 className="w-[881px] h-[174px] font-['Inter'] text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000] flex-none order-0 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              An Ecosystem to enable gender parity in ML and AI
            </h1>
            <p className="w-[881px] h-[38px] font-['Inter'] text-[32px] leading-[39px] text-center tracking-[-0.04em] text-[#000000] flex-none order-1 self-stretch flex-grow-0" style={{fontWeight: 450}}>
              GirlsWhoML x Mozilla Festival 2025
            </p>
          </div>

          {/* cta1 */}
          <a
          href="./mosaic-of-voices"
            className="group flex flex-row justify-center items-center p-[20px_28px] gap-[8px] w-[323px] h-[64px] bg-[#D89EFA] rounded-[100px] flex-none order-1 flex-grow-0 transition-all duration-700 ease-out hover:bg-[#000000]"
            onMouseEnter={(e) => {
              e.currentTarget.querySelector('span').style.color = '#ffffff';
              e.currentTarget.querySelector('svg').style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('span').style.color = '#000000';
              e.currentTarget.querySelector('svg').style.color = '#231F20';
            }}
          >
            <span className="w-[235px] h-[24px] font-['Inter'] font-bold text-[20px] leading-[24px] tracking-[-0.02em] text-[#000000] flex-none order-0 flex-grow-0 transition-colors duration-700" style={{fontWeight: 450}}>
              Explore Collective Gallery
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-none order-1 flex-grow-0 transition-all duration-700 ease-out group-hover:translate-x-1 text-[#231F20]">
              <path d="M3 12H21M21 12L14 5M21 12L14 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* liveBadge */}
        <div
  ref={el => (sectionRefs.current['live-badge'] = el)}
  className={getSectionClass(
    'live-badge',
    "box-border flex flex-row justify-center items-center p-[8px_16px] gap-[8px] absolute w-[83px] h-[35px] left-[calc(50%-83px/2)] top-[618px] border border-[#DBDBDB] rounded-[100px]"
  )}
>
  <style jsx>{`
    @keyframes smooth-blink {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.4;
        transform: scale(0.8);
      }
    }
    .animate-smooth-blink {
      animation: smooth-blink 1.2s ease-in-out infinite;
    }
  `}</style>

  <div className="w-[9px] h-[9px] bg-[#F06464] rounded-full animate-smooth-blink"></div>

  <span
    className="w-[34px] h-[19px] font-['Inter'] text-[16px] leading-[19px] tracking-[-0.02em] text-[#000000] font-semibold"
  >
    LIVE
  </span>
</div>


<section
  ref={el => sectionRefs.current['live-water'] = el}
  className="absolute w-[1200px] h-[675px] left-[120px] top-[700px] rounded-[20px] overflow-hidden border border-gray-300"
>
  <iframe
    src="http://localhost:5173/"
    title="Live Water Tank"
    className="w-full h-full"
    allowFullScreen
  />
</section>
        {/* description */}
        <div
          ref={el => sectionRefs.current['description'] = el}
          className={getSectionClass('description', "absolute w-[1440px] left-[calc(50%-1440px/2)] top-[1415px] text-[32px] leading-[39px] text-center text-[#000000]")}
          style={{fontFamily: 'var(--font-inter)', fontWeight: 500, letterSpacing: '-4%'}}
        >
          <div className="whitespace-nowrap">On November 7th, 2025, GirlsWhoML and Oeuvre unveiled "Below the Surface",</div>
          <div className="whitespace-nowrap">an installation that transforms a quiet gesture into an act of visibility.</div>
          <div>&nbsp;</div>
          <div className="whitespace-nowrap">Visitors tap on our NFC chips, and each touch reveals faces and voices of real</div>
          <div className="whitespace-nowrap">women whose presence in technology is too often unseen, creating a shared act</div>
          <div className="whitespace-nowrap">of recognition and emergence.</div>
        </div>
      </section>

      {/* secondSection */}
      <section className="absolute w-[1441px] h-[3642px] left-[calc(50%-1441px/2+0.5px)] top-[1925px]">
        <h2 className="absolute w-[915px] h-[87px] left-[calc(50%-915px/2+1px)] top-[179px] font-['Inter'] text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000]" style={{fontWeight: 500}}>
          The Change We're Making
        </h2>

        {/* change1 */}
        <div
          ref={el => sectionRefs.current['change1'] = el}
          className={getSectionClass('change1', "flex flex-row items-center p-0 gap-[75px] absolute w-[1069.29px] h-[563px] left-[187px] top-[571px]")}
        >
          {/* leftText */}
          <div className="flex flex-col items-start p-0 gap-[44px] w-[566px] h-[563px] flex-none order-0 flex-grow-0">
            <div className="w-[566px] h-[195px] font-['Inter'] text-[54px] leading-[65px] tracking-[-0.04em] text-[#000000] flex-none order-0 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              <div className="whitespace-nowrap">Below the Surface —</div>
              <div className="whitespace-nowrap">Lifting Women in AI Out</div>
              <div className="whitespace-nowrap">of Invisibility</div>
            </div>
            <div className="w-[566px] h-[324px] font-['Inter'] text-[24px] leading-[36px] tracking-[-0.02em] text-[#000000] flex-none order-1 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              <div className="whitespace-nowrap">Millions of women perform the foundational work</div>
              <div className="whitespace-nowrap">of AI — labelling, tagging, and cleaning the data</div>
              <div className="whitespace-nowrap">that trains our models. Many earn only $2–4 an</div>
              <div className="whitespace-nowrap">hour for this invisible labour. We set out to speak</div>
              <div className="whitespace-nowrap">with these women, yet even we, in trying to make</div>
              <div className="whitespace-nowrap">them visible, found many beyond reach. Among the</div>
              <div className="whitespace-nowrap">submerged faces we could gather, we placed</div>
              <div className="whitespace-nowrap">empty frames — reminders that invisibility extends</div>
              <div className="whitespace-nowrap">deeper than we imagined.</div>
            </div>
          </div>
          {/* img */}
          <div className="w-[428px] h-[520px] flex-none order-1 flex-grow-0 flex items-center justify-center">
            <div className="w-[440px] h-[550px] flex-none order-1 transition-all duration-500 ease-out">
              <img src="/images/home/img1.png" alt="Below the Surface illustration" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* change2 */}
        <div
          ref={el => sectionRefs.current['change2'] = el}
          className={getSectionClass('change2', "flex flex-row items-start p-0 gap-[69px] absolute w-[1100px] h-[707px] left-[187px] top-[1444px]")}
        >
          {/* img */}
          <div className="w-[476px] h-[476px] flex-none order-0 flex-grow-0 transition-all duration-500 ease-out">
            <img src="/images/home/img2.png" alt="Tiles of reflection illustration" className="w-full h-full object-contain" />
          </div>

          {/* rightText */}
          <div className="flex flex-col items-start p-0 gap-[44px] w-[555px] h-[707px] flex-none order-1 flex-grow-0">
            <h3 className="w-[555px] h-[195px] font-['Inter'] text-[54px] leading-[65px] tracking-[-0.04em] text-[#000000] flex-none order-0 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              Tiles of Reflection — Let Women's Voices Be Heard
            </h3>
            <p className="w-[555px] h-[360px] font-['Inter'] text-[24px] leading-[36px] tracking-[-0.02em] text-[#000000] flex-none order-1 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              Through our survey, we collected <span className="text-[#F06464]">[insert number]</span> reflections from women working across AI — their words revealing resilience, isolation, and hope. Each response became one of <span className="text-[#F06464]">[insert number]</span> digital tiles within the installation, glowing softly as visitors engaged. Guests were invited to select up to four tiles that resonated with them most — a simple act that amplified these women's voices. In doing so, the installation turned listening into participation, and participation into recognition.
            </p>
            <a
              href="/mosaic-of-voices"
              className="flex flex-row justify-center items-center p-[20px_28px] gap-[8px] w-[206px] h-[64px] bg-[#000000] rounded-[100px] flex-none order-2 flex-grow-0 transition-all duration-300 ease-out ease-out hover:bg-[#333333]"
            >
              <span className="w-[150px] h-[24px] font-['Inter'] text-[20px] leading-[24px] tracking-[-0.02em] text-[#F5F5F5] flex-none order-0 flex-grow-0 " style={{fontWeight: 500}}>
                See their stories
              </span>
            </a>
          </div>
        </div>

        {/* change3 */}
        <div
          ref={el => sectionRefs.current['change3'] = el}
          className={getSectionClass('change3', "flex flex-row items-start p-0 gap-[53px] absolute w-[1079px] h-[851px] left-[187px] top-[2677px]")}
        >
          {/* leftText */}
          <div className="flex flex-col items-start p-0 gap-[44px] w-[521px] h-[851px] flex-none order-0 flex-grow-0">
            <h3 className="w-[521px] h-[195px] font-['Inter'] text-[54px] leading-[65px] tracking-[-0.04em] text-[#000000] flex-none order-0 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              Two Reflective Questions — Your Reflections Matter
            </h3>
            <div className="w-[514px] h-[612px] font-['Inter'] text-[24px] leading-[36px] tracking-[-0.02em] text-[#000000] flex-none order-1 flex-grow-0" style={{fontWeight: 500}}>
              <p className="mb-[24px]">At the end of the experience, visitors encountered two open questions:</p>
              <p className="mb-[24px]">1. What word best describes how you feel after exploring this installation?</p>
              <p className="mb-[36px]">2. What is one insight or reflection you'll take away with you?</p>
              <p>We expect to engage around <span className="text-[#F06464]">[insert number]</span> visitors and have already received <span className="text-[#F06464]">[insert number]</span> reflections. Together, these responses form a living archive of empathy and awareness — the first of its kind to document how people feel when confronted with the gendered invisibility embedded in AI. It is both a mirror and a measure of change, reminding us that visibility is not given — it is created, collectively.</p>
            </div>
          </div>

          {/* Reflection Form - Main Container */}
          <div className="w-[500px] h-[640px] flex-none order-1 flex-grow-0 bg-[#575757] rounded-[20px] relative transition-all duration-500 ease-out">

            {/* Question 1 - Rotated */}
            <div
              className="absolute w-[424px] h-[80px] bg-[#D89EFA] rounded-[20px] flex items-center justify-start"
              style={{
                left: '50.91px',
                top: '57.61px',
                transform: 'rotate(-3deg)'
              }}
            >
              <span
                className="font-['Inter'] text-[20px] leading-[52px] tracking-[-0.05em] text-[#000000] "
                style={{
                  fontWeight: 500,
                  transform: 'rotate(-0.3deg)',
                  paddingLeft: '24px'
                }}
              >
                Q1. What word best describe...
              </span>
            </div>

            {/* Question 2 - Rotated */}
            <div
              className="absolute w-[424px] h-[80px] bg-[#D89EFA] rounded-[20px] flex items-center justify-start"
              style={{
                left: '48px',
                top: '167px',
                transform: 'rotate(2.08deg)'
              }}
            >
              <span
                className="font-['Inter'] text-[20px] leading-[52px] tracking-[-0.05em] text-[#000000]"
                style={{
                  fontWeight: 500,
                  transform: 'rotate(0.4deg)',
                 paddingLeft: '24px' 
                }}
              >
                Q2. What is one insight or...
              </span>
            </div>

            {/* Text Area Container */}
            <div
              className="absolute w-[409px] h-[167px] bg-[#383838] border border-[#C3C3C3] rounded-[10px]"
              style={{
                left: '48px',
                top: '290px'
              }}
            >
              <textarea
                className="absolute w-[352px] h-[72px] bg-transparent border-none outline-none resize-none text-[#FFFFFF] font-['Inter'] text-[16px] leading-[24px] tracking-[-0.02em] placeholder-[#CCCCCC] transition-all duration-300 ease-out focus:scale-105 focus:shadow-lg"
                style={{
                  left: '24px',
                  top: '24px',
                  fontWeight: 500
                }}
                placeholder="This experience gave me the confidence to pursue AI, something I never imagined possible..."
              />
            </div>

            {/* Send Button Container */}
            <div className="absolute" style={{ left: '48px', top: '501px' }}>
              {/* Button */}
              <button
                className="w-[208px] h-[54px] bg-[#F1F1F1] transition-all duration-300 ease-out rounded-[100px] flex flex-row justify-center items-center border-none outline-none"
                style={{ padding: '20px 28px' }}
              >
                <span
                  className="font-['Inter'] text-[16px] leading-[20px] tracking-[-0.02em] text-[#000000]"
                  style={{fontWeight: 500}}
                >
                  Send your reflection
                </span>
              </button>

              {/* Purple Arrow Cursor - positioned under o and n in reflection */}
              <div
                className="absolute transition-all duration-300 ease-out hover:scale-110 hover:rotate-6"
                style={{
                  left: '200px',
                  top: '65%',
                  transform: 'translateX(-50%)'
                }}
              >
                <svg width="51" height="58" viewBox="0 0 66 58" fill="none" className="transition-all duration-300 ease-out">
                  <path
                    d="M1.06783 5.71928C0.456195 2.30615 4.18041 -0.215276 7.12227 1.62023L48.1239 27.2018C51.0939 29.0549 50.4188 33.5601 47.036 34.4612L30.3342 38.9098C29.0279 39.2579 27.8771 40.0369 27.0689 41.1206L16.7363 54.975C14.6434 57.7813 10.2097 56.7349 9.59207 53.2891L1.06783 5.71928Z"
                    fill="#D89EFA"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

                {/* Live Water Tank Display */}


      {/* thirdSection */}
      <section className="absolute w-[1441px] h-[985px] left-[calc(50%-1441px/2+0.5px)] top-[5567px]">
        <div className="flex flex-col items-center p-[100px_0px] gap-[10px] w-[1441px] h-[985px]">
          {/* ctaCard */}
          <div
            ref={el => sectionRefs.current['cta'] = el}
            className={getSectionClass('cta', "flex flex-col justify-center items-center p-[120px_98px] gap-[95px] w-[1079px] h-[785px] bg-[#F6D55C] rounded-[50px] flex-none order-0 flex-grow-0")}
            style={{transition: 'all 0.5s ease-out'}}
          >
            <h2 className="w-[989px] h-[174px] font-['Inter'] text-[68px] leading-[87px] text-center tracking-[-0.04em] text-[#000000] flex-none order-0 flex-grow-0" style={{fontWeight: 500}}>
              Support the Next Generation<br />of Women in AI
            </h2>
            <p className="w-[1000px] h-[100px] font-['Inter'] text-[28px] leading-[40px] text-center tracking-[-0.02em] text-[#000000] flex-none order-1 flex-grow-0" style={{fontWeight: 500}}>
              Your donation helps us reach our goal of introducing 100,000 women and non-binary individuals to machine learning through free education, mentorship, and real-world opportunities.
            </p>
            {/* ctaButton */}
            <a
              href="/contact"
              className="flex flex-row justify-center items-center p-[20px_28px] gap-[8px] w-[230px] h-[64px] bg-[#000000] rounded-[100px] flex-none order-2 flex-grow-0 transition-all duration-300 ease-out hover:bg-[#333333]"
            >
              <span className="w-[174px] h-[24px] font-['Inter'] text-[20px] leading-[24px] tracking-[-0.02em] text-[#F5F5F5] flex-none order-0 flex-grow-0" style={{fontWeight: 500}}>
                Support the Future
              </span>
            </a>
          </div>
        </div>
      </section>
</div>

      {/* forthSection */}
      <section
  ref={el => sectionRefs.current['testimonials'] = el}
  className={getSectionClass(
    'testimonials',
    "absolute w-full h-[1331px] left-0 top-[6552px] bg-[#F5F3ED] flex flex-col items-center"
  )}
>
  <h2
    className="absolute w-[915px] h-[87px] left-[calc(50%-915px/2+1px)] top-[179px] font-['Inter'] text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000]"
    style={{ fontWeight: 500 }}
  >
    Voices & Reflections: Women Shaping AI
  </h2>

{/* Slider wrapper */}
<div className="absolute top-[450px] left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out">
  <TestimonialSlider />
</div>

</section>


      {/* footer */}
      <div className="absolute w-full h-[780px] top-[7883px] flex justify-center">
        <Footer />
      </div>
    
    </div>
  );
}