'use client'

import './styles.scss'

import InputControl from '@/components/InputControl'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Login() {
  const router = useRouter()

  const [loginForm, setLoginForm] = useState({
    user: 'user',
    pass: 'pass',
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(loginForm)
    router.push('/dashboard')
  }

  function handleFormChange({ target }: ChangeEvent<HTMLInputElement>) {
    setLoginForm({
      ...loginForm,
      [target.name]: target.value,
    })
  }

  return (
    <main className="page_content">
      <h1 className="title">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <InputControl>
          <label htmlFor="user">Username:</label>
          <input
            id="user"
            name="user"
            value={loginForm.user}
            placeholder="Type your username"
            onChange={handleFormChange}
          />
        </InputControl>
        <InputControl>
          <label htmlFor="pass">Password:</label>
          <input
            id="pass"
            name="pass"
            type="password"
            value={loginForm.pass}
            placeholder="Type your password"
            onChange={handleFormChange}
          />
        </InputControl>
        <button type="submit">Sign In</button>
      </form>
      <span className="register_link">
        Don't have an account? <a href="#">Click here to sign up.</a>
      </span>
    </main>
  )
}
