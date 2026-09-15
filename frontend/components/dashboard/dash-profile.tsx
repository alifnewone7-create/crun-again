'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Headset } from 'lucide-react'
import { type UserProfile } from '@/components/auth-provider'
import { normalizeTier, TIER_LABEL } from '@/lib/tiers'
import { GlyphTier, GlyphMailRune } from '@/components/dashboard/dash-glyphs'

const CANDLES: { h: number; dir: 'up' | 'down' }[] = [
  { h: 22, dir: 'down' },
  { h: 38, dir: 'up' },
  { h: 30, dir: 'down' },
  { h: 52, dir: 'up' },
  { h: 44, dir: 'up' },
  { h: 26, dir: 'down' },
  { h: 60, dir: 'up' },
  { h: 34, dir: 'down' },
  { h: 48, dir: 'up' },
  { h: 28, dir: 'down' },
  { h: 56, dir: 'up' },
  { h: 36, dir: 'up' },
]

export function DashProfile({ profile }: { profile: UserProfile }) {
  const tier = normalizeTier(profile.plan)
  const firstName = profile.name.split(' ')[0] || 'Trader'

  return (
    <section
      id="profile"
      className="relative z-10 mx-auto w-full max-w-[1140px] px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8"
      data-testid="dashboard-profile"
    >
      <div className="coco-d2-hero coco-rise" style={{ '--d': '40ms' } as React.CSSProperties}>
        <span className="coco-d2-hero-line" aria-hidden="true" />
        <span className="coco-d2-candles" aria-hidden="true" data-testid="profile-candles">
          {CANDLES.map((c, i) => (
            <span
              key={i}
              className="coco-d2-candle"
              data-dir={c.dir}
              style={{ height: `${c.h}%`, '--d': `${i * 220}ms` } as React.CSSProperties}
            />
          ))}
        </span>

        <div className="relative flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-7 sm:text-left">
          <span className="coco-d2-avatar">
            <Image
              src="/coco-profile.png"
              alt={`${firstName} avatar`}
              width={128}
              height={128}
              className="h-full w-full rounded-[21px] object-cover"
              priority
            />
          </span>

          <span
            className="flex items-center gap-2 sm:hidden"
            aria-hidden="true"
            data-testid="profile-divider"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#a688ff]/60" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[2px] bg-[#c4a6ff] shadow-[0_0_10px_rgba(196,166,255,0.8)]" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#a688ff]/60" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col items-center gap-2.5 sm:mt-3 sm:flex-row sm:items-center">
              <h1
                className="coco-display coco-title-gradient text-balance text-[1.7rem] leading-tight sm:text-[2.3rem]"
                data-testid="dashboard-name"
              >
                {profile.name}
              </h1>
              <span className="coco-d2-plan" data-testid="dashboard-plan">
                <GlyphTier className="h-3.5 w-3.5" />
                {TIER_LABEL[tier]}
              </span>
            </div>

            <p className="mx-auto mt-3 max-w-[52ch] text-pretty text-[13px] leading-relaxed text-white/60 sm:mx-0 sm:text-sm">
              Welcome back, {firstName}. Your engine is synced and reading OTC and real market
              charts — precise, AI-verified calls, on demand.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a href="#tools" className="coco-btn coco-btn-primary w-full sm:w-auto">
                Open toolkit
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/management" className="coco-btn coco-btn-ghost w-full sm:w-auto">
                <Headset className="h-4 w-4" />
                Account & support
              </Link>
            </div>
          </div>
        </div>

        {/* identity meta */}
        <div className="relative mt-7">
          <div className="coco-d2-meta">
            <span className="coco-d2-meta-icon">
              <GlyphMailRune className="h-[17px] w-[17px]" />
            </span>
            <div className="min-w-0">
              <p className="coco-mono text-[9.5px] uppercase tracking-[0.16em] text-white/40">
                Email
              </p>
              <p className="truncate text-[13px] text-white/80" data-testid="dashboard-email">
                {profile.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
