'use client'

import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { subscribeUser } from '@/actions'
import { SafariMockup } from '../safari-mockup'

export function Hero() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      await subscribeUser(formData)
      setIsSuccess(true)
    } catch (error) {
      // Handle error
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 relative" id="hero">
      {/* <div className='absolute h-[32rem] bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div> */}
      
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[5rem]">
          Welcome to<br />
          <span className="text-orange-400">Ayurchikitsa</span> health care
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Interact with your patient with more effiicient way along with AI integrated health care system.
        </p>
        {isSuccess ? (
          <div className="flex items-center gap-2 text-green-600">
            <Check className="w-6 h-6" />
            <span>Thanks for subscribing!</span>
          </div>
        ) : (
            <Button 
              type="submit" 
              variant="default" 
              className="bg-black hover:bg-black/90 min-w-24"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loader w-4 h-4"></span>
                </>
              ) : (
                'Sign up'
              )}
            </Button>
        )}
        {/* <div className="relative w-full max-w-2xl h-[400px] mt-8">
          <Image
            src="https://framerusercontent.com/images/k2Lj2Kdwzj8butLpGw3tH9ZDtFQ.png?scale-down-to=1024"
            alt="Article to video conversion illustration"
            fill
            className="object-contain"
            priority
          />
        </div> */}
        <SafariMockup />
      </div>
    </div>
  )
}
