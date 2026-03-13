import * as React from "react"
import { Send, Paperclip } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  className?: string
}

export function ChatInput({ onSend, disabled = false, className }: ChatInputProps) {
  const [value, setValue] = React.useState("")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      const lineHeight = 24
      const maxLines = 4
      const maxHeight = lineHeight * maxLines
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
    }
  }, [])

  React.useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  const handleSend = React.useCallback(() => {
    const trimmed = value.trim()
    if (trimmed && !disabled) {
      onSend(trimmed)
      setValue("")
      // Reset height after clearing
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto"
        }
      })
    }
  }, [value, disabled, onSend])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  return (
    <div
      className={cn(
        "flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
        disabled
        aria-label="Pripojit soubor"
      >
        <Paperclip className="h-5 w-5" />
      </Button>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Napiste svou zpravu..."
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none border-0 bg-transparent py-2 text-sm leading-6 text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100 dark:placeholder:text-slate-500"
      />

      <Button
        size="icon"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="shrink-0"
        aria-label="Odeslat zpravu"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}
