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

/**
 * 通用请求处理函数
 * @param {string} url 请求的地址
 * @param {RequestInit} options 请求选项
 * @returns {Promise<any>} 返回解析后的 JSON 数据
 */
async function fetchWithErrorHandling(url: string, options: RequestInit): Promise<any> {
  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error(`网络请求错误，状态: ${res.status}`)
  }

  return res.json()
}

/**
 * 从认证服务器获取会话令牌
 * @returns {Promise<string>} 会话令牌字符串
 * @throws {Error} 网络错误或会话获取失败
 */
export async function getSession(): Promise<string> {
  const result: Session = await fetchWithErrorHandling('https://patchyvideo.com/be/auth/get_session.do', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
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
  const result: LoginResponse = await fetchWithErrorHandling('https://patchyvideo.com/be/login.do', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, session }),
  })

  if (result.status === 'SUCCEED') {
    return true
  }
  else if (result.status === 'FAILED' && result.dataerr) {
    throw new Error(`执行失败，原因: ${result.dataerr.reason}`)
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
  const result: {
    status: 'SUCCEED' | 'FAILED' | 'ERROR'
    data?: UserStore
  } = await fetchWithErrorHandling('https://patchyvideo.com/be/user/myprofile.do', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })

  if (result.status === 'SUCCEED' && result.data) {
    return result.data
  }
  else if (result.status === 'FAILED') {
    throw new Error('执行失败')
  }
  else {
    throw new Error(`未知错误: ${result.status}`)
  }
}
