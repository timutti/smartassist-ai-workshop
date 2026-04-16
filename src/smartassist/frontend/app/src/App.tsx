import { useState, useEffect, useRef, useCallback } from "react"
import { Sun, Moon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ChatMessage } from "@/components/ChatMessage"
import { ChatInput } from "@/components/ChatInput"
import { Sidebar } from "@/components/Sidebar"
import { TypingIndicator } from "@/components/TypingIndicator"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Dobrý den! Jsem SmartAssist, virtuální asistent NovaTech. Jak vám mohu pomoci?",
    timestamp: "09:00",
  },
  {
    id: "2",
    role: "user",
    content:
      "Chtěl bych reklamovat notebook, který jsem koupil minulý měsíc.",
    timestamp: "09:01",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Mrzí mě, že máte potíže s vaším notebookem. Rád vám pomohu s reklamací. Můžete mi prosím sdělit číslo vaší objednávky? Najdete ho v potvrzovacím e-mailu.",
    timestamp: "09:01",
  },
  {
    id: "4",
    role: "user",
    content: "Číslo objednávky je NT-2026-04521.",
    timestamp: "09:02",
  },
  {
    id: "5",
    role: "assistant",
    content:
      "Děkuji. Našel jsem vaši objednávku **NT-2026-04521** — Notebook ProBook X15, zakoupený 14. března 2026. Jaký problém s notebookem máte?",
    timestamp: "09:02",
  },
]

function getInitialDarkMode(): boolean {
  const stored = localStorage.getItem("smartassist-dark-mode")
  if (stored !== null) return stored === "true"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [darkMode, setDarkMode] = useState(getInitialDarkMode)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Apply dark mode class to root element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("smartassist-dark-mode", String(darkMode))
  }, [darkMode])

  // Auto-scroll to bottom on new messages or typing
  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        "[data-slot='scroll-area-viewport']"
      )
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight
      }
    }
  }, [messages, isTyping])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isTyping) return

    const userMessage: Message = {
      id: String(Date.now()),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })

      if (!response.ok || !response.body) {
        throw new Error("Fetch failed")
      }

      // SSE streaming: read from the body
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ""
      const assistantId = String(Date.now() + 1)

      // Add empty assistant message to stream into
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          timestamp: new Date().toLocaleTimeString("cs-CZ", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ])
      setIsTyping(false)

      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() ?? ""

        for (const line of lines) {
          const trimmed = line.trim()
          if (trimmed.startsWith("data: ")) {
            try {
              const parsed: { token: string } = JSON.parse(
                trimmed.slice(6)
              )
              assistantContent += parsed.token
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: assistantContent }
                    : m
                )
              )
            } catch {
              // Skip malformed JSON lines
            }
          }
        }
      }
    } catch {
      // Mock fallback response
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockResponse: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        content:
          "Děkuji za vaši zprávu. Momentálně zpracovávám váš požadavek. Mohu vám ještě s něčím pomoci?",
        timestamp: new Date().toLocaleTimeString("cs-CZ", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }

      setMessages((prev) => [...prev, mockResponse])
      setIsTyping(false)
    }
  }, [input, isTyping])

  return (
    <TooltipProvider>
      <div className="flex h-dvh overflow-hidden bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur-sm md:px-6">
            {/* Left spacer for mobile hamburger */}
            <div className="w-8 md:hidden" />

            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 md:hidden">
                <Sparkles className="size-3.5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight">
                  SmartAssist AI
                </h2>
                <p className="text-[0.7rem] text-muted-foreground">
                  NovaTech Podpora
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Přepnout tmavý režim"
            >
              {darkMode ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          </header>

          {/* Messages area */}
          <ScrollArea ref={scrollRef} className="flex-1">
            <div className="mx-auto max-w-3xl space-y-4 px-4 py-6 md:px-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}

              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600">
                    <Sparkles className="size-4 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3 ring-1 ring-foreground/5">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          {/* Input */}
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={sendMessage}
            disabled={isTyping}
          />
        </main>
      </div>
    </TooltipProvider>
  )
}
