import React from 'react'
import { cn } from '../lib/utils'

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className={cn(
      "relative mx-auto h-[844px] w-[390px] overflow-hidden rounded-[60px] border-[14px] border-foreground bg-background shadow-xl",
      className
    )}>
      {/* Notch */}
      <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-foreground" />
      
      {/* Main Content */}
      <div className="h-full w-full overflow-y-auto bg-background">
        {children}
      </div>
    </div>
  )
}

export default PhoneFrame