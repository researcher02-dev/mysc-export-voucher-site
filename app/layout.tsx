import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MYSC 수출바우처 서비스 안내',
  description:
    'MYSC(엠와이소셜컴퍼니)의 수출바우처 서비스를 탐색하고 상담을 신청하세요.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} antialiased`}>
      <head>
        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
