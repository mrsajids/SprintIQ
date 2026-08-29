import { SprintIQLogo } from '@/components/common/SprintIQLogo'
import { ShieldCheck, Terminal, Heart } from 'lucide-react'

export function Footer() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'AI Copilot', href: '#ai' },
        { label: 'Kanban Board', href: '#kanban' },
        { label: 'GitHub Sync', href: '#integrations' },
        { label: 'Analytics', href: '#analytics' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'GitHub Repository', href: 'https://github.com' },
        { label: 'Changelog', href: '#' },
        { label: 'Community Discord', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Security & Compliance', href: '#' },
        { label: 'Cookie Settings', href: '#' },
      ],
    },
  ]

  return (
    <footer className="border-t border-border/80 bg-card/40 pt-16 pb-12 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-border/60">
          {/* Logo & Tagline column */}
          <div className="col-span-2 space-y-4">
            <SprintIQLogo size="md" />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The AI-powered project management platform for modern software teams. Turn natural language into structured work and ship faster.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SOC2 Compliant
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-primary" /> API First
              </span>
            </div>
          </div>

          {/* Links columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} SprintIQ Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Built with precision for engineering teams</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" />
          </div>
        </div>
      </div>
    </footer>
  )
}
