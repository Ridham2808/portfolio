import './globals.css';
import Dock from '@/components/Dock';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import EtheralShadow from '@/components/EtheralShadow';

export const metadata = {
  title: 'Ridham Patel — Full Stack Developer',
  description:
    'Portfolio of Ridham Patel — Full Stack Developer, UI/UX Designer, B.Tech CSE student at Rai University. Expert in React, Next.js, Node.js, MongoDB.',
  keywords: ['Ridham Patel', 'Portfolio', 'Full Stack Developer', 'React', 'Next.js', 'Web Developer'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&family=Dancing+Script:wght@600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          backgroundColor: '#1B211A',
          color: '#EBD5AB',
          minHeight: '100vh',
          overflowX: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}
      >
        {/*
          ═══ BACKGROUND — Exact same as friend's portfolio ═══
          EtheralShadow: animated organic green cloud on dark base
          + grain noise texture
          This is fixed so it covers all pages identically.
        */}
        <EtheralShadow
          color="rgba(47, 68, 38, 0.95)"
          animationScale={35}
          animationSpeed={18}
          noiseOpacity={0.08}
          noiseScale={1}
        />

        {/* Dark vignette at the very edges (corners = black) */}
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, rgba(6,9,6,0.75) 100%)',
        }} />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Floating Dock */}
        <Dock />

        {/* Page content */}
        <main style={{ position: 'relative', zIndex: 10, paddingTop: '5rem' }}>
          {children}
        </main>

        {/* Footer — global */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Footer />
        </div>
      </body>
    </html>
  );
}
