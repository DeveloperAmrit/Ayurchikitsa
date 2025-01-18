"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const steps = [
    {
      number: "1",
      numberColor: "text-[#f14a59]",
      title: "Set your client and project criteria",
      description: "You tell us the types of clients, ideal company size, preferred location, etc. We focus on sourcing clients that fit your niche. The more targeted, the better the results.",
      bgColor: "bg-[#fef1f2]",
      image: "/placeholder.svg?height=254&width=395"
    },
    {
      number: "2",
      numberColor: "text-[#05b184]",
      title: "Our team finds and validates leads",
      description: "Our sales experts locate the best leads specifically to meet your criteria. Every lead is verified and validated by a real person on our team to ensure quality.",
      bgColor: "bg-[#fef1f2]",
      image: "/placeholder.svg?height=359&width=387",
      link: {
        text: "FAQs about Leads",
        color: "text-[#05b184]"
      }
    },
    {
      number: "3",
      numberColor: "text-[#4ddffd]",
      title: "New potential clients get added to your dashboard",
      description: "Sit back and relax. You'll get a notification as a steady stream of new leads get added to your account every few days.",
      bgColor: "bg-[#ebfbff]",
      image: "/placeholder.svg?height=333&width=428",
      additionalText: "Leads come populated with name, email, company name, website, and LinkedIn profile URL."
    },
    {
      number: "4",
      numberColor: "text-[#05b184]",
      title: "Start reaching out and nurturing your leads",
      description: "Cold outreach doesn't have to be hard. Not sure what to say? Use our email templates and sending tools to make reaching out quick, easy, and effective.",
      bgColor: "bg-[#fef1f2]",
      image: "/placeholder.svg?height=359&width=387"
    },
    {
      number: "5",
      numberColor: "text-[#4ddffd]",
      title: "Rinse, repeat, profit.",
      description: "Nothing slips through the cracks. We send you scheduled reminders to keep in regular contact with your past, current, and potential clients.",
      bgColor: "bg-[#ebfbff]",
      image: "/placeholder.svg?height=387&width=407",
      highlight: "Better client relationships equals more work and income. It's that easy."
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect()
        const scrollPosition = window.innerHeight - top
        const stepHeight = height / steps.length
        const currentStep = Math.floor(scrollPosition / stepHeight)
        setActiveStep(Math.max(0, Math.min(currentStep, steps.length - 1)))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [steps.length])

  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20  bg-gradient-to-b to-gray-50 from-cyan-400/10" ref={sectionRef}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-slate-950 text-[2.5rem] md:text-[2.9rem] font-medium font-['Inter'] leading-tight mb-16"
      >
        See how it works.
      </motion.h2>

      <div className="relative" ref={containerRef}>
        {/* Timeline connector */}
        <motion.div
          className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gray-400"
          style={{
            scaleY: scrollYProgress,
            transformOrigin: "top"
          }}
        />

        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <Card  className={`w-full max-w-[720px] h-auto sm:h-[380px] ${step.bgColor} rounded-[24px] sm:rounded-[36px] mx-auto relative`}>
                <motion.div
                  className="absolute inset-0"
                />
                <div className="absolute left-4 right-4 sm:-left-[155px] sm:right-auto top-4 sm:top-1/2 sm:-translate-y-1/2 max-w-[420px]">
                  {index % 2 === 0 && (
                    <StepContent
                      title={step.title}
                      description={step.description}
                      link={step.link}
                      additionalText={step.additionalText}
                      highlight={step.highlight}
                      isActive={activeStep !== index}
                    />
                  )}
                </div>

                <div className="absolute left-4 right-4 sm:-right-[155px] sm:left-auto bottom-4 sm:top-1/2 sm:-translate-y-1/2 max-w-[420px]">
                  {index % 2 === 1 && (
                    <StepContent
                      title={step.title}
                      description={step.description}
                      link={step.link}
                      additionalText={step.additionalText}
                      highlight={step.highlight}
                      isActive={activeStep !== index}
                    />
                  )}
                </div>

                {/* Number badge */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:translate-y-0 sm:top-6"
                  animate={{
                    scale: activeStep === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className={`text-[21px] font-medium ${step.numberColor}`}>
                      {step.number}
                    </span>
                  </div>
                </motion.div>

                {/* Placeholder for illustrations */}
                <div className="w-full h-full flex items-center justify-center opacity-20">
                  <Image
                    src={step.image}
                    alt=""
                    layout="responsive"
                    width={720}
                    height={380}
                    className="max-w-full h-auto"
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface StepContentProps {
  title: string
  description: string
  link?: {
    text: string
    color: string
  }
  additionalText?: string
  highlight?: string
  isActive: boolean
}

function StepContent({ title, description, link, additionalText, highlight, isActive }: StepContentProps) {
  return (
    <motion.div
      className="space-y-2 sm:space-y-4 p-4 sm:p-0 bg-white/80 sm:bg-transparent rounded-lg sm:rounded-none"
      animate={{
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl sm:text-2xl lg:text-[40px] font-medium text-slate-950 leading-tight sm:leading-[46px]">
        {title}
      </h3>
      <p className="text-base sm:text-md text-[#7b88a8] leading-relaxed">
        {description}
      </p>
      {additionalText && (
        <p className="text-base sm:text-lg text-[#7b88a8] leading-relaxed">
          {additionalText}
        </p>
      )}
      {link && (
        <a href="#" className={`text-base sm:text-lg ${link.color} hover:underline`}>
          {link.text}
        </a>
      )}
      {highlight && (
        <p className="text-base sm:text-lg text-[#05b184] font-bold leading-relaxed">
          {highlight}
        </p>
      )}
    </motion.div>
  )
}

