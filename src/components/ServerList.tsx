import { UserIcon } from './UserIcon'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { MessageSquare } from 'lucide-react'

interface Server {
  id: string
  name: string
  icon: string
}

interface ServerListProps {
  servers: Server[]
  activeServerId: string
  onServerClick: (serverId: string) => void
  onDMClick: () => void
}

export function ServerList({ servers, activeServerId, onServerClick, onDMClick }: ServerListProps) {
  return (
    <div className="w-16 md:w-20 bg-zinc-900 p-2 md:p-3 space-y-2 md:space-y-4 overflow-y-auto flex flex-col items-center border-r border-zinc-700">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onDMClick}
              className="w-12 h-12 flex justify-center items-center rounded-full transition-all duration-200 bg-zinc-800 hover:bg-indigo-500 hover:rounded-2xl"
            >
              <MessageSquare className="w-6 h-6 text-gray-100" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Direct Messages</p>
          </TooltipContent>
        </Tooltip>

        {servers.map((server) => (
          <Tooltip key={server.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onServerClick(server.id)}
                className={`w-12 h-12 flex justify-center items-center rounded-full transition-all duration-200 ${
                  activeServerId === server.id 
                    ? 'rounded-2xl bg-indigo-500' 
                    : 'hover:rounded-2xl hover:bg-indigo-500'
                }`}
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

