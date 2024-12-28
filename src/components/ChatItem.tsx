import { UserIcon } from './UserIcon'
import { MessageCircle, Image, File, Link, Smile, ThumbsUp } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChatItemProps {
  userIcon: string
  username: string
  date: string
  content: string
  status: 'online' | 'offline' | 'away'
}

const messageIcons = [MessageCircle, Image, File, Link, Smile, ThumbsUp]

export function ChatItem({ userIcon, username, date, content, status }: ChatItemProps) {
  const RandomIcon = messageIcons[Math.floor(Math.random() * messageIcons.length)]

  return (
    <div className="flex items-start space-x-4 px-4 py-2 hover:bg-zinc-800/50 rounded transition-colors duration-200">
      <UserIcon src={userIcon} alt={username} status={status} />
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 truncate">{username}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm text-gray-500 cursor-help">{date}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Message sent on {date}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="mt-1 text-gray-300 break-words flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <RandomIcon size={16} className="mr-2 flex-shrink-0" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Message type: {RandomIcon.displayName}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {content}
        </p>
      </div>
    </div>
  )
}

