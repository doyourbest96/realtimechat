import { UserIcon } from './UserIcon'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
      <TooltipProvider>
        {servers.map((server) => (
          <Tooltip key={server.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onServerClick(server.id)}
                className={`w-full flex justify-center items-center h-12 ${activeServerId === server.id ? 'bg-gray-700 rounded-xl' : ''}`}
              >
                <UserIcon src={server.icon} alt={server.name} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{server.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}

