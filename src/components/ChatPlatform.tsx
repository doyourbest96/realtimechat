import { useState, useEffect } from 'react'
import { ServerList } from './ServerList'
import { ChannelList } from './ChannelList'
import { DMList } from './DMList'
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
    id: '1',
    name: 'General',
    channels: [
      { id: '1', name: 'general', isPrivate: false },
      { id: '2', name: 'random', isPrivate: false },
      { id: '3', name: 'announcements', isPrivate: false },
    ]
  },
  {
    id: '2',
    name: 'Projects',
    channels: [
      { id: '4', name: 'project-a', isPrivate: true },
      { id: '5', name: 'project-b', isPrivate: true },
    ]
  },
  {
    id: '3',
    name: 'Off-Topic',
    channels: [
      { id: '6', name: 'memes', isPrivate: false },
      { id: '7', name: 'music', isPrivate: false },
    ]
  }
]

// DM users data
const dmUsers = [
  { id: 'dm1', name: 'Alice', avatar: 'https://source.unsplash.com/random/80x80?sig=11&portrait', status: 'online' as const, unreadCount: 2 },
  { id: 'dm2', name: 'Bob', avatar: 'https://source.unsplash.com/random/80x80?sig=12&portrait', status: 'away' as const },
  { id: 'dm3', name: 'Charlie', avatar: 'https://source.unsplash.com/random/80x80?sig=13&portrait', status: 'offline' as const },
  { id: 'dm4', name: 'David', avatar: 'https://source.unsplash.com/random/80x80?sig=14&portrait', status: 'online' as const, unreadCount: 1 },
  { id: 'dm5', name: 'Eve', avatar: 'https://source.unsplash.com/random/80x80?sig=15&portrait', status: 'away' as const },
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
      reactions: i % 3 === 0 ? [{ emoji: '👍', count: 2, reacted: false }] : []
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
  const [activeDMUserId, setActiveDMUserId] = useState<string | null>(null)
  const [showChannels, setShowChannels] = useState(true)
  const [showMembers, setShowMembers] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [isDMView, setIsDMView] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    id: 'current',
    name: 'Current User',
    avatar: 'https://source.unsplash.com/random/80x80?sig=21&portrait',
    status: 'online' as const
  })
  const [chatMessages, setChatMessages] = useState(messages)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleChannels = () => setShowChannels(!showChannels)
  const toggleMembers = () => {
    if (isMobile) {
      setShowMembers(!showMembers);
      if (showChannels) setShowChannels(false);
    } else {
      setShowMembers(!showMembers);
    }
  }
  const openSettings = () => setShowSettings(true)
  const closeSettings = () => setShowSettings(false)

  const handleSaveSettings = (name: string, avatar: string) => {
    setCurrentUser(prev => ({ ...prev, name, avatar }))
  }

  const toggleDMView = () => {
    setIsDMView(!isDMView)
    if (!isDMView) {
      setActiveDMUserId(null)
    } else {
      setActiveServerId(servers[0].id)
      setActiveChannelId(categories[0].channels[0].id)
    }
  }

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      userIcon: currentUser.avatar,
      username: currentUser.name,
      timestamp: new Date().toISOString(),
      content,
      status: currentUser.status,
      reactions: []
    }
    setChatMessages(prev => [...prev, newMessage])
  }

  const handleReact = (messageId: string, emoji: string) => {
    setChatMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji)
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions?.map(r => r.emoji === emoji ? { ...r, count: r.count + 1, reacted: true } : r)
          }
        } else {
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { emoji, count: 1, reacted: true }]
          }
        }
      }
      return msg
    }))
  }

  const handleEdit = (messageId: string, newContent: string) => {
    setChatMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, content: newContent } : msg
    ))
  }

  const handleDelete = (messageId: string) => {
    setChatMessages(prev => prev.filter(msg => msg.id !== messageId))
  }

  const activeServer = servers.find(s => s.id === activeServerId)
  const activeChannel = categories.flatMap(c => c.channels).find(c => c.id === activeChannelId)
  const activeDMUser = dmUsers.find(u => u.id === activeDMUserId)

  return (
    <div className="flex h-screen bg-zinc-900 text-gray-100 min-w-[320px]">
      <ServerList
        servers={servers}
        activeServerId={activeServerId}
        onServerClick={(id) => {
          setActiveServerId(id)
          setIsDMView(false)
        }}
        onDMClick={toggleDMView}
      />
      <div className={`${showChannels ? 'flex' : 'hidden'} md:flex flex-col flex-shrink-0 w-60`}>
        {isDMView ? (
          <DMList
            users={dmUsers}
            activeUserId={activeDMUserId}
            onUserClick={setActiveDMUserId}
          />
        ) : (
          <ChannelList
            categories={categories}
            activeChannelId={activeChannelId}
            onChannelClick={setActiveChannelId}
            user={currentUser}
            onOpenSettings={openSettings}
          />
        )}
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-zinc-800 border-b border-zinc-700 shadow-md p-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleChannels} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              {isDMView ? (
                activeDMUser && (
                  <>
                    <UserIcon src={activeDMUser.avatar} alt={activeDMUser.name} status={activeDMUser.status} size="sm" />
                    <h1 className="text-lg font-semibold">{activeDMUser.name}</h1>
                  </>
                )
              ) : (
                <>
                  <Hash className="h-5 w-5 text-gray-400" />
                  <h1 className="text-lg font-semibold">{activeChannel?.name || 'Select a channel'}</h1>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Pin className="h-5 w-5" />
            </Button>
            {!isDMView && (
              <Button variant="ghost" size="icon" onClick={toggleMembers}>
                <Users className="h-5 w-5" />
              </Button>
            )}
            <div className="relative hidden md:block">
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
            <ChatList
              messages={chatMessages}
              onReact={handleReact}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
          {!isDMView && (
            <div className={`${showMembers ? 'flex' : 'hidden'} md:flex flex-col flex-shrink-0 w-60 ${isMobile ? 'absolute right-0 top-0 bottom-0 z-10' : ''}`}>
              <MemberList members={members} />
            </div>
          )}
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

