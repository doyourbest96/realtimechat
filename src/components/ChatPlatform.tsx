import { useState } from 'react'
import { ServerList } from './ServerList'
import { ChannelList } from './ChannelList'
import { ChatList } from './ChatList'
import { MemberList } from './MemberList'
import { UserIcon } from './UserIcon'
import { UserSettings } from './UserSettings'
import { MessageInput } from './MessageInput'
import { Bell, Hash, Pin, Users, Search, Inbox, MessageCircleQuestionIcon as QuestionMarkCircle, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Server data
const servers = [
  { id: '1', name: 'General', icon: 'https://source.unsplash.com/random/80x80?sig=1&icon' },
  { id: '2', name: 'Development', icon: 'https://source.unsplash.com/random/80x80?sig=2&code' },
  { id: '3', name: 'Design', icon: 'https://source.unsplash.com/random/80x80?sig=3&design' },
  { id: '4', name: 'Marketing', icon: 'https://source.unsplash.com/random/80x80?sig=4&marketing' },
  { id: '5', name: 'Support', icon: 'https://source.unsplash.com/random/80x80?sig=5&support' },
]

// Channel data
const categories = [
  {
    name: 'General',
    channels: [
      { id: '1', name: 'general', isPrivate: false },
      { id: '2', name: 'random', isPrivate: false },
      { id: '3', name: 'announcements', isPrivate: false },
    ]
  },
  {
    name: 'Projects',
    channels: [
      { id: '4', name: 'project-a', isPrivate: true },
      { id: '5', name: 'project-b', isPrivate: true },
    ]
  },
  {
    name: 'Off-Topic',
    channels: [
      { id: '6', name: 'memes', isPrivate: false },
      { id: '7', name: 'music', isPrivate: false },
    ]
  }
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
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      content: `This is message number ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      status: statuses[i % 3] as 'online' | 'offline' | 'away',
      reactions: i % 3 === 0 ? [{ emoji: '👍', count: 2, reacted: false }] : undefined
    })
  }
  return messages
}

const messages = generateMessages(50)

const members = [
  { id: '1', name: 'Alice', status: 'online' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=11&portrait', role: 'admin' },
  { id: '2', name: 'Bob', status: 'away' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=12&portrait', role: 'moderator' },
  { id: '3', name: 'Charlie', status: 'offline' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=13&portrait' },
  { id: '4', name: 'David', status: 'online' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=14&portrait' },
  { id: '5', name: 'Eve', status: 'away' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=15&portrait' },
]

export function ChatPlatform() {
  const [activeServerId, setActiveServerId] = useState(servers[0].id)
  const [activeChannelId, setActiveChannelId] = useState(categories[0].channels[0].id)
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

  const activeServer = servers.find(s => s.id === activeServerId)
  const activeChannel = categories.flatMap(c => c.channels).find(c => c.id === activeChannelId)

  return (
    <div className="flex h-screen bg-zinc-900 text-gray-100 min-w-[320px]">
      <ServerList 
        servers={servers} 
        activeServerId={activeServerId} 
        onServerClick={setActiveServerId} 
      />
      <div className={`${showChannels ? 'flex' : 'hidden'} md:flex flex-col flex-shrink-0 w-60`}>
        <ChannelList
          categories={categories}
          activeChannelId={activeChannelId}
          onChannelClick={setActiveChannelId}
          user={currentUser}
          onOpenSettings={openSettings}
        />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-zinc-800 border-b border-zinc-700 shadow-md p-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleChannels} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Hash className="h-5 w-5 text-gray-400" />
              <h1 className="text-lg font-semibold">{activeChannel?.name || 'Select a channel'}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Pin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMembers}>
              <Users className="h-5 w-5" />
            </Button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-zinc-900 text-gray-100 pl-8 pr-2 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon">
              <Inbox className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <QuestionMarkCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-hidden flex flex-col">
            <ChatList messages={messages} />
            <MessageInput />
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

