import { useState } from 'react'
import { UserIcon } from './UserIcon'
import { Button } from "@/components/ui/button"
import { Settings } from 'lucide-react'

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
    <div className="bg-gray-700 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <UserIcon src={user.avatar} alt={user.name} status={status} />
        <div>
          <h3 className="text-white font-semibold">{user.name}</h3>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as 'online' | 'away' | 'offline')}
            className="bg-gray-600 text-white text-sm rounded px-1 py-0.5"
          >
            <option value="online">Online</option>
            <option value="away">Away</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onOpenSettings}>
        <Settings size={20} className="text-gray-300" />
      </Button>
    </div>
  )
}

