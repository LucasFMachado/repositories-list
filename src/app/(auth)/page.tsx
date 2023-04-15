'use client'

import Divider from '@/components/Divider'
import InputControl from '@/components/InputControl'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './styles.scss'

export default function Login() {
  const router = useRouter()
  const { isAuth, login } = useAuth()
  const [loginForm, setLoginForm] = useState({
    login: 'username',
    password: 'pass',
  })

  useEffect(() => {
    if (isAuth()) {
      router.push('/dashboard')
    }
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Mocked validation
    if (loginForm.login !== 'username' || loginForm.password !== 'pass') {
      toast.error('Incorrect credentials!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      return
    }
    console.log('Login values:', loginForm)
    login(loginForm)
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
      <h1>Sign In</h1>
      <Divider />
      <form onSubmit={handleSubmit}>
        <InputControl>
          <label htmlFor="login">
            Login: {!loginForm.login && <span>* Required field</span>}
          </label>
          <input
            id="login"
            name="login"
            required
            value={loginForm.login}
            placeholder="Type your login"
            onChange={handleFormChange}
          />
        </InputControl>
        <InputControl>
          <label htmlFor="password">
            Password: {!loginForm.password && <span>* Required field</span>}
          </label>
          <input
            id="password"
            name="password"
            required
            type="password"
            value={loginForm.password}
            placeholder="Type your password"
            onChange={handleFormChange}
          />
        </InputControl>
        <button
          type="submit"
          disabled={!loginForm.login || !loginForm.password}
        >
          Sign In
        </button>
      </form>
      <span className="register_link">
        Don't have an account? <a href="#">Click here to sign up.</a>
      </span>
      <ToastContainer />
    </main>
  )
}
