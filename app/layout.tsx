import type { Metadata } from 'next'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Logo } from "@/app/components/ui/logo"
import { DarkModeToggle } from './components/ui/darkModeToggle'
import { NavLinks } from './components/ui/navLinks'
import { UserMenuDropdown } from './components/ui/userMenuDropdown'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AguaYa',
  description: 'Sitio web correspondiente a la aplicacion de comprador',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <header className="flex justify-between items-center p-4 gap-4 h-16 bg-white shadow-sm">
            {/* Logo - Izquierda */}
            <div className="flex-shrink-0">
              <Logo/>
            </div>
            {/* Navegacion - Centro */}
            <NavLinks />
            {/* Botones - Derecha */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Show when="signed-out">
                <SignInButton>
                  <button className="bg-[#4287f5] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Iniciar Sesion
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-[#4287f5] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Registrarse
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserMenuDropdown />
                <UserButton />
              </Show>
            </div>
          </header>
          {children}
         <div className="fixed bottom-4 right-4">
            <DarkModeToggle />
          </div>
        </ClerkProvider>
      </body>
    </html>
  )
}