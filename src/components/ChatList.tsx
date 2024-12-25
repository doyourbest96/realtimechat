import { ChatItem } from './ChatItem'

interface Message {
  id: string
  userIcon: string
  username: string
  date: string
  content: string
  status: 'online' | 'offline' | 'away'
}

interface ChatListProps {
  messages: Message[]
}

export function ChatList({ messages }: ChatListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatItem key={message.id} {...message} />
      ))}
    </div>
  )
}

