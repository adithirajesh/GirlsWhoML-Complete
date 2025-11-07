'use client';

import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "\"It was a transformative experience collaborating with women from over 20+ countries, amplifying their stories and experiences with AI and ML, and creating much-needed representation in the emerging tech space.\"",
    name: "Samina",
    location: "India"
  },
  {
    quote: "\"The project was an enriching journey - from crowdfunding the installation to connecting with brilliant minds and leading workshops. It deepened my understanding of the gaps and misrepresentation in tech and reinforced how essential inclusivity is when designing AI systems.\"",
    name: "Fatima",
    location: "Pakistan"
  },
  {
    quote: "\"\"Eye-opening\" is the word. It's my first time working with such a big, diverse team! I still remember thinking, \"Wow, I'm really part of something global,\" when seeing BSTs, EATs, and ISTs on our tech meeting times. It's eye-opening too to realize that behind AI's dazzling front are women often least recognized in the system. We hope Harang can help change that.\"",
    name: "Yanni",
    location: "China"
  },
  {
    quote: "\"It highlighted the persistent gaps and misrepresentations in technology, emphasizing the critical role of inclusive design in AI systems.\"",
    name: "Chae",
    location: "South Korea"
  },
  {
    quote: "\"Eye-opening\" is the word. It's my first time working with such a big, diverse team! I still remember thinking, \"Wow, I'm really part of something global,\" when seeing BSTs, EATs, and ISTs on our tech meeting times. It's eye-opening too to realize that behind AI's dazzling front are women often least recognized in the system. We hope Harang can help change that.\"",
    name: "Chae",
    location: "The UK"
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const sliderRef = useRef(null);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Update number of visible cards based on viewport
  useEffect(() => {
    const updateVisibleCount = () => {
      const cardWidth = 500 + 40; // card width + gap
      const count = Math.floor((window.innerWidth - 160) / cardWidth); // 80px margin on each side
      setVisibleCount(Math.max(1, count));
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, testimonials.length - visibleCount)
    );
  };

  const getVisibleTestimonials = () => {
    return testimonials.slice(currentIndex, currentIndex + visibleCount);
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <>

    <div className="w-[1441px] mx-auto overflow-hidden">
      {/* Slider */}
      <div
        ref={sliderRef}
        className={`flex flex-row items-center justify-start p-0 gap-[40px] w-full overflow-x-hidden transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ maxWidth: 'calc(100vw - 160px)' }} // 80px margin on each side
      >
        {visibleTestimonials.map((testimonial, idx) => (
          <div
            key={`${testimonial.name}-${idx}`}
            className="flex flex-col justify-between items-start p-[40px_32px] w-[500px] h-[465px] bg-[#FFFFFF] rounded-[20px] flex-none transition-all duration-700 ease-out"
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            <p
              className="font-['Inter'] italic text-[20px] leading-[32px] tracking-[-0.02em] text-[#000000] transition-all duration-300 ease-out group-hover:text-[#261033]"
              style={{ fontWeight: 500 }}
            >
              {testimonial.quote}
            </p>
            <p
              className="font-['Inter'] text-[24px] leading-[34px] tracking-[-0.02em] text-[#000000] w-full transition-all duration-300 ease-out group-hover:text-[#261033]"
            >
              <span
                className="italic transition-all duration-300 ease-out group-hover:text-[#D89EFA]"
                style={{ fontWeight: 700 }}
              >
                {testimonial.name}
              </span>
              <span className="italic" style={{ fontWeight: 500 }}>
                , {testimonial.location}
              </span>
            </p>
          </div>
        ))}
      </div>
      </div>

      {/* Navigation arrows */}
      <div
        className={`flex flex-row items-center gap-[16px] mt-[40px] transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ animationDelay: '600ms' }}
      >
        {/* Left arrow */}
        <button
  onClick={goToPrevious}
  disabled={currentIndex === 0}
  className={`w-[64px] h-[64px] rounded-full border flex items-center justify-center transition-all duration-300 ease-out
    ${
      currentIndex === 0
        ? 'border-gray-300 cursor-not-allowed'
        : 'border-black cursor-pointer hover:bg-black hover:border-black focus:outline-none'
    }`}
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="transition-all duration-300 ease-out group-hover:-translate-x-1"
  >
    <path
      d="M19 12H5M5 12L11 6M5 12L11 18"
      stroke={currentIndex === 0 ? '#ccc' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>


        {/* Right arrow */}
<button
  onClick={goToNext}
  disabled={currentIndex >= testimonials.length - visibleCount}
  className={`w-[64px] h-[64px] rounded-full border flex items-center justify-center transition-all duration-300 ease-out
    ${
      currentIndex >= testimonials.length - visibleCount
        ? 'border-gray-300 cursor-not-allowed'
        : 'border-black cursor-pointer hover:bg-black hover:border-black focus:outline-none'
    }`}
>
  {/* button content */} 

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-all duration-300 ease-out group-hover:translate-x-1"
          >
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              stroke={
                currentIndex >= testimonials.length - visibleCount ? '#ccc' : '#000'
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
