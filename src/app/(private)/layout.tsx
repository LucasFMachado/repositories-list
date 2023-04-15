import { ContextProvider } from '@/contexts'
import '../../styles/global.scss'

import Header from '@/components/Header'

export const metadata = {
  title: 'Dashboard | Code challenge',
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
          <Header authorized />
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
