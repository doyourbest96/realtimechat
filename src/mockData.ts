export const servers = [
  { id: '1', name: 'General', icon: 'https://source.unsplash.com/random/80x80?sig=1&icon' },
  { id: '2', name: 'Development', icon: 'https://source.unsplash.com/random/80x80?sig=2&code' },
  { id: '3', name: 'Design', icon: 'https://source.unsplash.com/random/80x80?sig=3&design' },
  { id: '4', name: 'Marketing', icon: 'https://source.unsplash.com/random/80x80?sig=4&marketing' },
  { id: '5', name: 'Support', icon: 'https://source.unsplash.com/random/80x80?sig=5&support' },
]

export const categories = [
  {
    id: '1',
    name: 'General',
    channels: [
      { id: '1', name: 'general', isPrivate: false },
      { id: '2', name: 'random', isPrivate: false },
      { id: '3', name: 'announcements', isPrivate: false },
    ]
  },
  {
    id: '2',
    name: 'Projects',
    channels: [
      { id: '4', name: 'project-a', isPrivate: true },
      { id: '5', name: 'project-b', isPrivate: true },
    ]
  },
  {
    id: '3',
    name: 'Off-Topic',
    channels: [
      { id: '6', name: 'memes', isPrivate: false },
      { id: '7', name: 'music', isPrivate: false },
    ]
  }
]

export const dmUsers = [
  { id: 'dm1', name: 'Alice', avatar: 'https://source.unsplash.com/random/80x80?sig=11&portrait', status: 'online' as const, unreadCount: 2 },
  { id: 'dm2', name: 'Bob', avatar: 'https://source.unsplash.com/random/80x80?sig=12&portrait', status: 'away' as const },
  { id: 'dm3', name: 'Charlie', avatar: 'https://source.unsplash.com/random/80x80?sig=13&portrait', status: 'offline' as const },
  { id: 'dm4', name: 'David', avatar: 'https://source.unsplash.com/random/80x80?sig=14&portrait', status: 'online' as const, unreadCount: 1 },
  { id: 'dm5', name: 'Eve', avatar: 'https://source.unsplash.com/random/80x80?sig=15&portrait', status: 'away' as const },
]

export const members = [
  { id: '1', name: 'Alice', status: 'online' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=11&portrait', role: 'admin' },
  { id: '2', name: 'Bob', status: 'away' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=12&portrait', role: 'moderator' },
  { id: '3', name: 'Charlie', status: 'offline' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=13&portrait' },
  { id: '4', name: 'David', status: 'online' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=14&portrait' },
  { id: '5', name: 'Eve', status: 'away' as const, avatar: 'https://source.unsplash.com/random/80x80?sig=15&portrait' },
]

export const generateMessages = (count: number) => {
  const messages = []
  const statuses = ['online', 'offline', 'away']
  for (let i = 1; i <= count; i++) {
    messages.push({
      id: i.toString(),
      userIcon: `https://source.unsplash.com/random/80x80?sig=${i}&portrait`,
      username: `User ${i}`,
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      content: `This is message number ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      status: statuses[i % 3] as 'online' | 'offline' | 'away',
      reactions: i % 3 === 0 ? [{ emoji: '👍', count: 2, reacted: false }] : []
    })
  }
  return messages
}

