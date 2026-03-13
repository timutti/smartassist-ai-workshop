import { cn } from "../lib/utils"

interface TypingIndicatorProps {
  className?: string
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div
      className={cn("flex items-center gap-1 px-4 py-3", className)}
      aria-label="Asistent p&iacute;se..."
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-slate-400 animate-bounce-dot dark:bg-slate-500"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  )
}
