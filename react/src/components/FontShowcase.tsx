import React from "react";

const FontShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/15 to-indigo-900/20 p-8">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-hero mb-4 text-glass-primary">
            Typography Showcase
          </h1>
          <p className="text-body-lg text-glass-secondary">
            Explore the enhanced typography system for your liquid glass
            portfolio
          </p>
        </div>

        {/* Font Family Showcase */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Primary Font - Inter */}
          <div className="glass-card p-8">
            <h3 className="mb-4 font-primary text-2xl font-semibold text-glass-primary">
              Inter (Primary)
            </h3>
            <div className="space-y-3">
              <p className="font-primary text-3xl font-light text-glass-primary">
                Light
              </p>
              <p className="font-primary text-3xl font-normal text-glass-primary">
                Regular
              </p>
              <p className="font-primary text-3xl font-medium text-glass-primary">
                Medium
              </p>
              <p className="font-primary text-3xl font-semibold text-glass-primary">
                Semibold
              </p>
              <p className="font-primary text-3xl font-bold text-glass-primary">
                Bold
              </p>
            </div>
            <p className="mt-4 font-primary leading-relaxed text-glass-secondary">
              Perfect for body text, UI elements, and general content. Highly
              legible and works beautifully with glass morphism effects.
            </p>
          </div>

          {/* Display Font - Space Grotesk */}
          <div className="glass-card p-8">
            <h3 className="mb-4 font-display text-2xl font-semibold text-glass-primary">
              Space Grotesk (Display)
            </h3>
            <div className="space-y-3">
              <p className="font-display text-3xl font-light text-glass-primary">
                Light
              </p>
              <p className="font-display text-3xl font-normal text-glass-primary">
                Regular
              </p>
              <p className="font-display text-3xl font-medium text-glass-primary">
                Medium
              </p>
              <p className="font-display text-3xl font-semibold text-glass-primary">
                Semibold
              </p>
              <p className="font-display text-3xl font-bold text-glass-primary">
                Bold
              </p>
            </div>
            <p className="mt-4 font-primary leading-relaxed text-glass-secondary">
              Geometric and modern, perfect for headings and display text.
              Complements the futuristic liquid glass aesthetic.
            </p>
          </div>

          {/* Premium Font - Clash Display */}
          <div className="glass-card p-8">
            <h3 className="mb-4 font-premium text-2xl font-semibold text-glass-primary">
              Clash Display (Premium)
            </h3>
            <div className="space-y-3">
              <p className="font-premium text-3xl font-light text-glass-primary">
                Light
              </p>
              <p className="font-premium text-3xl font-normal text-glass-primary">
                Regular
              </p>
              <p className="font-premium text-3xl font-medium text-glass-primary">
                Medium
              </p>
              <p className="font-premium text-3xl font-semibold text-glass-primary">
                Semibold
              </p>
              <p className="font-premium text-3xl font-bold text-glass-primary">
                Bold
              </p>
            </div>
            <p className="mt-4 font-primary leading-relaxed text-glass-secondary">
              Ultra-premium display font for hero sections and standout
              headings. Adds distinctive character and sophistication.
            </p>
          </div>

          {/* Mono Font - JetBrains Mono */}
          <div className="glass-card p-8">
            <h3 className="mb-4 font-mono text-2xl font-semibold text-glass-primary">
              JetBrains Mono (Code)
            </h3>
            <div className="space-y-3">
              <code className="block font-mono text-xl text-glass-primary">
                const hello = 'world';
              </code>
              <code className="block font-mono text-xl text-glass-primary">
                npm install awesome-fonts
              </code>
              <code className="block font-mono text-xl text-glass-primary">
                git commit -m "Enhanced typography"
              </code>
            </div>
            <p className="mt-4 font-primary leading-relaxed text-glass-secondary">
              Developer-designed monospace font with excellent readability for
              code snippets and technical content.
            </p>
          </div>
        </div>

        {/* Typography Scale Demo */}
        <div className="glass-card p-8">
          <h3 className="text-heading-lg mb-8 text-glass-primary">
            Typography Scale
          </h3>
          <div className="space-y-4">
            <div className="text-hero text-liquid-gradient">Hero Text</div>
            <div className="text-display-lg text-glass-primary">
              Display Large
            </div>
            <div className="text-display-md text-glass-primary">
              Display Medium
            </div>
            <div className="text-heading-lg text-glass-primary">
              Heading Large
            </div>
            <div className="text-body-lg text-glass-secondary">
              Body Large - Perfect for important content
            </div>
            <div className="text-body text-glass-secondary">
              Body Regular - Standard reading text
            </div>
            <div className="text-caption text-glass-tertiary">
              Caption - For supplementary information
            </div>
            <div className="text-label text-glass-tertiary">LABEL TEXT</div>
          </div>
        </div>

        {/* Usage Recommendations */}
        <div className="glass-card p-8">
          <h3 className="text-heading-lg mb-6 text-glass-primary">
            Recommended Usage
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h4 className="mb-3 font-display text-lg font-semibold text-glass-primary">
                Headers & Titles
              </h4>
              <ul className="space-y-2 text-sm text-glass-secondary">
                <li>
                  • Hero: <code className="font-mono">font-premium</code> or{" "}
                  <code className="font-mono">font-display</code>
                </li>
                <li>
                  • H1-H2: <code className="font-mono">font-display</code>
                </li>
                <li>
                  • H3-H6: <code className="font-mono">font-primary</code>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-display text-lg font-semibold text-glass-primary">
                Body & Content
              </h4>
              <ul className="space-y-2 text-sm text-glass-secondary">
                <li>
                  • Paragraphs: <code className="font-mono">font-primary</code>
                </li>
                <li>
                  • UI Elements: <code className="font-mono">font-primary</code>
                </li>
                <li>
                  • Captions:{" "}
                  <code className="font-mono">font-primary medium</code>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-display text-lg font-semibold text-glass-primary">
                Special Cases
              </h4>
              <ul className="space-y-2 text-sm text-glass-secondary">
                <li>
                  • Code: <code className="font-mono">font-mono</code>
                </li>
                <li>
                  • Gradients:{" "}
                  <code className="font-mono">text-liquid-gradient</code>
                </li>
                <li>
                  • Glass Text: <code className="font-mono">text-glass-*</code>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Implementation Examples */}
        <div className="glass-card p-8">
          <h3 className="text-heading-lg mb-6 text-glass-primary">
            Implementation Examples
          </h3>
          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <h4 className="mb-2 font-mono text-sm text-glass-tertiary">
                Hero Section:
              </h4>
              <pre className="overflow-x-auto font-mono text-xs text-glass-secondary">
                {`<h1 className="text-hero text-liquid-gradient">
  Aung Myo Kyaw
</h1>`}
              </pre>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <h4 className="mb-2 font-mono text-sm text-glass-tertiary">
                Section Title:
              </h4>
              <pre className="overflow-x-auto font-mono text-xs text-glass-secondary">
                {`<h2 className="text-display-lg text-glass-primary font-display">
  My Learning Journey
</h2>`}
              </pre>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <h4 className="mb-2 font-mono text-sm text-glass-tertiary">
                Body Text:
              </h4>
              <pre className="overflow-x-auto font-mono text-xs text-glass-secondary">
                {`<p className="text-body text-glass-secondary font-primary">
  Passionate developer with expertise in modern web technologies.
</p>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontShowcase;
