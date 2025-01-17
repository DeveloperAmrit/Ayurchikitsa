import { StickyScroll } from "@/components/landing/sticky-scroll-reveal";

const content = [
    {
        title: "Step 1",
        description: "Select a template",
        content: <div>Step 1</div>
    },
    {
        title: "Step 2",
        description: "Create content with AI",
        content: <div>Step 2</div>
    },
    {
        title: "Step 3",
        description: "Generate n number of videos",
        content: <div>Step 3</div>
    },
    {
        title: "Step 4",
        description: "Schedule video for months",
        content: <div>Step 4</div>
    }
]

export const HowItWorks2 = () => {
  return <StickyScroll content={content} />;
};
