import { useState } from 'react'
import { Hash, Lock, ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { UserStatus } from './UserStatus'

interface Channel {
  id: string
  name: string
  isPrivate: boolean
}

interface ChannelCategory {
  id: string
  name: string
  channels: Channel[]
}

interface ChannelListProps {
  categories: ChannelCategory[]
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

export function ChannelList({ categories, activeChannelId, onChannelClick, user, onOpenSettings }: ChannelListProps) {
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="bg-zinc-800 text-gray-300 w-full flex flex-col h-full">
      <div className="p-4 border-b border-zinc-700 font-semibold">Server Name</div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {categories.map((category) => (
            <div key={category.id} className="mb-4">
              <div 
                className="flex items-center justify-between px-2 mb-1 cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                <h3 className="text-xs font-semibold uppercase text-gray-400 flex items-center">
                  {collapsedCategories.includes(category.id) ? (
                    <ChevronRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  )}
                  {category.name}
                </h3>
                <Button variant="ghost" size="icon" className="h-4 w-4 text-gray-400 hover:text-gray-300">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              {!collapsedCategories.includes(category.id) && (
                <div>
                  {category.channels.map((channel) => (
                    <TooltipProvider key={channel.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => onChannelClick(channel.id)}
                            className={`w-full text-left flex items-center space-x-2 p-1 rounded transition-colors duration-200 text-sm ${
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
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <UserStatus user={user} onOpenSettings={onOpenSettings} />
    </div>
  )
}

