'use client'

import { useFavorites } from '@/contexts/FavoritesContext'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { IRepository } from '@/types/globalTypes'

import './styles.scss'

interface IRepositoryCardProps {
  repository: IRepository
  favoriteRepo?: boolean
}

export default function RepositoryCard({
  repository,
  favoriteRepo = false,
}: IRepositoryCardProps) {
  const { addFavorite, removeFavorite } = useFavorites()

  return (
    <div className={`repository_card ${favoriteRepo ? 'fill_start' : ''}`}>
      {favoriteRepo ? (
        <AiFillStar onClick={() => removeFavorite(repository)} />
      ) : (
        <AiOutlineStar onClick={() => addFavorite(repository)} />
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
