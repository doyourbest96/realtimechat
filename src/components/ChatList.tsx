'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageGroup } from './MessageGroup'
import { Button } from "@/components/ui/button"
import { ArrowDown } from 'lucide-react'

interface Message {
  id: string
  userIcon: string
  username: string
  timestamp: string
  content: string
  status: 'online' | 'offline' | 'away'
  reactions?: Array<{
    emoji: string
    count: number
    reacted: boolean
  }>
}

interface ChatListProps {
  messages: Message[]
}

export function ChatList({ messages }: ChatListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100)
    }

    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  // Group messages by user and time (within 5 minutes)
  const groupedMessages = messages.reduce((groups: Message[][], message) => {
    const lastGroup = groups[groups.length - 1]
    const lastMessage = lastGroup?.[lastGroup.length - 1]

    if (
      lastMessage &&
      lastMessage.username === message.username &&
      Math.abs(new Date(lastMessage.timestamp).getTime() - new Date(message.timestamp).getTime()) < 300000
    ) {
      lastGroup.push(message)
    } else {
      groups.push([message])
    }
    return groups
  }, [])

  return (
    <div className="relative flex-1 overflow-hidden">
      <div ref={scrollRef} className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="pt-4 pb-4">
          {groupedMessages.map((group, index) => (
            <MessageGroup
              key={group[0].id}
              userIcon={group[0].userIcon}
              username={group[0].username}
              timestamp={group[0].timestamp}
              messages={group.map(m => ({
                id: m.id,
                content: m.content,
                timestamp: m.timestamp,
                reactions: m.reactions
              }))}
              status={group[0].status}
            />
          ))}
        </div>
      </div>
      {showScrollButton && (
        <div className="absolute bottom-4 right-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg"
            onClick={scrollToBottom}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

