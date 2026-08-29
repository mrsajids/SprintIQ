export function SocialProof() {
  const techLogos = [
    { name: 'GitHub', label: 'GitHub Ecosystem' },
    { name: 'AWS', label: 'AWS Cloud Native' },
    { name: 'PostgreSQL', label: 'PostgreSQL' },
    { name: 'React', label: 'React 19' },
    { name: 'Node.js', label: 'Node.js' },
    { name: 'Docker', label: 'Docker' },
    { name: 'TypeScript', label: 'TypeScript' },
    { name: 'Redis', label: 'Redis Cache' },
  ]

  return (
    <section className="border-y border-border/60 bg-muted/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Built for modern engineering teams & tech stacks
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center justify-center">
          {techLogos.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border/40 bg-card/40 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all text-xs font-medium select-none"
            >
              <span className="font-mono text-xs font-bold text-foreground">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
