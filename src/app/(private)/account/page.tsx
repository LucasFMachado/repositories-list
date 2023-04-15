'use client'

import Divider from '@/components/Divider'
import InputControl from '@/components/InputControl'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IUserInfo, useAuth } from '@/contexts/AuthContext'

import './styles.scss'

export default function Login() {
  const router = useRouter()
  const { isAuth, changeUserInfo } = useAuth()

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    login: 'user',
    email: 'user@mail.com',
  })

  useEffect(() => {
    if (!isAuth()) {
      router.push('/')
    }
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('Account values:', userInfo)
    changeUserInfo(userInfo)
    router.push('/dashboard')
  }

  function handleFormChange({ target }: ChangeEvent<HTMLInputElement>) {
    setUserInfo({
      ...userInfo,
      [target.name]: target.value,
    })
  }

  console.log('userasdas: ', userInfo)

  return (
    <main className="page_content">
      <h1>My Account</h1>
      <Divider />
      <form onSubmit={handleSubmit}>
        <InputControl>
          <label htmlFor="login">
            Username: {!userInfo.login && <span>* Required field</span>}
          </label>
          <input
            id="login"
            name="login"
            required
            value={userInfo.login}
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
        <button type="submit" disabled={!userInfo.login}>
          Save
        </button>
      </form>
    </main>
  )
}
