import { get, post, put, del } from '../client'
import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
  RoleListResponse,
} from './types'

/**
 * 获取角色列表（带分页）
 */
export const listRoles = async (page?: number, pageSize?: number, scope?: string): Promise<RoleListResponse> => {
  const params = new URLSearchParams()
  if (page) params.append('page', page.toString())
  if (pageSize) params.append('pageSize', pageSize.toString())
  if (scope) params.append('scope', scope)
  const url = params.toString() ? `/roles?${params.toString()}` : '/roles'
  return get<RoleListResponse>(url)
}

/**
 * 获取单个角色详情
 */
export const getRole = async (roleId: string): Promise<Role> => {
  return get<Role>(`/roles/${roleId}`)
}

/**
 * 创建角色
 */
export const createRole = async (data: CreateRoleRequest): Promise<Role> => {
  return post<Role>('/roles', data)
}

/**
 * 更新角色
 */
export const updateRole = async (roleId: string, data: UpdateRoleRequest): Promise<Role> => {
  return put<Role>(`/roles/${roleId}`, data)
}

/**
 * 删除角色
 */
export const deleteRole = async (roleId: string): Promise<void> => {
  await del(`/roles/${roleId}`)
}

/**
 * 切换角色启用状态
 */
export const toggleRole = async (roleId: string): Promise<Role> => {
  return put<Role>(`/roles/${roleId}/toggle`)
}

/**
 * 获取角色权限列表
 */
export const getRolePermissions = async (roleId: string): Promise<string[]> => {
  return get<string[]>(`/roles/${roleId}/permissions`)
}

/**
 * 更新角色权限列表
 */
export const updateRolePermissions = async (roleId: string, permissions: string[]): Promise<Role> => {
  return put<Role>(`/roles/${roleId}/permissions`, { permissions })
}

export default {
  listRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
  toggleRole,
  getRolePermissions,
  updateRolePermissions,
}

