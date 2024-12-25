import { motion } from 'framer-motion'
import { useElementOnScreen } from '../utils/useElementOnScreen'

interface UserIconProps {
  src: string
  alt: string
  status?: 'online' | 'offline' | 'away'
}

export function UserIcon({ src, alt, status }: UserIconProps) {
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

  return (
    <div ref={containerRef} className="relative">
      <motion.img
        src={src}
        alt={alt}
        className="w-10 h-10 rounded-full border-2 border-gray-200"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={variants}
      />
      {status && (
        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
          status === 'online' ? 'bg-green-500' :
          status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
        }`} />
      )}
    </div>
  )
}

