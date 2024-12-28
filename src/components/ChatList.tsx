import { MessageGroup } from './MessageGroup'

interface Message {
  id: string
  userIcon: string
  username: string
  timestamp: string
  content: string
  status: 'online' | 'offline' | 'away'
  reactions: Array<{
    emoji: string
    count: number
    reacted: boolean
  }>
}

interface ChatListProps {
  messages?: Message[]
  onReact: (messageId: string, emoji: string) => void
  onEdit: (messageId: string, newContent: string) => void
  onDelete: (messageId: string) => void
}

export function ChatList({ messages = [], onReact, onEdit, onDelete }: ChatListProps) {
  // Group messages by user and time (within 5 minutes)
  const groupedMessages = messages.reduce((groups: Message[][], message) => {
    const lastGroup = groups[groups.length - 1]
    const lastMessage = lastGroup?.[lastGroup.length - 1]

    if (
      lastMessage &&
      lastMessage.username === message.username &&
      Math.abs(new Date(lastMessage.timestamp).getTime() - new Date(message.timestamp).getTime()) < 300000
    ) {
      lastGroup.push(message)
    } else {
      groups.push([message])
    }
    return groups
  }, [])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {groupedMessages.map((group, index) => (
        <MessageGroup
          key={`${group[0].id}-${index}`}
          userIcon={group[0].userIcon}
          username={group[0].username}
          timestamp={group[0].timestamp}
          messages={group}
          status={group[0].status}
          onReact={onReact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

