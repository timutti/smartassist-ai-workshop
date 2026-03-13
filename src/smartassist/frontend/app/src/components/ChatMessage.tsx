import * as React from "react"
import { Sparkles, User } from "lucide-react"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { cn } from "../lib/utils"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

function renderContent(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  // Split by code blocks first
  const codeBlockRegex = /```([\s\S]*?)```/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  const segments: { type: "text" | "code"; value: string }[] = []

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, match.index) })
    }
    segments.push({ type: "code", value: match[1] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) })
  }

  segments.forEach((segment, segIdx) => {
    if (segment.type === "code") {
      parts.push(
        <pre
          key={`code-${segIdx}`}
          className="my-2 overflow-x-auto rounded-md bg-slate-800 p-3 text-sm text-slate-100 dark:bg-slate-950"
        >
          <code>{segment.value.trim()}</code>
        </pre>
      )
    } else {
      // Handle inline formatting: **bold** and `inline code`
      const inlineRegex = /(\*\*(.+?)\*\*|`([^`]+)`)/g
      let inlineLastIndex = 0
      let inlineMatch: RegExpExecArray | null
      const inlineParts: React.ReactNode[] = []

      while ((inlineMatch = inlineRegex.exec(segment.value)) !== null) {
        if (inlineMatch.index > inlineLastIndex) {
          inlineParts.push(
            segment.value.slice(inlineLastIndex, inlineMatch.index)
          )
        }
        if (inlineMatch[2]) {
          // Bold
          inlineParts.push(
            <strong key={`b-${segIdx}-${inlineMatch.index}`}>
              {inlineMatch[2]}
            </strong>
          )
        } else if (inlineMatch[3]) {
          // Inline code
          inlineParts.push(
            <code
              key={`ic-${segIdx}-${inlineMatch.index}`}
              className="rounded bg-slate-200 px-1.5 py-0.5 text-sm font-mono dark:bg-slate-700"
            >
              {inlineMatch[3]}
            </code>
          )
        }
        inlineLastIndex = inlineMatch.index + inlineMatch[0].length
      }
      if (inlineLastIndex < segment.value.length) {
        inlineParts.push(segment.value.slice(inlineLastIndex))
      }
      parts.push(<React.Fragment key={`t-${segIdx}`}>{inlineParts}</React.Fragment>)
    }
  })

  return parts
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar size="sm" className="mt-1 shrink-0">
        <AvatarFallback
          className={cn(
            isUser
              ? "bg-primary-600 text-white dark:bg-primary-500"
              : "bg-gradient-to-br from-violet-500 to-primary-500 text-white"
          )}
        >
          {isUser ? (
            <User className="h-4 w-4" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary-600 text-white dark:bg-primary-500"
            : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
        )}
      >
        <div className="whitespace-pre-wrap break-words">
          {renderContent(content)}
        </div>
        {timestamp && (
          <div
            className={cn(
              "mt-1.5 text-xs",
              isUser
                ? "text-primary-200 dark:text-primary-300"
                : "text-slate-400 dark:text-slate-500"
            )}
          >
            {timestamp}
          </div>
        )}
      </div>
    </div>
  )
}
