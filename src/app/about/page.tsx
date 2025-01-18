"use client"; // If you're using hooks or client-side logic
import { Metadata } from 'next'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import HowItWorks from '../components/how-it-works'
import TechStack from '../components/tech-stack'

// export const metadata: Metadata = {
//   title: 'About Ayur Chikitsa | Health Analysis and Evaluation System',
//   description: 'Learn about Ayur Chikitsa, our innovative health analysis system combining Ayurvedic wisdom with cutting-edge technology.',
// }

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Transforming Health Through Ayurveda and Innovation</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Bridging ancient wisdom with modern technology to empower your health journey.
        </p>
        <Image
          src="/placeholder.svg?height=400&width=800&text=Ayur+Chikitsa+Hero+Image"
          alt="Ayur Chikitsa - Blending Ayurveda and Technology"
          width={800}
          height={400}
          className="rounded-lg mx-auto"
        />
      </section>

      {/* Overview Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">About Ayur Chikitsa</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              Ayur Chikitsa is a revolutionary health analysis and evaluation system that seamlessly integrates the ancient wisdom of Ayurveda with cutting-edge technology. Our mission is to provide personalized, holistic health insights that empower individuals to take control of their well-being.
            </p>
            <p className="text-muted-foreground mb-4">
              By leveraging advanced image and video analysis techniques, Ayur Chikitsa addresses the growing need for accessible, non-invasive health assessments. We aim to bridge the gap between traditional Ayurvedic practices and modern healthcare, offering a unique solution that combines the best of both worlds.
            </p>
            <p className="text-muted-foreground">
              Through our innovative approach, we analyze facial features and nail characteristics to provide comprehensive health evaluations. This integration of Ayurvedic principles with state-of-the-art machine learning algorithms allows us to offer insights that are both deeply rooted in traditional knowledge and validated by modern science.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Key Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
        <HowItWorks />
      </section>

      {/* Technology Stack Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">Our Technology Stack</h2>
        <TechStack />
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Transform Your Health?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Experience the power of Ayur Chikitsa and embark on your personalized wellness journey today.
        </p>
        <Button size="lg">Get Started</Button>
      </section>
    </div>
  )
}

const features = [
  {
    title: "Advanced Image and Video Capture",
    description: "Utilize high-quality imaging technology to capture detailed facial and nail characteristics, with step-by-step guidance for optimal results."
  },
  {
    title: "Local Feature Extraction",
    description: "Employ on-device processing to analyze key health indicators from facial features and nail attributes, ensuring privacy and quick initial assessments."
  },
  {
    title: "Cloud-Powered Analysis",
    description: "Leverage cloud computing for in-depth, machine learning-based health analysis, providing comprehensive insights beyond surface-level observations."
  },
  {
    title: "Personalized Health Insights",
    description: "Receive tailored health recommendations based on your unique Ayurvedic constitution and current health status, delivered through an intuitive interface."
  },
  {
    title: "Expert Review System",
    description: "Connect with Ayurvedic practitioners through our platform for professional interpretation of results and personalized advice."
  },
  {
    title: "Longitudinal Health Tracking",
    description: "Monitor your health progress over time with our advanced time-series analysis, helping you visualize and understand long-term health trends."
  }
]

const values = [
  {
    title: "Holistic Wellness",
    description: "We believe in addressing health from a comprehensive perspective, considering the interconnectedness of mind, body, and spirit."
  },
  {
    title: "Innovation",
    description: "We continuously strive to push the boundaries of what's possible in health technology, blending ancient wisdom with cutting-edge advancements."
  },
  {
    title: "Empowerment",
    description: "We aim to equip individuals with the knowledge and tools they need to take control of their health and make informed decisions."
  }
]

