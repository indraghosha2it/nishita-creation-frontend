'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8f7f2] py-16 sm:py-20 lg:py-24">
      {/* =========================================================
          BACKGROUND BOTANICAL LINE ART
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute left-[24%] top-[-40px] h-[700px] w-[430px] opacity-[0.055]"
          viewBox="0 0 430 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M240 690C238 560 246 450 235 345C226 255 210 165 185 85"
            stroke="#24352d"
            strokeWidth="2"
          />

          <path
            d="M235 380C190 335 145 320 100 325C150 350 190 375 235 380Z"
            stroke="#24352d"
            strokeWidth="2"
          />

          <path
            d="M238 300C280 260 322 248 370 255C320 275 280 295 238 300Z"
            stroke="#24352d"
            strokeWidth="2"
          />

          <path
            d="M225 245C180 205 145 185 102 188C145 215 185 235 225 245Z"
            stroke="#24352d"
            strokeWidth="2"
          />

          <path
            d="M218 190C252 145 286 125 330 126C295 155 258 177 218 190Z"
            stroke="#24352d"
            strokeWidth="2"
          />

          <path
            d="M204 140C175 95 160 62 165 25C192 62 205 100 204 140Z"
            stroke="#24352d"
            strokeWidth="2"
          />

          <path
            d="M236 430C285 390 330 380 380 392C330 410 285 425 236 430Z"
            stroke="#24352d"
            strokeWidth="2"
          />

          <path
            d="M240 510C195 465 155 450 112 456C158 480 195 500 240 510Z"
            stroke="#24352d"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-10">

          {/* =====================================================
              LEFT SIDE
          ====================================================== */}
          <div className="relative z-10">

            {/* TOP AREA */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-[285px_1fr] sm:items-center">

              {/* LEFT IMAGE */}
              <div className="relative mx-auto h-[285px] w-full max-w-[285px] overflow-hidden rounded-r-[150px] border border-[#354239] sm:mx-0">
                <Image
                  src="/images/why-choose-us-1.jpg"
                  alt="Relaxing beauty treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 285px, 285px"
                />
              </div>

              {/* TEXT */}
              <div className="max-w-[330px]">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#53645a]">
                  Why Choose Us
                </p>

                <h2 className="font-serif text-[38px] leading-[1.05] text-[#263b32] sm:text-[42px] lg:text-[44px]">
                  Rejuvenate
                  <br />
                  and Revitalize
                </h2>

                <p className="mt-5 max-w-[310px] text-[13px] leading-[1.8] tracking-[0.03em] text-[#536059]">
                  We believe true beauty begins with feeling your best.
                  Our carefully designed treatments create a peaceful
                  experience where you can relax, recharge, and reconnect
                  with yourself.
                </p>

                <button
                  type="button"
                  className="
                    group
                    mt-5
                    inline-flex
                    items-center
                    gap-3
                    border
                    border-[#536158]
                    px-7
                    py-3
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.16em]
                    text-[#34463d]
                    transition-all
                    duration-300
                    hover:bg-[#34463d]
                    hover:text-white
                  "
                >
                  Discover More

                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>

            {/* =================================================
                STATS
            ================================================== */}
            <div className="mt-11 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">

              {/* STAT 1 */}
              <div className="border-t border-[#526057] pt-6">
                <div className="font-serif text-[46px] leading-none text-[#294037] sm:text-[50px]">
                  346+
                </div>

                <p className="mt-4 font-serif text-[18px] text-[#355046]">
                  Happy Clients
                </p>
              </div>

              {/* STAT 2 */}
              <div className="border-t border-[#526057] pt-6">
                <div className="font-serif text-[46px] leading-none text-[#294037] sm:text-[50px]">
                  750+
                </div>

                <p className="mt-4 font-serif text-[18px] text-[#355046]">
                  Treatments Completed
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT IMAGE
          ====================================================== */}
          <div className="relative z-10 mx-auto w-full max-w-[390px] lg:ml-auto">

            <div className="relative aspect-[0.68] w-full overflow-hidden rounded-t-[190px] border border-[#354239]">
              <Image
                src="/images/why-choose-us-2.jpg"
                alt="Relaxing spa treatment"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 390px, 390px"
              />

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              {/* IMAGE LABEL */}
              <div className="absolute bottom-7 left-0 right-0 text-center">
                <button
                  type="button"
                  className="
                    font-serif
                    text-[23px]
                    text-white
                    underline
                    decoration-white/60
                    underline-offset-4
                    transition-opacity
                    duration-300
                    hover:opacity-75
                  "
                >
                  Explore Treatments
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FEATURE ROW
        ====================================================== */}
        <div className="relative z-10 mt-16 grid grid-cols-1 border-t border-[#c7c9c0] pt-8 sm:grid-cols-3 sm:gap-8">

          {/* FEATURE */}
          <div className="border-b border-[#c7c9c0] pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8">
            <span className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-[#68766d]">
              01
            </span>

            <h3 className="font-serif text-[22px] text-[#2d4339]">
              Expert Care
            </h3>

            <p className="mt-2 text-[12px] leading-6 text-[#657069]">
              Experienced professionals dedicated to your comfort and care.
            </p>
          </div>

          {/* FEATURE */}
          <div className="border-b border-[#c7c9c0] py-6 sm:border-b-0 sm:border-r sm:px-8 sm:py-0">
            <span className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-[#68766d]">
              02
            </span>

            <h3 className="font-serif text-[22px] text-[#2d4339]">
              Premium Products
            </h3>

            <p className="mt-2 text-[12px] leading-6 text-[#657069]">
              Carefully selected products that support healthy, radiant skin.
            </p>
          </div>

          {/* FEATURE */}
          <div className="pt-6 sm:pl-8 sm:pt-0">
            <span className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-[#68766d]">
              03
            </span>

            <h3 className="font-serif text-[22px] text-[#2d4339]">
              Peaceful Experience
            </h3>

            <p className="mt-2 text-[12px] leading-6 text-[#657069]">
              A serene environment designed to help you relax and recharge.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;