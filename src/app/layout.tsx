import NavBar from '@/components/ui/NavBar'
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Just Another Awesome Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
           <NavBar />
           {children}
      </body>
    </html>
  )
}
