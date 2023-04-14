'use client'

import './styles.scss'

import InputControl from '@/components/InputControl'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Login() {
  const router = useRouter()

  const [userInfo, setUserInfo] = useState({
    user: 'user',
    email: 'user@mail.com',
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(userInfo)
    router.push('/dashboard')
  }

  function handleFormChange({ target }: ChangeEvent<HTMLInputElement>) {
    setUserInfo({
      ...userInfo,
      [target.name]: target.value,
    })
  }

  return (
    <main className="page_content">
      <h1 className="title">My Account</h1>
      <form onSubmit={handleSubmit}>
        <InputControl>
          <label htmlFor="user">Username:</label>
          <input
            id="user"
            name="user"
            required
            value={userInfo.user}
            placeholder="Type your username"
            onChange={handleFormChange}
          />
        </InputControl>
        <InputControl>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={userInfo.email}
            placeholder="Type your email"
            onChange={handleFormChange}
          />
        </InputControl>
        <button type="submit">Save</button>
      </form>
    </main>
  )
}
