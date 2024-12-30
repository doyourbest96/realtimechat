import { useState } from 'react'
import { UserIcon } from './UserIcon'
import { Button } from "./ui/button"
import { Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface UserStatusProps {
  user: {
    id: string
    name: string
    avatar: string
    status: 'online' | 'away' | 'offline'
  }
  onOpenSettings: () => void
}

export function UserStatus({ user, onOpenSettings }: UserStatusProps) {
  const [status, setStatus] = useState<'online' | 'away' | 'offline'>(user.status)

  const handleStatusChange = (newStatus: 'online' | 'away' | 'offline') => {
    setStatus(newStatus)
    // Here you would typically update the status on the server
  }

  return (
    <div className="bg-zinc-900 p-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <UserIcon src={user.avatar} alt={user.name} status={status} />
        <div>
          <h3 className="text-sm font-semibold text-gray-200">{user.name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-gray-400 hover:text-gray-200">
                {status === 'online' ? 'Online' : status === 'away' ? 'Away' : 'Offline'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange('online')}>Online</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('away')}>Away</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('offline')}>Offline</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onOpenSettings}>
        <Settings size={20} className="text-gray-400" />
      </Button>
    </div>
  )
}

