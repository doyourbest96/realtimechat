import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface UnreadBannerProps {
  count: number
  onDismiss: () => void
}

export function UnreadBanner({ count, onDismiss }: UnreadBannerProps) {
  return (
    <div className="bg-indigo-500 text-white px-4 py-2 flex items-center justify-between">
      <span>{count} new messages</span>
      <Button variant="ghost" size="icon" onClick={onDismiss} className="text-white hover:text-white/90">
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

