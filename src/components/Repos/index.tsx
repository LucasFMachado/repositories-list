'use client'

import { useState } from 'react'
import FilterMenu from '../FilterMenu'
import { TOPICS } from './topics'
import RepositoryCard from '../RepositoryCard'
import { useFavorites } from '@/contexts/FavoritesContext'

import './styles.scss'
import Loading from '../Loading'

export interface IRepository {
  id: number
  name: string
  html_url: string
  description: string
}

interface ISelectedRepository {
  topic: string
  repositories: IRepository[]
}

export default function Repos() {
  const { favorites } = useFavorites()
  const [selectedTopics, setSelectedTopics] = useState<ISelectedRepository[]>(
    [],
  )
  const [loading, setLoading] = useState(false)

  async function handleRepos(topic: string) {
    const alreadySelected = selectedTopics.find(i => i.topic === topic)

    if (!alreadySelected) {
      setLoading(true)
      const data = await fetch(
        `https://api.github.com/search/repositories?q=language:${topic}&per_page=5`,
        { cache: 'no-cache' },
      )
      const { items: repositories } = await data.json()
      setSelectedTopics(prev => [...prev, { topic, repositories }])
      setLoading(false)
    } else {
      const updatedTopics = selectedTopics.filter(i => i.topic !== topic)
      setSelectedTopics(updatedTopics)
    }
  }

  return (
    <>
      <section className="bookmarks_section">
        <h2 className="title">My Bookmarks</h2>
        <div className="bookmarks">
          {favorites?.length === 0 ? (
            <div className="not_found_message">
              <p>No favorites</p>
              <span>Add interesting repositories to your favorites list</span>
            </div>
          ) : (
            favorites.map(bookmark => (
              <RepositoryCard
                key={bookmark.id}
                favoriteRepo
                repository={bookmark}
              />
            ))
          )}
        </div>
      </section>
      <section className="bookmarks_section">
        <h4 className="title">Toggle topics to show</h4>
        <div className="topics_selection">
          {TOPICS.map(topic => (
            <button
              key={topic}
              className={
                selectedTopics.find(i => i.topic === topic) ? 'selected' : ''
              }
              onClick={() => handleRepos(topic)}
            >
              {topic}
            </button>
          ))}
        </div>

        {selectedTopics?.map(({ topic, repositories }) => (
          <div key={topic} className="bookmark_topic">
            <FilterMenu title={`Top ${topic}`} />
            <div className="bookmarks">
              {repositories?.map(repo => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="bookmarks">
            <Loading />
          </div>
        )}
      </section>
    </>
  )
}