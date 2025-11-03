export type UserRole = 'admin' | 'user' | 'viewer'

export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'revoked'

export interface User {
  userId: string
  username: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  avatar?: string
  role?: UserRole
  isEnabled: number  // 0: disabled, 1: enabled
  isSuperAdmin: number  // 0: no, 1: yes
  createdAt?: string
  updatedAt?: string
  lastLoginAt?: string | null
  invitationStatus?: InvitationStatus
}

export interface UpdateUserRequest {
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: UserRole
  isEnabled?: number
}

export interface UserListResponse {
  count: number
  pageNum: number
  pageSize: number
  users: User[]
}

export interface InviteUserRequest {
  email: string
  role?: UserRole
}

export interface ResetPasswordRequest {
  oldPassword: string
  newPassword: string
}

