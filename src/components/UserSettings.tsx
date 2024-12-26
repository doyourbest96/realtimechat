import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserIcon } from './UserIcon'

interface UserSettingsProps {
  user: {
    id: string
    name: string
    avatar: string
  }
  onClose: () => void
  onSave: (name: string, avatar: string) => void
}

export function UserSettings({ user, onClose, onSave }: UserSettingsProps) {
  const [name, setName] = useState(user.name)
  const [avatar, setAvatar] = useState(user.avatar)

  const handleSave = () => {
    onSave(name, avatar)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">User Settings</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Enter avatar URL"
            />
          </div>
          <div className="flex justify-center">
            <UserIcon src={avatar} alt={name} status="online" />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  )
}

