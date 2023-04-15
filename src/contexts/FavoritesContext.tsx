'use client'

import { IRepository } from '@/components/Repos'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

interface IFavoritesProviderProps {
  children: ReactNode
}

interface IFavoritesContext {
  favorites: IRepository[]
  setFavorites: Dispatch<SetStateAction<IRepository[]>>
}

const FavoritesContext = createContext({} as IFavoritesContext)

const FavoritesProvider = ({ children }: IFavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<IRepository[]>([])

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

const useFavorites = () => useContext(FavoritesContext)

export { FavoritesContext, FavoritesProvider, useFavorites }
