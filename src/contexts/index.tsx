import type { ReactNode } from 'react'

import { FavoritesProvider } from './FavoritesContext'
import { AuthProvider } from './AuthContext'

interface IContextProviderProps {
  children: ReactNode
}

export function ContextProvider({ children }: IContextProviderProps) {
  return (
    <AuthProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </AuthProvider>
  )
}
