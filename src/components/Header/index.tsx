'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

import './styles.scss'

interface IHeaderProps {
  authorized?: boolean
}

export default function Header({ authorized = false }: IHeaderProps) {
  const router = useRouter()
  const params = usePathname()
  const { logout } = useAuth()

  function handleLogOut() {
    logout()
    router.push('/')
  }

  return (
    <header className="header">
      <div className="content">
        {!authorized ? (
          <div className="actions">
            <img src="logo.svg" alt="Application logo" />
          </div>
        ) : (
          <>
            <div className="actions">
              <img src="logo.svg" alt="Application logo" />
              <a
                href="/dashboard"
                className={params === '/dashboard' ? 'active' : ''}
              >
                Discovery
              </a>
            </div>
            <div className="actions">
              <a
                href="/account"
                className={params === '/account' ? 'active' : ''}
              >
                Account
              </a>
              <button onClick={handleLogOut}>Logout</button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
