import { Settings, BarChart3, Headphones, BookOpen, MessagesSquare } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

interface AdminDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const plannedFeatures = [
  {
    icon: MessagesSquare,
    title: "Prehled konverzaci",
    description: "Sprava a historie vsech konverzaci",
  },
  {
    icon: BarChart3,
    title: "Analytika a reporty",
    description: "Metriky vyuziti, spokojenosti a efektivity",
  },
  {
    icon: Headphones,
    title: "Integrace Zendesk",
    description: "Napojeni na existujici ticketovaci system",
  },
  {
    icon: BookOpen,
    title: "Sprava znalostni baze",
    description: "Upload a sprava dokumentu pro AI",
  },
]

export function AdminDialog({ open, onOpenChange }: AdminDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="mx-4">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
              <Settings className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </div>
            <DialogTitle>Admin Dashboard</DialogTitle>
          </div>
          <DialogDescription>
            Admin dashboard je ve vyvoji.
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-4" />

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Planovane funkce
          </p>
          {plannedFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 dark:border-slate-800"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
                <feature.icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </p>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    Planovano
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Zavrit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
