import { UserIcon } from './UserIcon'
import { Circle, Clock, MinusCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { ScrollArea } from "./ui/scroll-area"

interface Member {
  id: string
  name: string
  status: 'online' | 'offline' | 'away'
  avatar: string
  role?: 'admin' | 'moderator'
}

interface MemberListProps {
  members: Member[]
}

const statusIcons = {
  online: Circle,
  away: Clock,
  offline: MinusCircle,
}

const roleColors = {
  admin: 'text-red-400',
  moderator: 'text-blue-400',
}

export function MemberList({ members }: MemberListProps) {
  const groupedMembers = members.reduce((acc, member) => {
    if (!acc[member.status]) {
      acc[member.status] = [];
    }
    acc[member.status].push(member);
    return acc;
  }, {} as Record<'online' | 'offline' | 'away', Member[]>);

  const statusOrder: ('online' | 'away' | 'offline')[] = ['online', 'away', 'offline'];

  return (
    <div className="w-60 bg-zinc-800 overflow-hidden h-full border-l border-zinc-700 flex flex-col">
      <div className="p-3 border-b border-zinc-700">
        <h2 className="text-lg font-semibold text-gray-200">Members</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3">
          {statusOrder.map((status) => (
            <div key={status} className="mb-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-sm font-medium text-gray-400 mb-2 capitalize flex items-center cursor-help">
                      {statusIcons[status]({ size: 8, className: 'mr-2' })}
                      {status} - {groupedMembers[status]?.length || 0}
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{groupedMembers[status]?.length || 0} members {status}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="space-y-2">
                {groupedMembers[status]?.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-zinc-700/50 cursor-pointer">
                    <UserIcon src={member.avatar} alt={member.name} status={member.status} size="sm" />
                    <span className={`text-sm ${member.role ? roleColors[member.role] : 'text-gray-300'}`}>
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

