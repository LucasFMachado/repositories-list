'use client'

import './styles.scss'

import { ReactNode } from 'react'

interface IInputProps {
  children: ReactNode
}

export default function InputControl({ children }: IInputProps) {
  return <div className="input_control">{children}</div>
}
