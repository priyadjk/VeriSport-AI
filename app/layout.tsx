import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'VeriSport AI | Media Integrity Engine',
  description: 'Real-time provenance and anti-deepfake engine for digital sports media.',
};

import { FirebaseProvider } from '@/components/FirebaseProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="antialiased selection:bg-emerald-500/30 text-slate-50">
        <FirebaseProvider>
          <main className="min-h-screen tech-grid overflow-x-hidden">
            {children}
          </main>
        </FirebaseProvider>
      </body>
    </html>
  );
}
