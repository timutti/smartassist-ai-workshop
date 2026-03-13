import * as React from "react"
import { Sparkles, Plus, MessageSquare, Settings, X, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { cn } from "../lib/utils"

interface Conversation {
  id: string
  summary: string
  date: string
  active?: boolean
}

const sampleConversations: Conversation[] = [
  {
    id: "1",
    summary: "Reklamace notebooku ProBook X15",
    date: "dnes",
    active: true,
  },
  {
    id: "2",
    summary: "Dotaz na stav objednavky",
    date: "vcera",
  },
  {
    id: "3",
    summary: "Zmena dodaci adresy",
    date: "11. 3.",
  },
  {
    id: "4",
    summary: "Technicka podpora tiskarna",
    date: "9. 3.",
  },
]

interface SidebarProps {
  onAdminClick: () => void
  className?: string
}

export function Sidebar({ onAdminClick, className }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <>
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-3 top-3 z-50 lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Otevrit menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-slate-200 bg-slate-50 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900/50 lg:relative lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-primary-600 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                SmartAssist AI
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                NovaTech Podpora
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Zavrit menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* New conversation button */}
        <div className="px-3 pb-2">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Plus className="h-4 w-4" />
            Nova konverzace
          </Button>
        </div>

        <Separator />

        {/* Conversation list */}
        <nav className="flex-1 overflow-auto px-3 py-2 scrollbar-thin">
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Posledni konverzace
          </p>
          <ul className="space-y-1">
            {sampleConversations.map((conv) => (
              <li key={conv.id}>
                <button
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors cursor-pointer",
                    conv.active
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  )}
                >
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium">{conv.summary}</p>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-[10px] px-1.5 py-0"
                    >
                      {conv.date}
                    </Badge>
                  </div>
                  {conv.active && (
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <Separator />

        {/* Footer */}
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-2 px-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Online
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              v0.3.0
            </span>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-slate-600 dark:text-slate-400"
            onClick={onAdminClick}
          >
            <Settings className="h-4 w-4" />
            Admin
          </Button>
        </div>
      </aside>
    </>
  )
}
