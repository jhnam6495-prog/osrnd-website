import type { Metadata } from 'next'
import { Rajdhani, Noto_Sans_KR, DM_Mono, Orbitron } from 'next/font/google'
import './globals.css'
import { LangProvider } from './lib/i18n/LangProvider'
import { getDictionary } from './lib/i18n/dictionary'
import Header from './components/Header'
import Footer from './components/Footer'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
})

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-kr',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OSRnD | 오에스알앤디㈜ — 공장자동화 & R&D 전문기업',
  description: 'OSRnD Co., Ltd — Factory Automation & One-Stop R&D',
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const { lang } = await getDictionary()

  return (
    <html
      lang={lang}
      className={`${rajdhani.variable} ${notoSansKr.variable} ${dmMono.variable} ${orbitron.variable}`}
    >
      <body>
        <LangProvider initialLang={lang}>
          <Header />
          <main style={{ paddingTop: 68, overflowX: 'hidden' }}>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  )
}
