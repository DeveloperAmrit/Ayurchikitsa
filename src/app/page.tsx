import { Navbar, Hero, DemoSection, FeaturesSection2, HowItWorks2 } from "@/components";
import { FAQSection } from "@/components/landing/faq-section";
import Link from "next/link";

export default function Home() {
  return (
    <main className="justify-center flex flex-col items-center">
      <Hero />
      {/* <FeatureEnabled featureFlag="DEMO_SECTION"> */}
        <DemoSection />
      {/* </FeatureEnabled> */}
      {/* <HowItWorks /> */}
      {/* <FeatureEnabled featureFlag="HOW_IT_WORKS_2"> */}
        <HowItWorks2 />
      {/* </FeatureEnabled> */}
      {/* <FeatureEnabled featureFlag="FEATURES_SECTION_2"> */}
        {/* <FeaturesSection2 /> */}
      {/* </FeatureEnabled> */}
      {/* <FeatureEnabled featureFlag="FEATURES_SECTION">
        <FeaturesSection />
      </FeatureEnabled> */}
      <FAQSection />
      <div className="w-full flex-col justify-center items-center flex p-4 mt-48">
        <div className="w-full p-4 py-8 md:py-12 flex-col justify-center items-center gap-[15px] flex bg-orange-100 rounded-xl md:rounded-[2rem]">
          <div className="w-full px-4 md:px-20 lg:px-32 flex-col justify-start items-center gap-2.5 flex">
            <div className="text-center text-black text-2xl md:text-3xl lg:text-5xl font-normal font-['Inter'] leading-normal md:leading-[57.60px]">
              Ready to get started?
            </div>
            <div className="text-center text-slate-700 text-lg md:text-xl lg:text-2xl font-normal font-['Inter'] leading-relaxed md:leading-9">
              Engage with your patients in a whole new way.
            </div>
          </div>
          <Link href="/#hero" className="h-10 px-4 md:px-6 lg:px-8 py-2 bg-white rounded-lg shadow justify-center items-center inline-flex hover:bg-gray-100 transition-colors">
            <div className="text-center text-slate-900 text-sm font-normal font-['Inter']">
              Get Access
            </div>
          </Link>
        </div>
      </div>

    </main>
  );
}
