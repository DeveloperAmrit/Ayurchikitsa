'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { animate, scroll, spring } from 'motion';
import { ReactLenis } from 'lenis/react';

const features = [
  {
    title: "AI Video Generator",
    description: "Generate viral captions and hooks instantly with AI",
    bgColor: "bg-blue-100",
    image: "https://placehold.co/600x400/3b82f6/ffffff"
  },
  {
    title: "SCHEDULER",
    description: "Auto-post at peak engagement times",
    bgColor: "bg-orange-100",
    image: "https://placehold.co/600x400/f97316/ffffff"
  },
  {
    title: "HASHTAGS",
    description: "Smart hashtag recommendations",
    bgColor: "bg-emerald-100",
    image: "https://placehold.co/600x400/10b981/ffffff"
  },
  {
    title: "ANALYTICS",
    description: "Track and optimize performance",
    bgColor: "bg-blue-100",
    image: "https://placehold.co/600x400/3b82f6/ffffff"
  },
  {
    title: "TRENDS",
    description: "Stay ahead with trend predictions",
    bgColor: "bg-orange-100",
    image: "https://placehold.co/600x400/f97316/ffffff"
  }
];



export function FeaturesSection() {
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const items = document.querySelectorAll('li');

    if (ulRef.current) {
      const controls = (animate as any)(
        ulRef.current,
        {
          transform: [`translateX(200vw)`, `translateX(-${items.length - 3}00vw)`],
        },
        { easing: spring() }
      );
      scroll(controls, { target: document.querySelector('section')||undefined });
    }

    const segmentLength = 1 / items.length;
    items.forEach((item, i) => {
      const header = item.querySelector('h2');

      scroll(animate([header], { x: [800, -800] }), {
        target: document.querySelector('section')||undefined,
        offset: [
          [i * segmentLength, 1],
          [(i + 1) * segmentLength, 0],
        ],
      });
    });
  }, []);

  return (
    <ReactLenis root>
      <div className='mt-16'>
        <div>
          <div className='text-slate-900 relative w-full'>
            <div className='relative z-10'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-medium text-center tracking-tight leading-tight'>
                Automate Your <br />
                <span className='text-orange-400'>Social Growth</span>
              </h1>

            </div>
          </div>

          <section className='h-[500vh] relative bg-gr'>
            <ul ref={ulRef} className='flex sticky top-0'>

              {
                features.map((feature, index) => (
                  <li key={index} className={`h-screen w-screen flex flex-col justify-center overflow-hidden  items-center p-16`}>
                    <div className={`${feature.bgColor} w-full h-full rounded-3xl flex flex-col justify-center overflow-hidden  items-center`}>
                      <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold relative bottom-5 block text-black'>
                        {feature.title}
                      </h2>
                      <p className='text-base sm:text-lg md:text-xl font-medium relative z-10 mt-6'>
                        {feature.description}
                      </p>

                      <Image
                        src={feature.image}
                        className='2xl:w-[400px] w-[320px] absolute bottom-0 rounded-3xl transition-transform duration-500'
                        width={500}
                        height={500}
                        alt={feature.title}
                      />
                    </div>
                  </li>
                ))
              }

            </ul>
          </section>
        </div>
        <div className='progress fixed left-0 right-0  h-2 rounded-full bg-red-600 bottom-[50px] scale-x-0'></div>
      </div>
    </ReactLenis>
  );
}
