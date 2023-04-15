import type { ReactNode } from 'react'

import { FavoritesProvider } from './FavoritesContext'

interface IContextProviderProps {
  children: ReactNode
}

export function ContextProvider({ children }: IContextProviderProps) {
  return <FavoritesProvider>{children}</FavoritesProvider>
}
