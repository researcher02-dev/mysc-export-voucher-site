'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { openTallyGeneral } from '@/lib/tally'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      className="w-full h-[66.5px] sticky top-0 z-50 flex items-center justify-between px-5 sm:px-10 xl:px-80"
      style={{ background: 'rgba(11,27,53,0.97)', backdropFilter: 'blur(8px)' }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center shrink-0 h-9">
        <Image
          src="/mysc_logo.png"
          alt="MYSC 엠와이소셜컴퍼니"
          width={200}
          height={36}
          className="h-9 w-auto object-contain"
          priority
        />
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-1">
        <Link
          href="/"
          className={`px-4 py-2 text-[15px] font-medium tracking-[0.3px] transition-colors ${
            pathname === '/'
              ? 'text-white'
              : 'text-[#cad5e2] hover:text-white'
          }`}
        >
          홈
        </Link>
        <Link
          href="/services"
          className={`px-4 py-2 text-[15px] font-medium tracking-[0.3px] transition-colors ${
            pathname === '/services'
              ? 'text-white'
              : 'text-[#cad5e2] hover:text-white'
          }`}
        >
          서비스 찾기
        </Link>
        <Link
          href="/guide"
          className={`px-4 py-2 text-[15px] font-medium tracking-[0.3px] transition-colors ${
            pathname === '/guide'
              ? 'text-white'
              : 'text-[#cad5e2] hover:text-white'
          }`}
        >
          신청방법
        </Link>
        <button
          onClick={() => openTallyGeneral('top_nav')}
          className="ml-2 px-6 py-2 rounded-full bg-[#33c3ff] text-white text-[15px] font-bold tracking-[0.3px] hover:bg-[#1ab0ed] transition-colors"
        >
          상담신청
        </button>
      </div>
    </nav>
  )
}
