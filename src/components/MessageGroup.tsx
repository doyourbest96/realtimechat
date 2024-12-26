import { UserIcon } from './UserIcon'
import { Button } from "@/components/ui/button"
import { Smile, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  content: string
  timestamp: string
  reactions?: Array<{
    emoji: string
    count: number
    reacted: boolean
  }>
}

interface MessageGroupProps {
  userIcon: string
  username: string
  timestamp: string
  messages: Message[]
  status: 'online' | 'offline' | 'away'
}

export function MessageGroup({ userIcon, username, timestamp, messages, status }: MessageGroupProps) {
  return (
    <div className="group px-4 py-2 hover:bg-zinc-800/50 relative flex gap-4">
      <div className="flex-shrink-0 pt-0.5">
        <UserIcon src={userIcon} alt={username} status={status} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-100 hover:underline cursor-pointer">
            {username}
          </span>
          <span className="text-xs text-gray-400">{timestamp}</span>
        </div>
        {messages.map((message) => (
          <div key={message.id} className="relative group/message">
            <p className="text-gray-300 mt-1">{message.content}</p>
            
            <div className="absolute right-0 top-0 hidden group-hover/message:flex items-center gap-1 bg-zinc-800 rounded-md p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-gray-300"
              >
                <Smile className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-gray-300"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Message</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Delete Message</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {message.reactions && message.reactions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {message.reactions.map((reaction, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-sm ${
                      reaction.reacted
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300'
                    }`}
                  >
                    <span>{reaction.emoji}</span>
                    <span className="text-xs">{reaction.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

