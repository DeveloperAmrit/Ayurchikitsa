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
    title: "Fake text video",
    description: "Create text conversation shorts",
    video: "https://cdn-crayo.com/lp/public/textClip.mp4",
    href: "#"
  },
  {
    title: "Reddit convo video",
    description: "Create fictional Reddit-story shorts",
    video: "https://cdn-crayo.com/lp/public/clip2.mp4",
    href: "#"
  },
  {
    title: "Split-screen video",
    description: "Create split-screen shorts with gameplay",
    video: "https://cdn-crayo.com/lp/public/clip1.mp4",
    href: "#"
  },
]

const FeatureCard = ({ title, description, video, href }: FeatureCard) => (
  <a 
    className="duration-400 group mx-2 w-[260px] flex-shrink-0 space-y-2 rounded-3xl px-4 py-2 text-start transition-all hover:bg-gray-100/10" 
    href={href}
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
        <Image 
          alt="arrow" 
          width={100} 
          height={100} 
          className="h-5 w-3 transform pt-2 transition-all duration-300 ease-in-out group-hover:translate-x-2" 
          src="/rightArrow.png"
        />
      </div>
      <p className="pb-2 text-base font-medium leading-[120%] text-gray-500">
        {description}
      </p>
    </div>
  </a>
)

const Testimonial = () => (
  <div className="max-w-4xl mx-auto text-center relative mt-32 flex flex-col items-center">
    <QuoteIcon className="absolute -top-8 -left-8 opacity-40 text-gray-400" />
    <blockquote className="text-gray-900 text-[1.25rem] font-semibold leading-[2.2rem] mb-12 max-w-2xl text-center">
      I&apos;ve clipped for some of the biggest creators on the internet. ViralReel AI is the tool I wish I had when I started.
    </blockquote>
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border border-gray-200 overflow-hidden mr-4">
        <UserIcon className="w-full h-full text-gray-600" />
      </div>
      <div className="text-left">
        <div className="text-gray-900 text-lg font-bold leading-[27px]">
          Priyanshu Saini <span className="font-normal text-gray-600">— Co-Founder, ViralReel AI</span>
        </div>
        <div className="text-gray-500 text-base font-normal">
          Clipped for 100+ creators
        </div>
      </div>
    </div>
  </div>
)

export function DemoSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 via-cyan-400/10 to-gray-50 mt-48">
      <div className="container px-4 md:px-6 mx-auto max-w-[1424px]">
      <h2 className="text-center text-slate-950 text-2xl md:text-5xl lg:text-4xl font-medium font-['Inter'] leading-tight md:leading-[67.20px] mb-5 md:mb-[26px]">
          Create variety of shorts  <br /> 
          <span className='text-orange-400'>in seconds</span>
          </h2>
        
        <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-y-0 lg:space-y-0 items-center">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <Testimonial />
      </div>
    </section>
  )
}
