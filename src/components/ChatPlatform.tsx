import { useState } from 'react'
import { ServerList } from './ServerList'
import { ChannelList } from './ChannelList'
import { ChatList } from './ChatList'
import { MemberList } from './MemberList'
import { UserIcon } from './UserIcon'
import { UserSettings } from './UserSettings'
import { Menu, Users, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Server data
const servers = [
  { id: '1', name: 'General', icon: 'https://source.unsplash.com/random/80x80?sig=1&icon' },
  { id: '2', name: 'Development', icon: 'https://source.unsplash.com/random/80x80?sig=2&code' },
  { id: '3', name: 'Design', icon: 'https://source.unsplash.com/random/80x80?sig=3&design' },
  { id: '4', name: 'Marketing', icon: 'https://source.unsplash.com/random/80x80?sig=4&marketing' },
  { id: '5', name: 'Support', icon: 'https://source.unsplash.com/random/80x80?sig=5&support' },
  { id: '6', name: 'Coffee Break', icon: 'https://source.unsplash.com/random/80x80?sig=6&coffee' },
  { id: '7', name: 'Brainstorming', icon: 'https://source.unsplash.com/random/80x80?sig=7&idea' },
  { id: '8', name: 'Music', icon: 'https://source.unsplash.com/random/80x80?sig=8&music' },
  { id: '9', name: 'Photography', icon: 'https://source.unsplash.com/random/80x80?sig=9&camera' },
  { id: '10', name: 'Gaming', icon: 'https://source.unsplash.com/random/80x80?sig=10&game' },
]

// Channel data
const channels = [
  { id: '1', name: 'general', isPrivate: false },
  { id: '2', name: 'random', isPrivate: false },
  { id: '3', name: 'announcements', isPrivate: false },
  { id: '4', name: 'project-a', isPrivate: true },
  { id: '5', name: 'project-b', isPrivate: true },
  { id: '6', name: 'off-topic', isPrivate: false },
]

// Message and member data
const generateMessages = (count: number) => {
  const messages = []
  const statuses = ['online', 'offline', 'away']
  for (let i = 1; i <= count; i++) {
    messages.push({
      id: i.toString(),
      userIcon: `https://source.unsplash.com/random/80x80?sig=${i}&portrait`,
      username: `User ${i}`,
      date: new Date(Date.now() - i * 60000).toLocaleString(),
      content: `This is message number ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      status: statuses[i % 3] as 'online' | 'offline' | 'away',
    })
  }
  return messages
}

const messages = generateMessages(50)

const members = [
  { id: '1', name: 'Alice', status: 'online' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=11&portrait' },
  { id: '2', name: 'Bob', status: 'away' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=12&portrait' },
  { id: '3', name: 'Charlie', status: 'offline' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=13&portrait' },
  { id: '4', name: 'David', status: 'online' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=14&portrait' },
  { id: '5', name: 'Eve', status: 'away' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=15&portrait' },
  { id: '6', name: 'Frank', status: 'online' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=16&portrait' },
  { id: '7', name: 'Grace', status: 'offline' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=17&portrait' },
  { id: '8', name: 'Henry', status: 'online' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=18&portrait' },
  { id: '9', name: 'Ivy', status: 'away' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=19&portrait' },
  { id: '10', name: 'Jack', status: 'offline' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=20&portrait' },
]

export function ChatPlatform() {
  const [activeServerId, setActiveServerId] = useState(servers[0].id)
  const [activeChannelId, setActiveChannelId] = useState(channels[0].id)
  const [showChannels, setShowChannels] = useState(true)
  const [showMembers, setShowMembers] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    id: 'current',
    name: 'Current User',
    avatar: 'https://source.unsplash.com/random/80x80?sig=21&portrait',
    status: 'online' as const
  })

  const toggleChannels = () => setShowChannels(!showChannels)
  const toggleMembers = () => setShowMembers(!showMembers)
  const openSettings = () => setShowSettings(true)
  const closeSettings = () => setShowSettings(false)

  const handleSaveSettings = (name: string, avatar: string) => {
    setCurrentUser(prev => ({ ...prev, name, avatar }))
    // Here you would typically update the user data on the server
  }

  return (
    <div className="flex h-screen bg-gray-100 min-w-[320px]">
      <ServerList 
        servers={servers} 
        activeServerId={activeServerId} 
        onServerClick={setActiveServerId} 
      />
      <div className={`${showChannels ? 'flex' : 'hidden'} md:flex flex-col flex-shrink-0 w-56 md:w-64`}>
        <ChannelList
          channels={channels}
          activeChannelId={activeChannelId}
          onChannelClick={setActiveChannelId}
          user={currentUser}
          onOpenSettings={openSettings}
        />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-white shadow-md p-2 md:p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleChannels} className="md:hidden">
              {showChannels ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <h1 className="text-lg md:text-2xl font-bold flex items-center space-x-2">
              <UserIcon 
                src={servers.find(s => s.id === activeServerId)?.icon || ''} 
                alt={servers.find(s => s.id === activeServerId)?.name || 'Server Icon'} 
                size="sm"
              />
              <span>{servers.find(s => s.id === activeServerId)?.name || 'Chat Platform'}</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleChannels} className="hidden md:flex items-center space-x-1">
              <Menu size={16} />
              <span>{showChannels ? 'Hide' : 'Show'} Channels</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleMembers} className="hidden md:flex items-center space-x-1">
              <Users size={16} />
              <span>{showMembers ? 'Hide' : 'Show'} Members</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMembers} className="md:hidden">
              <Users size={24} />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ChatList messages={messages} />
          </div>
          <div className={`${showMembers ? 'flex' : 'hidden'} md:flex flex-col flex-shrink-0`}>
            <MemberList members={members} />
          </div>
        </div>
      </div>
      {showSettings && (
        <UserSettings
          user={currentUser}
          onClose={closeSettings}
          onSave={handleSaveSettings}
        />
      )}
    </div>
  )
}

