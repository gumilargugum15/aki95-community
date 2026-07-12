import type { SVGProps } from 'react'

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5H16.5V4.3C16.2 4.3 15.2 4 14 4c-2.4 0-4 1.5-4 4.1V10.5H7.5v3H10V21h3.5z" />
    </svg>
  )
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-2.2-.2-3.6-.5-4.4a2.9 2.9 0 0 0-2-2C17.8 5 12 5 12 5s-5.8 0-7.5.6a2.9 2.9 0 0 0-2 2C2.2 8.4 2 9.8 2 12s.2 3.6.5 4.4a2.9 2.9 0 0 0 2 2C6.2 19 12 19 12 19s5.8 0 7.5-.6a2.9 2.9 0 0 0 2-2c.3-.8.5-2.2.5-4.4Z" />
      <path d="M10 15.5v-7l6 3.5-6 3.5Z" fill="var(--color-background, white)" />
    </svg>
  )
}
