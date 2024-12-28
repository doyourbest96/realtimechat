import { useState } from 'react'
import { UserIcon } from './UserIcon'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus } from 'lucide-react'

interface DMUser {
  id: string
  name: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  unreadCount?: number
}

interface DMListProps {
  users: DMUser[]
  activeUserId: string | null
  onUserClick: (userId: string) => void
}

export function DMList({ users, activeUserId, onUserClick }: DMListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-zinc-800 text-gray-300 w-full flex flex-col h-full border-r border-zinc-700">
      <div className="p-4 border-b border-zinc-700 font-semibold">Direct Messages</div>
      <div className="p-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Find or start a conversation"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 text-gray-100 pl-8 pr-2 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => onUserClick(user.id)}
              className={`w-full text-left flex items-center space-x-2 p-2 rounded transition-colors duration-200 ${
                activeUserId === user.id 
                  ? 'bg-zinc-700 text-white' 
                  : 'hover:bg-zinc-700 hover:text-white'
              }`}
            >
              <UserIcon src={user.avatar} alt={user.name} status={user.status} size="sm" />
              <span className="truncate">{user.name}</span>
              {user.unreadCount && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {user.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-2 border-t border-zinc-700">
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Friend
        </Button>
      </div>
    </div>
  )
}

