import { UserIcon } from './UserIcon'

interface ChatItemProps {
  userIcon: string
  username: string
  date: string
  content: string
  status: 'online' | 'offline' | 'away'
}

export function ChatItem({ userIcon, username, date, content, status }: ChatItemProps) {
  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <UserIcon src={userIcon} alt={username} status={status} />
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 truncate">{username}</h3>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <p className="mt-1 text-gray-700 break-words">{content}</p>
      </div>
    </div>
  )
}

