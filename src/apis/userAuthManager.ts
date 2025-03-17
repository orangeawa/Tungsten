interface Session {
  status: 'SUCCEED' | 'FAILED' | 'ERROR'
  data?: string
}

interface LoginResponse {
  status: 'SUCCEED' | 'FAILED' | 'ERROR'
  dataerr?: {
    reason: string
  }
}

interface UserStore {
  profile: {
    uid: string
    username: string
    image: string
    desc: string
    email: string
    bind_qq: boolean
    access_control_status: string
  }
  access_control: {
    status: string
    access_mode: string
    allowed_ops: string[]
    denied_ops: string[]
  }
  settings: {
    blacklist: string[]
  }
}

// 公共常量
const API_BASE = 'https://patchyvideo.com/be'
const HEADERS = { 'Content-Type': 'application/json' }

/**
 * 通用请求处理函数（使用泛型保证类型安全）
 * @param {string} url 请求地址
 * @param {RequestInit} options 请求选项
 * @returns {Promise<T>} 返回解析后的 JSON 数据
 */
async function fetchWithErrorHandling<T>(url: string, options: RequestInit): Promise<T> {
  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error(`网络请求错误，状态: ${res.status}`)
  }
  return res.json()
}

/**
 * 统一处理响应结果，减少重复代码
 * @param result 响应对象，包含 status 和 data
 * @returns 返回 data
 * @throws 当状态为 FAILED 或 ERROR 时抛出异常
 */
function handleResponse<T>(result: { status: 'SUCCEED' | 'FAILED' | 'ERROR', data?: T }): T {
  if (result.status === 'SUCCEED' && result.data !== undefined) {
    return result.data
  }
  else if (result.status === 'FAILED') {
    throw new Error('执行失败')
  }
  else {
    throw new Error(`未知错误: ${result.status}`)
  }
}

/**
 * 从认证服务器获取会话令牌
 * @returns {Promise<string>} 会话令牌字符串
 * @throws {Error} 网络错误或会话获取失败
 */
export async function getSession(): Promise<string> {
  const result = await fetchWithErrorHandling<Session>(`${API_BASE}/auth/get_session.do`, {
    method: 'POST',
    credentials: 'include',
    headers: HEADERS,
    body: JSON.stringify({ type: 'LOGIN' }),
  })

  if (result.status === 'SUCCEED') {
    return result.data || ''
  }
  else if (result.status === 'FAILED') {
    throw new Error('执行失败')
  }
  else {
    throw new Error(`未知错误: ${result.status}`)
  }
}

/**
 * 使用用户名、密码和会话令牌登录用户
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} session 会话令牌
 * @returns {Promise<boolean>} 登录成功返回 true
 * @throws {Error} 网络错误或登录失败
 */
export async function userLogin(username: string, password: string, session: string): Promise<boolean> {
  const result = await fetchWithErrorHandling<LoginResponse>(`${API_BASE}/login.do`, {
    method: 'POST',
    credentials: 'include',
    headers: HEADERS,
    body: JSON.stringify({ username, password, session }),
  })

  if (result.status === 'SUCCEED') {
    return true
  }
  else if (result.status === 'FAILED' && result.dataerr) {
    throw new Error(`登录失败: ${result.dataerr.reason}`)
  }
  else {
    throw new Error(`未知错误: ${result.status}`)
  }
}

/**
 * 获取用户信息
 * @returns {Promise<UserStore>} 用户信息
 * @throws {Error} 网络错误或获取失败
 */
export async function refetchProfile(): Promise<UserStore> {
  const result = await fetchWithErrorHandling<{ status: 'SUCCEED' | 'FAILED' | 'ERROR', data?: UserStore }>(`${API_BASE}/user/myprofile.do`, {
    method: 'POST',
    credentials: 'include',
    headers: HEADERS,
    body: JSON.stringify({}),
  })
  return handleResponse(result)
}

/**
 * 校验用户名是否存在
 * @param {string} username 用户名
 * @returns {Promise<boolean>} 存在返回 true
 * @throws {Error} 网络错误或校验失败
 */
