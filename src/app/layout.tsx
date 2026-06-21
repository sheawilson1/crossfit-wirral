import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { AppShell } from "@/components/AppShell";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CrossFit Wirral — Members",
    template: "%s · CrossFit Wirral",
  },
  description:
    "The CrossFit Wirral member app — book classes, view the workout, log scores on the whiteboard, and track your progress.",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/logo-mark.png`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/logo-mark.png`,
  },
  appleWebApp: {
    capable: true,
    title: "CFW",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#ecebe5" },
  ],
};

const themeScript = `(function(){try{var s=null;try{s=JSON.parse(localStorage.getItem('cfw-state-v2')||'null');}catch(e){}var pref=(s&&s.theme)||'dark';var d=pref==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):pref;var r=document.documentElement;r.classList.remove('dark','light');r.classList.add(d);}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${anton.variable} ${archivo.variable} ${spaceMono.variable} dark antialiased`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div className="grain" aria-hidden />
        <div className="app-root">
          <StoreProvider>
            <AppShell>{children}</AppShell>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
