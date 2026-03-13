import { useState, useRef, useEffect, useCallback } from "react"
import { Sun, Moon, Sparkles } from "lucide-react"
import { Button } from "./components/ui/button"
import { ScrollArea } from "./components/ui/scroll-area"
import { Separator } from "./components/ui/separator"
import { ChatMessage } from "./components/ChatMessage"
import { ChatInput } from "./components/ChatInput"
import { Sidebar } from "./components/Sidebar"
import { AdminDialog } from "./components/AdminDialog"
import { TypingIndicator } from "./components/TypingIndicator"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Dobry den! Jsem SmartAssist, virtualni asistent NovaTech. Jak vam mohu pomoci?",
    timestamp: "10:00",
  },
  {
    id: "2",
    role: "user",
    content:
      "Chtel bych reklamovat notebook, ktery jsem koupil minuly mesic.",
    timestamp: "10:01",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Mrzi me, ze mate potize s vasim notebookem. Rad vam pomohu s reklamaci. Muzete mi prosim sdelit cislo vasi objednavky? Najdete ho v potvrzovacim e-mailu.",
    timestamp: "10:01",
  },
  {
    id: "4",
    role: "user",
    content: "Cislo objednavky je NT-2026-04521.",
    timestamp: "10:02",
  },
  {
    id: "5",
    role: "assistant",
    content:
      "Dekuji. Nasel jsem vasi objednavku **NT-2026-04521** — Notebook ProBook X15, zakoupeny 14. unora 2026. Jaky problem s notebookem mate?",
    timestamp: "10:02",
  },
]

function getTimeString(): string {
  return new Date().toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("smartassist-theme")
      if (saved) return saved === "dark"
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return false
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("smartassist-theme", dark ? "dark" : "light")
  }, [dark])

  return [dark, setDark] as const
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [dark, setDark] = useDarkMode()
  const scrollRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  const handleSend = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: getTimeString(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsSending(true)
      setIsTyping(true)

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({ message: content }),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error("No reader")

        const decoder = new TextDecoder()
        let assistantContent = ""
        const assistantId = (Date.now() + 1).toString()

        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: assistantId,
            role: "assistant",
            content: "",
            timestamp: getTimeString(),
          },
        ])

        let buffer = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop() || ""

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim()
              if (data === "[DONE]") continue
              try {
                const parsed = JSON.parse(data)
                if (parsed.token) {
                  assistantContent += parsed.token
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: assistantContent }
                        : m
                    )
                  )
                }
              } catch {
                // skip unparseable lines
              }
            }
          }
        }
      } catch {
        // Backend not available — show mock response after delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "Omlouvam se, ale momentalne nejsem pripojen k backendu. Pro plnou funkcnost spustte server prikazem `uv run fastapi dev src/smartassist/main.py`",
            timestamp: getTimeString(),
          },
        ])
      } finally {
        setIsSending(false)
      }
    },
    []
  )

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar onAdminClick={() => setAdminOpen(true)} />

      {/* Main area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80 lg:px-6">
          <div className="flex items-center gap-3 pl-12 lg:pl-0">
            <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                SmartAssist AI
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                NovaTech Podpora
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Prepnout na svetly rezim" : "Prepnout na tmavy rezim"}
          >
            {dark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </Button>
        </header>

        {/* Messages */}
        <ScrollArea
          ref={scrollRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="mx-auto max-w-3xl space-y-4 px-4 py-6 lg:px-6">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-primary-500 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <Separator />

        {/* Input */}
        <div className="mx-auto w-full max-w-3xl px-4 py-3 lg:px-6">
          <ChatInput onSend={handleSend} disabled={isSending} />
          <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
            SmartAssist AI muze delat chyby. Overujte dulezite informace.
          </p>
        </div>
      </main>

      {/* Admin dialog */}
      <AdminDialog open={adminOpen} onOpenChange={setAdminOpen} />
    </div>
  )
}
