import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { User } from 'lucide-react'

interface UserIconProps {
  src: string
  alt: string
  status?: 'online' | 'offline' | 'away'
  size?: 'sm' | 'md' | 'lg'
}

export function UserIcon({ src, alt, status, size = 'md' }: UserIconProps) {
  const [imageError, setImageError] = useState(false)

  const variants = {
    visible: { 
      scale: [0.8, 1.1, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 } 
    },
    hidden: { 
      scale: 1, 
      rotate: 0 
    },
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <motion.div
              className={`rounded-full border-2 border-gray-200 flex items-center justify-center bg-gray-100 ${
                size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
              }`}
              initial="hidden"
              animate="visible"
              variants={variants}
            >
              {!imageError ? (
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full rounded-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <User className="w-6 h-6 text-gray-400" />
              )}
            </motion.div>
            {status && (
              <div className={`absolute bottom-0 right-0 rounded-full border-2 border-white ${
                size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'
              } ${
                status === 'online' ? 'bg-green-500' :
                status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
              }`} />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{alt}</p>
          {status && <p className="capitalize">{status}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

