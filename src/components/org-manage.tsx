import * as React from "react"
import { ChevronsUpDown, Plus, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OrgSettingsDialog } from "@/components/org-settings-dialog"

export function OrgSwitcher({
    orgs,
}: {
  orgs: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const [activeOrganization, setActiveOrganization] = React.useState(orgs[0])
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [settingsMode, setSettingsMode] = React.useState<'create' | 'edit'>('create')
  const [selectedOrgId, setSelectedOrgId] = React.useState<string>()

  // TODO: 集成组织 API 调用

  const handleCreateOrg = () => {
    setSettingsMode('create')
    setSelectedOrgId(undefined)
    setSettingsOpen(true)
  }

  const handleCurrentOrgSettings = () => {
    setSettingsMode('edit')
    setSelectedOrgId(activeOrganization.name)
    setSettingsOpen(true)
  }

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full rounded-md ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 data-[state=open]:bg-accent">
        <div className="flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-left text-sm transition-all">
          <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <activeOrganization.logo className="h-3.5 w-3.5 shrink-0" />
          </div>
          <div className="line-clamp-1 flex-1 pr-2 font-medium">
            {activeOrganization.name}
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64"
        side="right"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Organizations
        </DropdownMenuLabel>
        {orgs.map((org) => (
          <DropdownMenuItem
            className="items-start gap-2 px-1.5"
            key={org.name}
            onClick={() => { setActiveOrganization(org); }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <org.logo className="h-5 w-5 shrink-0" />
            </div>
            <div className="grid flex-1 leading-tight">
              <div className="line-clamp-1 font-medium">{org.name}</div>
              <div className="overflow-hidden text-xs text-muted-foreground">
                <div className="line-clamp-1">{org.plan}</div>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 px-1.5" onClick={handleCreateOrg}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
            <Plus className="h-4 w-4" />
          </div>
          <div className="font-medium text-muted-foreground">Create Organization</div>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 px-1.5" onClick={handleCurrentOrgSettings}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
            <Settings className="h-4 w-4" />
          </div>
          <div className="font-medium text-muted-foreground">Organization Settings</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
    <OrgSettingsDialog
      open={settingsOpen}
      onOpenChange={setSettingsOpen}
      mode={settingsMode}
      organizationId={selectedOrgId}
    />
  </>
  )
}