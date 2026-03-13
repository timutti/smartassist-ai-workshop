import * as React from "react"
import { cn } from "../../lib/utils"

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  className?: string
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = "top",
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false)

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 overflow-hidden rounded-md bg-slate-900 px-3 py-1.5 text-xs text-slate-50 shadow-md animate-in fade-in-0 dark:bg-slate-50 dark:text-slate-900",
            positionClasses[side],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
Tooltip.displayName = "Tooltip"

export { Tooltip }
