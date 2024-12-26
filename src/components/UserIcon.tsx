import { useState } from 'react'
import { motion } from 'framer-motion'
import { useElementOnScreen } from '../utils/useElementOnScreen'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { User } from 'lucide-react'

interface UserIconProps {
  src: string
  alt: string
  status?: 'online' | 'offline' | 'away'
  size?: 'sm' | 'md' | 'lg'
}

export function UserIcon({ src, alt, status, size = 'md' }: UserIconProps) {
  const [imageError, setImageError] = useState(false)
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  })

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
          <div ref={containerRef} className="relative">
            <motion.div
              className={`w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center bg-gray-100 ${
                size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
              }`}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
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

