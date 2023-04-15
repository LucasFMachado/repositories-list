'use client'

import { IAuthValues, IUserInfo } from '@/types/globalTypes'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

interface IAuthProviderProps {
  children: ReactNode
}

interface IAuthContext {
  isAuth: () => boolean
  authValues: IAuthValues | undefined
  login: (loginValues: IAuthValues) => void
  changeUserInfo: (userInfo: IUserInfo) => void
  logout: () => void
}

const AuthContext = createContext({} as IAuthContext)

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [authValues, setAuthValues] = useState<IAuthValues | undefined>(
    undefined,
  )

  function login(loginValues: IAuthValues) {
    setCookie(null, '@challenge.auth', JSON.stringify(loginValues))
    setAuthValues(loginValues)
  }

  function changeUserInfo(userInfo: IUserInfo) {
    const { '@challenge.auth': storedValues } = parseCookies()
    const formatValues = JSON.parse(storedValues)
    const updatedUserInfo = { ...formatValues, ...userInfo }
    destroyCookie(null, '@challenge.auth')
    setCookie(null, '@challenge.auth', JSON.stringify(updatedUserInfo))
    setAuthValues(updatedUserInfo)
  }

  function isAuth() {
    const { '@challenge.auth': storedValues } = parseCookies()
    if (storedValues) {
      const formatValues = JSON.parse(storedValues)
      setAuthValues(formatValues)
      return true
    }
    return false
  }

  function logout() {
    destroyCookie(null, '@challenge.auth')
    setAuthValues(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        authValues,
        login,
        changeUserInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthContext, AuthProvider, useAuth }
