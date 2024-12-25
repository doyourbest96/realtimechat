import { UserIcon } from './UserIcon'

interface Server {
  id: string
  name: string
  icon: string
}

interface ServerListProps {
  servers: Server[]
  activeServerId: string
  onServerClick: (serverId: string) => void
}

export function ServerList({ servers, activeServerId, onServerClick }: ServerListProps) {
  return (
    <div className="w-20 bg-gray-900 p-3 space-y-4 overflow-y-auto">
      {servers.map((server) => (
        <button
          key={server.id}
          onClick={() => onServerClick(server.id)}
          className={`w-full flex justify-center ${activeServerId === server.id ? 'bg-gray-700 rounded-xl' : ''}`}
        >
          <UserIcon src={server.icon} alt={server.name} />
        </button>
      ))}
    </div>
  )
}

