export interface IRepository {
  id: number
  name: string
  html_url: string
  description: string
}

export interface ISelectedRepository {
  topic: string
  repositories: IRepository[]
}

export interface IAuthValues {
  login: string
  password: string
  email?: string
}

export interface IUserInfo {
  login: string
  email?: string
}
