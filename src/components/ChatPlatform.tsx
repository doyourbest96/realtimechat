import { useState } from 'react'
import { ServerList } from './ServerList'
import { ChatList } from './ChatList'
import { MemberList } from './MemberList'

// More dummy data
const servers = [
  { id: '1', name: 'General', icon: '/placeholder.svg?height=48&width=48&text=G' },
  { id: '2', name: 'Development', icon: '/placeholder.svg?height=48&width=48&text=D' },
  { id: '3', name: 'Design', icon: '/placeholder.svg?height=48&width=48&text=D' },
  { id: '4', name: 'Marketing', icon: '/placeholder.svg?height=48&width=48&text=M' },
  { id: '5', name: 'Support', icon: '/placeholder.svg?height=48&width=48&text=S' },
]

const generateMessages = (count: number) => {
  const messages = []
  const statuses = ['online', 'offline', 'away']
  for (let i = 1; i <= count; i++) {
    messages.push({
      id: i.toString(),
      userIcon: `/placeholder.svg?height=40&width=40&text=U${i}`,
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
  { id: '1', name: 'Alice', status: 'online' as const, avatar: '/placeholder.svg?height=40&width=40&text=A' },
  { id: '2', name: 'Bob', status: 'away' as const, avatar: '/placeholder.svg?height=40&width=40&text=B' },
  { id: '3', name: 'Charlie', status: 'offline' as const, avatar: '/placeholder.svg?height=40&width=40&text=C' },
  { id: '4', name: 'David', status: 'online' as const, avatar: '/placeholder.svg?height=40&width=40&text=D' },
  { id: '5', name: 'Eve', status: 'away' as const, avatar: '/placeholder.svg?height=40&width=40&text=E' },
  { id: '6', name: 'Frank', status: 'online' as const, avatar: '/placeholder.svg?height=40&width=40&text=F' },
  { id: '7', name: 'Grace', status: 'offline' as const, avatar: '/placeholder.svg?height=40&width=40&text=G' },
  { id: '8', name: 'Henry', status: 'online' as const, avatar: '/placeholder.svg?height=40&width=40&text=H' },
  { id: '9', name: 'Ivy', status: 'away' as const, avatar: '/placeholder.svg?height=40&width=40&text=I' },
  { id: '10', name: 'Jack', status: 'offline' as const, avatar: '/placeholder.svg?height=40&width=40&text=J' },
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
          <h1 className="text-2xl font-bold">{servers.find(s => s.id === activeServerId)?.name || 'Chat Platform'}</h1>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <ChatList messages={messages} />
          <MemberList members={members} />
        </div>
      </div>
    </div>
  )
}

