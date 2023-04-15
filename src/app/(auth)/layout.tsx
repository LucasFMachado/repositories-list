import Header from '@/components/Header'
import { ContextProvider } from '@/contexts'

import '../../styles/global.scss'

export const metadata = {
  title: 'Login | Code challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Header />
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
