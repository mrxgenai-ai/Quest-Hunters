import Link from "next/link"
import { ButtonLink } from "@/components/Button"
import { Container } from "@/components/Section"
import { headerCta, mainNav } from "@/content/site"
import { Logo } from "./Logo"
import { MobileNav } from "./MobileNav"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href={headerCta.href} className="hidden sm:inline-flex">
            {headerCta.label}
          </ButtonLink>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
