// thanks to oliver: https://www.youtube.com/@olivierlarose1
'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';


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

export function FeaturesSection2() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });
  return (
    <ReactLenis root>
      <div className='w-full mt-48' ref={container}>
        <div className='text-slate-900 relative w-full'>
          {/* <div className='relative z-10'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-medium text-center tracking-tight leading-tight'>
              Automate Your <br />
              <span className='text-orange-400'>Social Growth</span>
            </h1>

          </div> */}
          <h2 className="text-center text-slate-950 text-4xl md:text-5xl lg:text-6xl font-medium font-['Inter'] leading-tight md:leading-[67.20px] mb-5 md:mb-[26px]">
            Automate Your <br />
            <span className='text-orange-400'>Social Growth</span>
          </h2>

        </div>

        <section className='text-black   w-full'>
          {features.map((feature, i) => {
            const targetScale = 1 - (features.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={feature?.image}
                title={feature?.title}
                color={feature?.bgColor}
                description={feature?.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </div>
    </ReactLenis>
  );
}
interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}
export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen w-full flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-[450px]  w-[70%] rounded-md p-10 origin-top ${color} !rounded-3xl`}
      >
        <h2 className='text-2xl text-center font-semibold'>{title}</h2>
        <div className={`flex h-full mt-5 gap-10`}>
          <div className={`w-[40%] relative top-[10%]`}>
            <p className='text-sm'>{description}</p>
            <span className='flex items-center gap-2 pt-2'>
              <a
                href={'#'}
                target='_blank'
                className='underline cursor-pointer'
              >
                See more
              </a>
              <svg
                width='22'
                height='12'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='black'
                />
              </svg>
            </span>
          </div>

          <div
            className={`relative w-[60%] h-full rounded-lg overflow-hidden `}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <Image fill src={url} alt='image' className='object-cover' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};