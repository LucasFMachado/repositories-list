'use client'

import './styles.scss'
import { useRouter, usePathname } from 'next/navigation'

interface IHeaderProps {
  authorized?: boolean
}

export default function Header({ authorized = false }: IHeaderProps) {
  const router = useRouter()
  const params = usePathname()

  return (
    <header className="header">
      <div className="content">
        {!authorized ? (
          <div className="actions">
            <img src="next.svg" alt="Application logo" />
          </div>
        ) : (
          <>
            <div className="actions">
              <img src="next.svg" alt="Application logo" />
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
              <button onClick={() => router.push('/')}>Logout</button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
