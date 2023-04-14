import Header from '@/components/Header'
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
        <Header />
        {children}
      </body>
    </html>
  )
}
