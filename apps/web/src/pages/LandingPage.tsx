import {
  Navbar,
  HeroSection,
  HeroProductVisual,
  SocialProof,
  CoreValueSection,
  AIFeatureShowcase,
  KanbanShowcase,
  GitHubIntegrationSection,
  CollaborationSection,
  AnalyticsSection,
  FinalCTASection,
  Footer,
} from '@/features/landing'

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Sticky Header */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Realistic Interactive Product Workspace Preview */}
        <HeroProductVisual />

        {/* Social Proof (Tech Stack / Tooling Badges) */}
        <SocialProof />

        {/* Core Value Section (4 Pillars) */}
        <CoreValueSection />

        {/* AI Feature Showcase (Interactive Natural Language Demo) */}
        <AIFeatureShowcase />

        {/* Kanban Showcase (5-Column Developer Board) */}
        <KanbanShowcase />

        {/* GitHub Integration (Dark High-Contrast Workflow) */}
        <GitHubIntegrationSection />

        {/* Collaboration & Unified Source of Truth */}
        <CollaborationSection />

        {/* Actionable Engineering Analytics */}
        <AnalyticsSection />

        {/* Final Conversion CTA */}
        <FinalCTASection />
      </main>

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  )
}
