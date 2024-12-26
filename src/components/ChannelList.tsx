import { Hash, Lock } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Channel {
  id: string
  name: string
  isPrivate: boolean
}

interface ChannelListProps {
  channels: Channel[]
  activeChannelId: string
  onChannelClick: (channelId: string) => void
}

export function ChannelList({ channels, activeChannelId, onChannelClick }: ChannelListProps) {
  return (
    <div className="bg-gray-800 text-gray-300 w-64 p-4 space-y-2 overflow-y-auto h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-100 px-2">Channels</h2>
      {channels.map((channel) => (
        <TooltipProvider key={channel.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onChannelClick(channel.id)}
                className={`w-full text-left flex items-center space-x-2 p-2 rounded transition-colors duration-200 ${
                  activeChannelId === channel.id 
                    ? 'bg-gray-700 text-white' 
                    : 'hover:bg-gray-700 hover:text-white'
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
  )
}

