import Image from 'next/image'
import { QuoteIcon, UserIcon } from 'lucide-react'

interface FeatureCard {
  title: string
  description: string
  video: string
  href: string
}

const features: FeatureCard[] = [
  {
    title: "AI analysis",
    description: "Anaylses images uploaded by users and provides a detailed report",
    video: "https://cdn-crayo.com/lp/public/textClip.mp4",
    href: "#"
  },
  {
    title: "Efficient chat",
    description: "Fast and efficient chat system for doctor to communicate with patients",
    video: "https://cdn-crayo.com/lp/public/clip2.mp4",
    href: "#"
  },
  {
    title: "Choose your patient",
    description: "Doctors have to choose between patients to provide consultation",
    video: "https://cdn-crayo.com/lp/public/clip1.mp4",
    href: "#"
  },
]

const FeatureCard = ({ title, description, video, href }: FeatureCard) => (
  <div 
    className="duration-400 group mx-2 w-[260px] flex-shrink-0 space-y-2 rounded-3xl px-4 py-2 text-start transition-all hover:bg-gray-100/10" 
  >
    <video 
      muted 
      width="268" 
      height="475" 
      className="h-auto w-full max-w-[268px] rounded-3xl" 
      loop 
      playsInline 
      autoPlay 
      webkit-playsinline=""
    >
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="flex flex-col items-center space-y-2">
      <div className="flex w-full flex-row items-center space-x-2">
        <h4 className="font-regular mt-2 text-xl text-gray-900">{title}</h4>
      </div>
      <p className="pb-2 text-base font-medium leading-[120%] text-gray-500">
        {description}
      </p>
    </div>
  </div>
)



export function DemoSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 via-cyan-400/10 to-gray-50">
      <div className="container px-4 md:px-6 mx-auto max-w-[1424px]">
      <h2 className="text-center text-slate-950 text-2xl md:text-5xl lg:text-4xl font-medium font-['Inter'] leading-tight md:leading-[67.20px] mb-5 md:mb-[26px]">
          Get variety of services  <br /> 
          <span className='text-orange-400'>in seconds</span>
          </h2>
        
        <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-y-0 lg:space-y-0 items-center">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
