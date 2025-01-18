import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorks() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map((step, index) => (
        <Card key={index} className="relative">
          <div className="absolute top-0 left-0 w-8 h-8 bg-primary text-primary-foreground rounded-tl-lg rounded-br-lg flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <CardHeader>
            <CardTitle>{step.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{step.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const steps = [
  {
    title: "Capture",
    description: "Take high-quality images or videos of your face and nails using our guided capture system."
  },
  {
    title: "Analyze",
    description: "Our AI processes the images locally, extracting key features related to your health."
  },
  {
    title: "Enhance",
    description: "Cloud-based advanced analysis provides deeper insights into your health patterns."
  },
  {
    title: "Personalize",
    description: "Receive tailored health insights and recommendations based on your unique profile."
  }
]

