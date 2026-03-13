import { useRef, useCallback, type KeyboardEvent } from "react"
import { SendHorizonal, Paperclip } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        if (value.trim() && !disabled) {
          onSend()
        }
      }
    },
    [value, disabled, onSend]
  )

  return (
    <div className="border-t bg-background/80 backdrop-blur-sm p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        {/* Paperclip button (decorative) */}
        <Button
          variant="ghost"
          size="icon"
          disabled
          className="shrink-0 text-muted-foreground"
          aria-label="Priložit soubor"
        >
          <Paperclip className="size-4" />
        </Button>

        {/* Textarea */}
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Napište zprávu..."
          disabled={disabled}
          rows={1}
          className={cn(
            "min-h-10 max-h-32 resize-none rounded-xl",
            "focus-visible:ring-primary-500/30"
          )}
        />

        {/* Send button */}
        <Button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          size="icon"
          className={cn(
            "shrink-0 rounded-xl transition-colors",
            value.trim() && !disabled
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : ""
          )}
          aria-label="Odeslat zprávu"
        >
          <SendHorizonal className="size-4" />
        </Button>
      </div>
    </div>
  )
}
