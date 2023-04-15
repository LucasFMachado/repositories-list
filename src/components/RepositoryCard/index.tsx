'use client'

import { useFavorites } from '@/contexts/FavoritesContext'
import { IRepository } from '../Repos'
import './styles.scss'

import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

interface IRepositoryCardProps {
  repository: IRepository
  favoriteRepo?: boolean
}

export default function RepositoryCard({
  repository,
  favoriteRepo = false,
}: IRepositoryCardProps) {
  const { favorites, setFavorites } = useFavorites()

  function handeAddFavorite(repository: IRepository) {
    if (!favorites.find(i => i.id === repository.id)) {
      setFavorites(prev => [...prev, repository])
    }
  }

  function handleRemoveFavorite(id: number) {
    const updatedFavorites = favorites.filter(i => i.id !== id)
    setFavorites(updatedFavorites)
  }

  return (
    <div className={`repository_card ${favoriteRepo ? 'fill_start' : ''}`}>
      {favoriteRepo ? (
        <AiFillStar onClick={() => handleRemoveFavorite(repository.id)} />
      ) : (
        <AiOutlineStar onClick={() => handeAddFavorite(repository)} />
      )}
      <div className="repository_info">
        <p>{repository.name}</p>
        <span>{repository.description}</span>
        <button onClick={() => window.open(repository.html_url, '_blank')}>
          Open
        </button>
      </div>
    </div>
  )
}
