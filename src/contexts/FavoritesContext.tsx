'use client'

import { IRepository } from '@/types/globalTypes'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

interface IFavoritesProviderProps {
  children: ReactNode
}

interface IFavoritesContext {
  addFavorite: (repository: IRepository) => void
  removeFavorite: (repository: IRepository) => void
  favorites: IRepository[]
  setFavorites: Dispatch<SetStateAction<IRepository[]>>
  getFavorites: () => void
}

const FavoritesContext = createContext({} as IFavoritesContext)

const FavoritesProvider = ({ children }: IFavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<IRepository[]>([])

  function addFavorite(repository: IRepository) {
    if (!favorites.find(i => i.id === repository.id)) {
      const { '@challenge.bookmarks': storedValues } = parseCookies()
      const newRepo = {
        id: repository.id,
        name: repository.name,
        html_url: repository.html_url,
        description: repository.description,
      }
      if (storedValues) {
        const formatValues: IRepository[] = JSON.parse(storedValues)
        const newBookmarks = [...formatValues, newRepo]
        destroyCookie(null, '@challenge.bookmarks')
        setCookie(null, '@challenge.bookmarks', JSON.stringify(newBookmarks))
        setFavorites(newBookmarks)
      } else {
        setCookie(null, '@challenge.bookmarks', JSON.stringify([newRepo]))
        setFavorites([newRepo])
      }
    }
  }

  function removeFavorite(repository: IRepository) {
    const { '@challenge.bookmarks': storedValues } = parseCookies()
    if (storedValues) {
      const formatValues: IRepository[] = JSON.parse(storedValues)
      const newBookmarks = formatValues.filter(i => i.id !== repository.id)
      destroyCookie(null, '@challenge.bookmarks')
      if (newBookmarks.length > 0) {
        setCookie(null, '@challenge.bookmarks', JSON.stringify(newBookmarks))
      }
      setFavorites(newBookmarks)
    }
  }

  function getFavorites() {
    const { '@challenge.bookmarks': storedValues } = parseCookies()
    if (storedValues) {
      const formatValues: IRepository[] = JSON.parse(storedValues)
      setFavorites(formatValues)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        addFavorite,
        removeFavorite,
        favorites,
        setFavorites,
        getFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

const useFavorites = () => useContext(FavoritesContext)

export { FavoritesContext, FavoritesProvider, useFavorites }
