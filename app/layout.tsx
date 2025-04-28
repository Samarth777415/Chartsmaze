import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chartsmaze Webapp',
  description: 'Created by Samarth Gite'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
