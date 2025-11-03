import { post, get } from '../client'
import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  LDAPLoginRequest
} from './types'

function login(data: LoginRequest) {
  return post<LoginResponse>(
    '/users/login',
    {
      ...data,
      password: btoa(data.password),
    },
    { silence: true },
  )
}

function loginWithLDAP(provider: string, data: LDAPLoginRequest) {
  return post<LoginResponse>(
    `/identity/ldap/login/${provider}`,
    {
      ...data,
      password: btoa(data.password),
    },
    { silence: true },
  )
}

// OAuth2/OIDC 授权 - 直接构建授权 URL 并跳转
function getAuthorizeUrl(provider: string, redirectUri: string) {
  // 构建授权 URL，后端会处理重定向
  const params = new URLSearchParams({
    redirect_uri: redirectUri,
  })
  const baseUrl = import.meta.env.VITE_API_CLIENT_URL || '/api/v1'
  return `${baseUrl}/identity/authorize/${provider}?${params.toString()}`
}

// 处理回调 - 由 AuthCallback 页面调用
function handleCallback(provider: string, code: string, state?: string) {
  const params = new URLSearchParams({ code })
  if (state) params.append('state', state)
  
  return get<LoginResponse>(
    `/identity/callback/${provider}?${params.toString()}`,
    { silence: true },
  )
}

function register(data: RegisterRequest) {
  return post<RegisterResponse>(
    '/users/register',
    {
      ...data,
      password: btoa(data.password),
    },
    { silence: true },
  )
}

export default {
  login,
  loginWithLDAP,
  getAuthorizeUrl,
  handleCallback,
  register,
}
