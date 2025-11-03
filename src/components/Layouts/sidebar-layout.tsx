import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarLayout, SidebarTrigger } from '@/components/ui/sidebar'

interface SidebarLayoutWrapperProps {}

const SidebarLayoutWrapper: FC<SidebarLayoutWrapperProps> = () => {
  return (
    <SidebarLayout defaultOpen>
      <AppSidebar />
      <main className='flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out'>
        <div className='h-full rounded-md'>
          <div className='flex items-center justify-between p-4'>
            <SidebarTrigger />
          </div>
          <Outlet />
        </div>
      </main>
    </SidebarLayout>
  )
}

export default SidebarLayoutWrapper

