import { useState } from 'react'
import { ServerList } from './ServerList'
import { ChatList } from './ChatList'
import { MemberList } from './MemberList'
import { UserIcon } from './UserIcon'

// More dummy data with fresh image icons
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

  return (
    <div className="flex h-screen bg-gray-100">
      <ServerList 
        servers={servers} 
        activeServerId={activeServerId} 
        onServerClick={setActiveServerId} 
      />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md p-4 flex items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <UserIcon 
              src={servers.find(s => s.id === activeServerId)?.icon || ''} 
              alt={servers.find(s => s.id === activeServerId)?.name || 'Server Icon'} 
            />
            <span className="ml-2">{servers.find(s => s.id === activeServerId)?.name || 'Chat Platform'}</span>
          </h1>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <ChatList messages={messages} />
          <MemberList members={members} />
        </div>
      </div>
    </div>
  )
}

