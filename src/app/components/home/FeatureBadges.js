// components/home/FeatureBadges.js
'use client';

import React, { useEffect, useRef } from 'react';
import {
  Truck,
  Leaf,

  Recycle,
  Shield,
   Sparkles,
  Palette,
  Droplets,
  ShieldCheck,
} from 'lucide-react';

const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

const features = [
  {
    id: 1,
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick & reliable delivery',
  },
  {
    id: 2,
    icon: Sparkles,
    title: 'Quality Beauty Products',
    description: 'Carefully selected for you',
  },
  {
    id: 3,
    icon: Palette,
    title: 'Makeup Essentials',
    description: 'Beauty for every look',
  },
  {
    id: 4,
    icon: Droplets,
    title: 'Skin & Hair Care',
    description: 'Care for your daily routine',
  },
  {
    id: 5,
    icon: ShieldCheck,
    title: 'Dermatologically Tested',
    description: 'Safe for all skin types',
  },
];

export default function FeatureBadges() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll('.feature-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#ECDFC1] border-y border-[#d4c4a8] overflow-hidden"
    >
      <div className="w-full max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-10 ">
        
        {/* Mobile: Horizontal Scroll - Show 2 items initially */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-0 min-w-max py-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`feature-item opacity-0 translate-y-4 transition-all duration-700 ease-out flex items-center gap-2 px-3 ${
                    index < features.length - 1 ? 'border-r border-[#c9bda5]' : ''
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Icon
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: '#71836B' }}
                    strokeWidth={1.35}
                  />
                  <div className="flex flex-col leading-tight whitespace-nowrap">
                    <span
                      className="text-[10px] font-semibold text-[#40583b]"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      {feature.title}
                    </span>
                    <span
                      className="text-[8px] font-normal text-[#71836B]"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      {feature.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop: 5 items in a row with centered content */}
        <div className="hidden md:grid md:grid-cols-5 min-h-[68px]">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`feature-item opacity-0 translate-y-4 transition-all duration-700 ease-out flex items-center justify-center px-4 py-5 relative ${
                  index < features.length - 1 ? 'after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-14 after:bg-[#c9bda5]' : ''
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className="w-[30px] h-[30px] flex-shrink-0"
                    style={{ color: '#71836B' }}
                    strokeWidth={1.35}
                  />
                  <div className="flex flex-col leading-tight whitespace-nowrap">
                    <span
                      className="text-[13px] font-semibold text-[#40583b]"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      {feature.title}
                    </span>
                    <span
                      className="text-[10px] font-normal text-[#71836B] mt-[6px]"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      {feature.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}