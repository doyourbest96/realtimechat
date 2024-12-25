import { useState, useEffect, useRef, RefObject } from 'react'

export function useElementOnScreen(options?: IntersectionObserverInit): [RefObject<HTMLDivElement>, boolean] {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [containerRef, options])

  return [containerRef, isVisible]
}

