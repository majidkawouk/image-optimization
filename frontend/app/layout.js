import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "image optimization",
  description: "image optimization",
  icons: {
    icon: {
      url: "./favicon.ico",
    },
  },
};

export default function RootLayout({ children }) {
  return (  
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="VG-iqgx47LuxZTtvwe07XUxu5m_A1ZkZ3ztQKY50XKg"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon.url} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
