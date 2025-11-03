import { useState, useEffect } from 'react'
import { Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/lib/toast'
import type { User, UserRole, UpdateUserRequest } from '@/api/user-management/types'
import type { Role } from '@/api/role/types'

interface UserManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  roles: Role[]
  onSubmit: (data: UpdateUserRequest) => Promise<void>
}

export function UserManagementDialog({ open, onOpenChange, user, roles, onSubmit }: UserManagementDialogProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
    isActive: true,
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user && open) {
      setFormData({
        username: user.username,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        role: user.role || (roles.length > 0 ? roles[0].roleId : ''),
        isActive: user.isEnabled === 1,
      })
    } else if (open && roles.length > 0 && !formData.role) {
      // 设置默认角色为第一个可用角色
      setFormData(prev => ({ ...prev, role: roles[0].roleId }))
    }
  }, [user, open, roles, formData.role])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updateData: UpdateUserRequest = {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        phone: formData.phone || undefined,
        role: formData.role as UserRole,
        isEnabled: formData.isActive ? 1 : 0,
      }
      await onSubmit(updateData)

      toast.success('User updated successfully')
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to update user')
      console.error('Submit failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information and permissions</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username *</Label>
              <Input
                id='username'
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder='e.g.: johndoe'
                required
                disabled={!!user}
              />
              {user && (
                <p className='text-xs text-muted-foreground'>Username cannot be changed</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email *</Label>
              <Input
                id='email'
                type='email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder='e.g.: john@example.com'
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='firstName'>First Name</Label>
              <Input
                id='firstName'
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder='Enter first name'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input
                id='lastName'
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder='Enter last name'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder='Enter phone number'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='role'>Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value: string) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id='role'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => {
                    const scopeLabel = role.scope === 'org' ? 'Organization' : role.scope === 'team' ? 'Team' : role.scope === 'project' ? 'Project' : role.scope
                    return (
                      <SelectItem key={role.roleId} value={role.roleId}>
                        {role.displayName || role.name} ({scopeLabel})
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id='isActive'
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className='h-4 w-4 rounded border-gray-300'
            />
            <Label htmlFor='isActive' className='cursor-pointer'>
              Active user
            </Label>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)} disabled={loading}>
              <X className='h-4 w-4 mr-1' />
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              <Save className='h-4 w-4 mr-1' />
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