export async function checkUsername(username: string): Promise<boolean> {
  const result = await fetchWithErrorHandling<{ status: 'SUCCEED' | 'FAILED' | 'ERROR', data: boolean }>(`${API_BASE}/user/exists.do`, {
    method: 'POST',
    credentials: 'include',
    headers: HEADERS,
    body: JSON.stringify({ username }),
  })
  return handleResponse(result)
}

/**
 * 校验邮箱是否已经存在
 * @param {string} email 邮箱
 * @returns {Promise<boolean>} 存在则返回 true
 * @throws {Error} 网络错误或校验失败
 */
export async function checkEmail(email: string): Promise<boolean> {
  const result = await fetchWithErrorHandling<{ status: 'SUCCEED' | 'FAILED' | 'ERROR', data: boolean }>(`${API_BASE}/user/email_avail.do`, {
    method: 'POST',
    credentials: 'include',
    headers: HEADERS,
    body: JSON.stringify({ email }),
  })
  return handleResponse(result)
}

/**
 * 注册用户
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} session 会话令牌
 * @param {string} email 邮箱
 * @returns {Promise<boolean>} 注册成功返回 true
 * @throws {Error} 网络错误或注册失败
 */
export async function userSignup(username: string, password: string, session: string, email: string): Promise<boolean> {
  const result = await fetchWithErrorHandling<{ status: 'SUCCEED' | 'FAILED' | 'ERROR', data: { uid: string } | '.' }>(`${API_BASE}/signup.do`, {
    method: 'POST',
    credentials: 'include',
    headers: HEADERS,
    body: JSON.stringify({ username, password, session, email }),
  })

  if (result.status === 'SUCCEED') {
    return true
  }
  else if (result.status === 'FAILED') {
    throw new Error('执行失败')
  }
  else {
    throw new Error(`未知错误: ${result.status}`)
  }
}

/**
 * 修改用户名
 * @param {string} username 新的用户名
 * @returns {Promise<boolean>} 修改成功返回 true
 * @throws {Error} 网络错误或修改失败
 */
export async function changeUsername(username: string): Promise<boolean> {
  const result = await fetchWithErrorHandling<{ status: 'SUCCEED' | 'FAILED' | 'ERROR' }>(`${API_BASE}/user/changename.do`, {
    method: 'POST',
    credentials: 'include',
    headers: HEADERS,
    body: JSON.stringify({ name: username }),
  })

  if (result.status === 'SUCCEED') {
    return true
  }
  else if (result.status === 'FAILED') {
    throw new Error('执行失败')
  }
  else {
    throw new Error(`未知错误: ${result.status}`)
  }
}

/**
 * 修改简介
 */
export async function changeDesc(desc: string): Promise<boolean> {
  const result = await fetchWithErrorHandling<{ status: 'SUCCEED' | 'FAILED' | 'ERROR' }>(`${API_BASE}/user/changedesc.do`, {
    method: 'POST',
    credentials: 'include',
    headers: HEADERS,
    body: JSON.stringify({ desc }),
  })

  if (result.status === 'SUCCEED') {
    return true
  }
  else if (result.status === 'FAILED') {
    throw new Error('执行失败')
  }
  else {
    throw new Error(`未知错误: ${result.status}`)
  }
}

/**
 * 修改密码
 */
export async function changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
  const result = await fetchWithErrorHandling<{ status: 'SUCCEED' | 'FAILED' | 'ERROR' }>(`${API_BASE}/user/changepass.do`, {
    method: 'POST',
    credentials: 'include',
    headers: HEADERS,
    body: JSON.stringify({ old_pass: oldPassword, new_pass: newPassword }),
  })

  if (result.status === 'SUCCEED') {
    return true
  }
  else if (result.status === 'FAILED') {
    throw new Error('请检查旧密码是否正确')
  }
  else {
    throw new Error(`未知错误: ${result.status}`)
  }
}
