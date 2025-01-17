import { useState } from 'react'

interface ContentItem {
  id: string
  file: File
  date: Date
  time: string
}

export function useContentScheduler() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addContentItem = (file: File, date: Date, time: string) => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      file,
      date,
      time,
    }
    setContentItems(prev => [...prev, newItem])
  }

  const removeContentItem = (id: string) => {
    setContentItems(prev => prev.filter(item => item.id !== id))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Here you would typically send the contentItems to your backend

    // Reset form
    setContentItems([])
    setIsSubmitting(false)

    // Show success message (you can replace this with a toast notification)
    alert('Content scheduled successfully!')
  }

  return {
    contentItems,
    isSubmitting,
    addContentItem,
    removeContentItem,
    handleSubmit,
  }
}

