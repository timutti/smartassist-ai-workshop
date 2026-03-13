import { useMemo } from "react"
import { Sparkles, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

function parseMarkdown(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []

  // Split by code blocks first
  const codeBlockRegex = /```(?:\w*\n)?([\s\S]*?)```/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  const segments: { type: "text" | "codeblock"; value: string }[] = []

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, match.index) })
    }
    segments.push({ type: "codeblock", value: match[1].trim() })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) })
  }

  segments.forEach((segment, segIdx) => {
    if (segment.type === "codeblock") {
      nodes.push(
        <pre
          key={`cb-${segIdx}`}
          className="my-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-sm text-slate-100 dark:bg-slate-800"
        >
          <code>{segment.value}</code>
        </pre>
      )
    } else {
      // Parse inline markdown: **bold** and `inline code`
      const inlineRegex = /(\*\*(.+?)\*\*|`([^`]+)`)/g
      let inlineLastIndex = 0
      let inlineMatch: RegExpExecArray | null
      const inlineNodes: React.ReactNode[] = []

      while ((inlineMatch = inlineRegex.exec(segment.value)) !== null) {
        if (inlineMatch.index > inlineLastIndex) {
          inlineNodes.push(segment.value.slice(inlineLastIndex, inlineMatch.index))
        }

        if (inlineMatch[2]) {
          // Bold
          inlineNodes.push(
            <strong key={`b-${segIdx}-${inlineMatch.index}`} className="font-semibold">
              {inlineMatch[2]}
            </strong>
          )
        } else if (inlineMatch[3]) {
          // Inline code
          inlineNodes.push(
            <code
              key={`ic-${segIdx}-${inlineMatch.index}`}
              className="rounded-md bg-muted px-1.5 py-0.5 text-[0.85em] font-mono"
            >
              {inlineMatch[3]}
            </code>
          )
        }

        inlineLastIndex = inlineMatch.index + inlineMatch[0].length
      }

      if (inlineLastIndex < segment.value.length) {
        inlineNodes.push(segment.value.slice(inlineLastIndex))
      }

      nodes.push(<span key={`t-${segIdx}`}>{inlineNodes}</span>)
    }
  })

  return nodes
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === "user"
  const parsed = useMemo(() => parseMarkdown(content), [content])

  return (
    <div
      className={cn(
        "animate-fade-in flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <Avatar className="mt-0.5 shrink-0">
        <AvatarFallback
          className={cn(
            isUser
              ? "bg-primary-600 text-white"
              : "bg-gradient-to-br from-violet-500 to-indigo-600 text-white"
          )}
        >
          {isUser ? (
            <User className="size-4" />
          ) : (
            <Sparkles className="size-4" />
          )}
        </AvatarFallback>
      </Avatar>

      {/* Message bubble */}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary-600 text-white rounded-br-md"
            : "bg-muted rounded-bl-md ring-1 ring-foreground/5 text-foreground"
        )}
      >
        <div className="space-y-1">{parsed}</div>
        {timestamp && (
          <div
            className={cn(
              "mt-1.5 text-[0.65rem] tabular-nums",
              isUser ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {timestamp}
          </div>
        )}
      </div>
    </div>
  )
}
