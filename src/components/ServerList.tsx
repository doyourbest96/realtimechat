import { UserIcon } from './UserIcon'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UserIconProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

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
    <div className="w-16 md:w-20 bg-gray-900 p-2 md:p-3 space-y-2 md:space-y-4 overflow-y-auto flex flex-col items-center">
      <TooltipProvider>
        {servers.map((server) => (
          <Tooltip key={server.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onServerClick(server.id)}
                className={`w-10 h-10 md:w-12 md:h-12 flex justify-center items-center ${activeServerId === server.id ? 'bg-gray-700 rounded-xl' : ''}`}
              >
                <UserIcon src={server.icon} alt={server.name} size="sm" />
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

