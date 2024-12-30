import { useState } from 'react'
import { UserIcon } from './UserIcon'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Smile, MoreHorizontal, Check, X, Pencil, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"

interface Reaction {
  emoji: string
  count: number
  reacted: boolean
}

interface Message {
  id: string
  content: string
  timestamp: string
  reactions: Reaction[]
}

interface MessageGroupProps {
  userIcon: string
  username: string
  timestamp: string
  messages: Message[]
  status: 'online' | 'offline' | 'away'
  onReact: (messageId: string, emoji: string) => void
  onEdit: (messageId: string, newContent: string) => void
  onDelete: (messageId: string) => void
}

const EMOJI_LIST = ['👍', '❤️', '😂', '😮', '😢', '😡']

export function MessageGroup({ userIcon, username, timestamp, messages, status, onReact, onEdit, onDelete }: MessageGroupProps) {
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState('')

  const handleEditClick = (messageId: string, content: string) => {
    setEditingMessageId(messageId)
    setEditedContent(content)
  }

  const handleEditSave = (messageId: string) => {
    onEdit(messageId, editedContent)
    setEditingMessageId(null)
  }

  const handleEditCancel = () => {
    setEditingMessageId(null)
  }

  return (
    <div className="group px-4 py-2 hover:bg-zinc-800/50 relative flex gap-4">
      <div className="flex-shrink-0 pt-0.5">
        <UserIcon src={userIcon} alt={username} status={status} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-100 hover:underline cursor-pointer">
            {username}
          </span>
          <span className="text-xs text-gray-400">{timestamp}</span>
        </div>
        {messages && messages.map((message) => (
          <div key={message.id} className="relative group/message">
            {editingMessageId === message.id ? (
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="flex-grow"
                />
                <Button size="sm" onClick={() => handleEditSave(message.id)}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={handleEditCancel}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <p className="text-gray-300 mt-1">{message.content}</p>
                
                <div className="absolute right-0 top-0 hidden group-hover/message:flex items-center gap-1 bg-zinc-800 rounded-md p-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-gray-300"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2">
                      <div className="flex gap-2">
                        {EMOJI_LIST.map((emoji) => (
                          <button
                            key={emoji}
                            className="text-2xl hover:bg-zinc-700 p-1 rounded"
                            onClick={() => onReact(message.id, emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-gray-300"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(message.id, message.content)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Message
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(message.id)} className="text-red-500">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Message
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}

            {message.reactions && message.reactions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {message.reactions.map((reaction, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-sm ${
                      reaction.reacted
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300'
                    }`}
                    onClick={() => onReact(message.id, reaction.emoji)}
                  >
                    <span>{reaction.emoji}</span>
                    <span className="text-xs">{reaction.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

