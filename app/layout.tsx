import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RO-NOC - Futuristic IT Solutions',
  description: 'Professional IT Consulting and Network Management',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: 'IT Solutions, Network Management, IT Consulting, Professional Services',
  author: 'Your Name',
  'theme-color': '#1E6C93', // Change to your preferred theme color
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <main>{children}</main> {/* Wrapped children in a <main> tag */}
        </ThemeProvider>
      </body>
    </html>
  );
}
