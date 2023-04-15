'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import RepositoryCard from '@/components/RepositoryCard'
import { TOPICS } from './topics'
import FilterMenu from '@/components/FilterMenu'
import Loading from '@/components/Loading'
import { ISelectedRepository } from '@/types/globalTypes'

import './styles.scss'

export default function Dashboard() {
  const router = useRouter()
  const { favorites, getFavorites } = useFavorites()
  const { isAuth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState<ISelectedRepository[]>(
    [],
  )

  useEffect(() => {
    if (!isAuth()) {
      router.push('/')
    } else {
      getFavorites()
    }
  }, [])

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
    <main className="page_content">
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
    </main>
  )
}
