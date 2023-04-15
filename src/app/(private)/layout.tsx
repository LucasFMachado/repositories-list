import { ContextProvider } from '@/contexts'
import Header from '@/components/Header'

import '../../styles/global.scss'

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
