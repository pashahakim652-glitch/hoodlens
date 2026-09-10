import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HoodLens — See the Chain Clearly',
  description: 'Token intelligence and risk analysis for Robinhood Chain.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
