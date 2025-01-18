import { StickyScroll } from "@/components/landing/sticky-scroll-reveal";

const content = [
    {
        title: "Step 1",
        description: "Create a profile",
        content: <div>Step 1</div>
    },
    {
        title: "Step 2",
        description: "Go to patients and select a patient",
        content: <div>Step 2</div>
    },
    {
        title: "Step 3",
        description: "Accept the patient",
        content: <div>Step 3</div>
    },
    {
        title: "Step 4",
        description: "See AI analysed submissions and give consulatation",
        content: <div>Step 4</div>
    }
]

export const HowItWorks2 = () => {
  return <StickyScroll content={content} />;
};
