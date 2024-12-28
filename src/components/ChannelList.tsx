import { Hash, Lock } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UserStatus } from './UserStatus'

interface Channel {
  id: string
  name: string
  isPrivate: boolean
}

interface ChannelListProps {
  channels: Channel[]
  activeChannelId: string
  onChannelClick: (channelId: string) => void
  user: {
    id: string
    name: string
    avatar: string
    status: 'online' | 'away' | 'offline'
  }
  onOpenSettings: () => void
}

export function ChannelList({ channels, activeChannelId, onChannelClick, user, onOpenSettings }: ChannelListProps) {
  return (
    <div className="bg-zinc-800 text-gray-300 w-full flex flex-col h-full border-r border-zinc-700">
      <div className="p-2 md:p-4 flex-1 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-100 px-2">Channels</h2>
        {channels.map((channel) => (
          <TooltipProvider key={channel.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChannelClick(channel.id)}
                  className={`w-full text-left flex items-center space-x-2 p-1 md:p-2 rounded transition-colors duration-200 text-sm md:text-base ${
                    activeChannelId === channel.id 
                      ? 'bg-zinc-700 text-white' 
                      : 'hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  {channel.isPrivate ? <Lock size={18} /> : <Hash size={18} />}
                  <span className="truncate">{channel.name}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{channel.isPrivate ? 'Private' : 'Public'} channel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <UserStatus user={user} onOpenSettings={onOpenSettings} />
    </div>
  )
}

