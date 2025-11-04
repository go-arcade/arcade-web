/**
 * 右上角组织信息显示组件
 */

import { useOrganizationStore } from "@/store/organization"
import LOGO from '@/assets/logo.png'

export function OrgHeaderDisplay() {
  const { currentOrganization } = useOrganizationStore()
  
  // 默认组织信息
  const logo = () => <img alt='Arcade' src={LOGO} className="h-6 w-6" />
  const displayOrg = currentOrganization || { name: 'Arcade', logo }
  
  return (
    <div className="flex items-center gap-2">
      {typeof displayOrg.logo === 'function' ? (
        <displayOrg.logo />
      ) : (
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
          <displayOrg.logo className="h-4 w-4 shrink-0" />
        </div>
      )}
      <span className="text-sm font-medium text-foreground">{displayOrg.name}</span>
    </div>
  )
}

