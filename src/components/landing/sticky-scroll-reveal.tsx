"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAnimationControls, useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    target: ref,
    // container: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  const animateContainer = useAnimationControls();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    //scroll content
    setActiveCard(closestBreakpointIndex);

    //scroll container
    animateContainer.start({
      y: -closestBreakpointIndex * (containerRef.current?.clientHeight ?? 0) * 0.55,
    });


  });

  const backgroundColors = [
    "var(--green-100)",
    "var(--blue-100)",
    "var(--yellow-100)",
    "var(--purple-100)",
    "var(--pink-100)",
    "var(--white)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      console.log(contentHeight)
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [content]);


  return (
    // Replace the outer container div with proper height calculation
    <div className="relative w-full mt-48" style={{ height: `${content.length * 100}vh` }} ref={ref}>
      <h2 className="text-center text-slate-950 bg-gradient-to-b from-gray-50 to-green-100 text-4xl md:text-5xl lg:text-6xl font-medium font-['Inter'] leading-tight md:leading-[67.20px] pb-5 md:pb-[26px]">
        See, How it <br />
        <span className='text-orange-400'>works</span>
      </h2>
      <motion.div className="sticky top-0 h-screen w-full" ref={containerRef}>
        <motion.div
          animate={{
            backgroundColor: backgroundColors[activeCard % backgroundColors.length],
          }}
          className="h-full w-full flex justify-center relative space-x-10 rounded-md p-10"

        >

          <div className="div relative flex items-start px-4 lg:w-1/2 w-full">
            <motion.div className="max-w-5xl w-full flex lg:block flex-col justify-center items-center" animate={animateContainer}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              {content.map((item, index) => (
                <div key={item.title + index} className="my-20 bg-white rounded-3xl w-full max-h-[20rem] p-10 aspect-[16/9]">
                  <motion.h2
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    className="text-2xl font-bold text-slate-950"
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    className="text-kg text-slate-800 max-w-sm mt-10"
                  >
                    {item.description}
                  </motion.p>
                </div>
              ))}
              <div className="h-40" />
            </motion.div>
          </div>
          <div className="w-1/2 py-10 justify-center items-center hidden lg:flex">
            <div
              style={{ background: backgroundGradient }}
              className={cn(
                "hidden lg:block aspect-[9/16] rounded-3xl w-[70%] bg-white sticky top-10 overflow-hidden max-w-xs",
                contentClassName
              )}
            >
              {content[activeCard].content ?? null}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
