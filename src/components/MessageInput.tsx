'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle, Smile, Gift, ImagePlus } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const EMOJI_CATEGORIES = {
  '😀': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊'],
  '❤️': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤'],
  '👍': ['👍', '👎', '👊', '✊', '🤛', '🤜', '🤝', '👏'],
  '🎮': ['🎮', '🎲', '🎯', '🎳', '🎪', '🎨', '🎭', '🎪'],
}

export function MessageInput() {
  const [message, setMessage] = useState('')
  const [isComposing, setIsComposing] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault()
      // Handle message send
      setMessage('')
    }
  }

  return (
    <div className="p-4 bg-zinc-800 border-t border-zinc-700">
      <div className="flex items-start gap-2">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300 mt-2">
          <PlusCircle className="h-5 w-5" />
        </Button>
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder="Message #general-chat"
            className="w-full px-4 py-2 bg-zinc-900 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[44px] max-h-[200px] resize-none"
            style={{ overflow: 'hidden' }}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
              <Gift className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
              <ImagePlus className="h-5 w-5" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 bg-zinc-900 rounded-lg">
                  <div className="grid grid-cols-8 gap-2">
                    {Object.values(EMOJI_CATEGORIES).flat().map((emoji) => (
                      <button
                        key={emoji}
                        className="p-1 hover:bg-zinc-800 rounded"
                        onClick={() => setMessage(prev => prev + emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-400">
        Press <kbd className="px-1.5 py-0.5 bg-zinc-700 rounded text-xs">Enter</kbd> to send,{' '}
        <kbd className="px-1.5 py-0.5 bg-zinc-700 rounded text-xs">Shift + Enter</kbd> for new line
      </div>
    </div>
  )
}

