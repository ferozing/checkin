import type { Metadata } from "next";
import { Caveat, Instrument_Sans, Newsreader } from "next/font/google";
import { APP_NAME, COMPANY } from "@/config";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

// Only for the founder's signature.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const title = `${APP_NAME} · a daily call home`;
const description =
  "Every morning we make a short, friendly call to your parent on their normal phone. Then you get a note on WhatsApp: how they are, their medicines, and one thing to ask them.";

export const metadata: Metadata = {
  metadataBase: new URL("https://checkin.fimolabs.com"),
  title: { default: title, template: `%s · ${APP_NAME}` },
  description,
  applicationName: APP_NAME,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: APP_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/brand/png/checkin-icon-1024.png", width: 1024, height: 1024, alt: APP_NAME }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/brand/png/checkin-icon-1024.png"],
  },
  other: { "format-detection": "telephone=no" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${instrumentSans.variable} ${caveat.variable}`}>
      <head>
        <meta name="theme-color" content={COMPANY.themeColor} />
      </head>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
