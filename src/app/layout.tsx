import NavBar from '@/components/ui/NavBar'
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { AuthProvider } from '@/components/providers/AuthProvider';


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
          <AuthProvider> 
           <NextTopLoader color="#5beb34" />
           <NavBar />
           {children}
          </AuthProvider>
      </body>
    </html>
  )
}
