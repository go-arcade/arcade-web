import { get, post, put } from '../client'
import type {
  User,
  UpdateUserRequest,
  InviteUserRequest,
  UserListResponse,
} from './types'

/**
 * 获取用户列表（带分页）
 */
export const listUsers = async (page?: number, pageSize?: number): Promise<UserListResponse> => {
  const params = new URLSearchParams()
  if (page) params.append('page', page.toString())
  if (pageSize) params.append('pageSize', pageSize.toString())
  const url = params.toString() ? `/users?${params.toString()}` : '/users'
  return get<UserListResponse>(url)
}

/**
 * 更新用户信息
 */
export const updateUser = async (userId: string, data: UpdateUserRequest): Promise<User> => {
  return put<User>(`/users/${userId}`, data)
}

/**
 * 邀请用户
 */
export const inviteUser = async (data: InviteUserRequest): Promise<void> => {
  await post('/users/invite', data)
}

/**
 * 重置当前用户密码
 */
export const resetPassword = async (oldPassword: string, newPassword: string): Promise<void> => {
  await put('/users/me/password', { 
    oldPassword: btoa(oldPassword), 
    newPassword: btoa(newPassword) 
  })
}

/**
 * 管理员重置用户密码
 */
export const resetUserPassword = async (userId: string, newPassword: string): Promise<void> => {
  await put(`/users/${userId}/password`, { 
    password: btoa(newPassword) 
  })
}

export default {
  listUsers,
  updateUser,
  inviteUser,
  resetPassword,
  resetUserPassword,
}

