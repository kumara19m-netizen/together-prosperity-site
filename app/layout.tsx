import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const SITE_URL = 'https://www.togetherprosperity.com';
const SITE_NAME = 'Together Prosperity Private Limited';
const SITE_DESC =
  'Together Prosperity builds Blockchain, Cybersecurity, IoT, and AI/ML solutions for Indian government institutions and enterprises. Zero-setup pilot projects available. Karnataka, India.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Together Prosperity – Blockchain, Cybersecurity, IoT & AI/ML Solutions',
    template: '%s | Together Prosperity',
  },
  description: SITE_DESC,
  keywords: [
    'blockchain India',
    'cybersecurity Karnataka',
    'IoT solutions India',
    'AI ML government',
    'govtech India',
    'smart contracts',
    'digital India',
    'together prosperity',
    'Kolar Karnataka',
    'Bangalore tech startup',
  ],
  authors: [{ name: 'Together Prosperity Private Limited', url: SITE_URL }],
  creator: 'Together Prosperity Private Limited',
  publisher: 'Together Prosperity Private Limited',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Together Prosperity – Blockchain, Cybersecurity, IoT & AI/ML Solutions',
    description: SITE_DESC,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Together Prosperity – Digital India Tech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Together Prosperity – Blockchain, Cybersecurity, IoT & AI/ML',
    description: SITE_DESC,
    images: ['/og-image.png'],
    creator: '@togetherprosperity',
  },
  verification: {
    google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE', // replace after domain setup
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
      description: SITE_DESC,
      foundingDate: '2026',
      foundingLocation: 'Kolar, Karnataka, India',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Malur, Kolar District',
        addressLocality: 'Karnataka',
        postalCode: '563130',
        addressCountry: 'IN',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-98456-18859',
          contactType: 'customer service',
          availableLanguage: ['English', 'Hindi', 'Kannada'],
        },
      ],
      sameAs: [
        'https://www.instagram.com/together_prosperity',
      ],
      areaServed: 'IN',
      knowsAbout: [
        'Blockchain Technology',
        'Cybersecurity',
        'Internet of Things',
        'Artificial Intelligence',
        'Machine Learning',
        'Smart Contracts',
        'Government Technology',
        'Digital India',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Together Prosperity – Blockchain, Cybersecurity, IoT & AI/ML Solutions',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      description: SITE_DESC,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Canonical */}
        <link rel="canonical" href={SITE_URL} />
        {/* Theme color */}
        <meta name="theme-color" content="#D4A017" />
        <meta name="msapplication-TileColor" content="#020205" />
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Kolar, Karnataka, India" />
        <meta name="geo.position" content="13.1231;78.1335" />
        <meta name="ICBM" content="13.1231, 78.1335" />
      </head>
      <body className={sora.className}>{children}</body>
    </html>
  );
}
