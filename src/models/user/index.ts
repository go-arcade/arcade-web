/**
 * UserInfo
 */
export interface UserInfo {
  avatar: string
  email: string
  firstName: string
  lastName: string
  phone: string
  userId: string
  username: string
}

export type UserRole = 'admin' | 'user'
