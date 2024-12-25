import { UserIcon } from './UserIcon'

interface Member {
  id: string
  name: string
  status: 'online' | 'offline' | 'away'
  avatar: string
}

interface MemberListProps {
  members: Member[]
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
    <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Members</h2>
      {statusOrder.map((status) => (
        <div key={status}>
          <h3 className="text-sm font-medium text-gray-500 mb-2 capitalize">{status} - {groupedMembers[status]?.length || 0}</h3>
          <div className="space-y-2 mb-4">
            {groupedMembers[status]?.map((member) => (
              <div key={member.id} className="flex items-center space-x-2">
                <UserIcon src={member.avatar} alt={member.name} status={member.status} />
                <span className="text-sm">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

