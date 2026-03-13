import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Settings, Shield } from "lucide-react"

interface AdminDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const plannedFeatures = [
  {
    icon: BarChart3,
    title: "Analytika konverzací",
    description: "Přehled statistik a metrik chatového provozu",
  },
  {
    icon: Users,
    title: "Správa uživatelů",
    description: "Správa rolí, oprávnění a přístupů",
  },
  {
    icon: Settings,
    title: "Konfigurace AI modelu",
    description: "Nastavení parametrů a chování AI asistenta",
  },
  {
    icon: Shield,
    title: "Bezpečnostní logy",
    description: "Auditní záznamy a sledování přístupů",
  },
]

export function AdminDialog({ open, onOpenChange }: AdminDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Dashboard</DialogTitle>
          <DialogDescription>
            Admin dashboard je ve vývoji. Bude obsahovat:
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          {plannedFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/40 p-3"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                <feature.icon className="size-4" />
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{feature.title}</span>
                  <Badge variant="secondary" className="text-[0.65rem]">
                    Plánováno
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
