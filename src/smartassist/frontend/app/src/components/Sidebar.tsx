import { useState } from "react"
import {
  Sparkles,
  MessageSquare,
  Plus,
  Menu,
  X,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AdminDialog } from "@/components/AdminDialog"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  title: string
  date: string
  active?: boolean
}

const recentConversations: Conversation[] = [
  {
    id: "1",
    title: "Reklamace notebooku ProBook X15",
    date: "Dnes",
    active: true,
  },
  {
    id: "2",
    title: "Dotaz na stav objednávky",
    date: "Včera",
  },
  {
    id: "3",
    title: "Technická podpora - tiskárna",
    date: "11. 3.",
  },
  {
    id: "4",
    title: "Změna fakturačních údajů",
    date: "8. 3.",
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)

  return (
    <>
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Otevřít menu"
      >
        <Menu className="size-5" />
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r bg-sidebar text-sidebar-foreground transition-transform duration-300 md:static md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-violet-500/20">
            <Sparkles className="size-5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-semibold tracking-tight">
              SmartAssist AI
            </h1>
            <p className="text-[0.7rem] text-muted-foreground">
              NovaTech Podpora
            </p>
          </div>

          {/* Mobile close */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Zavřít menu"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* New conversation button */}
        <div className="px-3 py-2">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Plus className="size-4" />
            Nová konverzace
          </Button>
        </div>

        <Separator className="mx-3" />

        {/* Recent conversations */}
        <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
          <p className="mb-2 px-2 text-[0.65rem] font-medium tracking-wider uppercase text-muted-foreground">
            Nedávné konverzace
          </p>
          <div className="space-y-0.5">
            {recentConversations.map((conv) => (
              <button
                key={conv.id}
                className={cn(
                  "flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-sidebar-accent",
                  conv.active &&
                    "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <MessageSquare className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1 truncate">
                  <span className="block truncate text-[0.8rem] leading-snug">
                    {conv.title}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="shrink-0 text-[0.6rem] text-muted-foreground"
                >
                  {conv.date}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        <Separator className="mx-3" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>Online</span>
            <span className="text-[0.6rem] text-muted-foreground/60">
              v0.3.0
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setAdminOpen(true)}
            aria-label="Admin"
          >
            <Settings className="size-4" />
          </Button>
        </div>
      </aside>

      <AdminDialog open={adminOpen} onOpenChange={setAdminOpen} />
    </>
  )
}
