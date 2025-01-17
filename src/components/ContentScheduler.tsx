'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContentScheduler } from '../hooks/useContentScheduler'
import { X, Clock, CalendarIcon, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function ContentScheduler() {
  const {
    contentItems,
    isSubmitting,
    addContentItem,
    removeContentItem,
    handleSubmit,
  } = useContentScheduler()

  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined)
  const [currentTime, setCurrentTime] = useState<string>('')

  const handleAddContent = () => {
    if (currentFile && currentDate && currentTime) {
      addContentItem(currentFile, currentDate, currentTime)
      setCurrentFile(null)
      setCurrentDate(undefined)
      setCurrentTime('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-3xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Content Scheduler</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="content" className="text-lg font-semibold">Upload Content</Label>
            <div className="mt-2 flex items-center space-x-2">
              <Input
                id="content"
                type="file"
                onChange={(e) => setCurrentFile(e.target.files?.[0] || null)}
                className="flex-grow"
              />
              <Upload className="text-gray-400" />
            </div>
          </div>
          <div>
            <Label className="text-lg font-semibold">Select Date & Time</Label>
            <div className="flex mt-2 space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !currentDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {currentDate ? format(currentDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={currentDate}
                    onSelect={setCurrentDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="relative">
                <Input
                  type="time"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(e.target.value)}
                  className="w-full"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="button" 
          onClick={handleAddContent}
          disabled={!currentFile || !currentDate || !currentTime}
          className="w-full"
        >
          Add Content
        </Button>

        {contentItems.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2 text-lg">Scheduled Content:</h3>
            <ul className="space-y-2">
              {contentItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm">
                  <span className="flex items-center space-x-2">
                    <Upload className="text-blue-500" />
                    <span>{item.file.name}</span>
                    <span className="text-gray-500">-</span>
                    <CalendarIcon className="text-green-500" />
                    <span>{format(item.date, "PPP")}</span>
                    <span className="text-gray-500">at</span>
                    <Clock className="text-purple-500" />
                    <span>{item.time}</span>
                  </span>
                  <Button 
                    size="icon"
                    variant="ghost"
                    onClick={() => removeContentItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={contentItems.length === 0 || isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? 'Scheduling...' : 'Schedule All Content'}
        </Button>
      </form>
    </div>
  )
}

