import type { Metadata } from "next";
import { Inter, Space_Grotesk, Dancing_Script } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/ui/CustomCursor";
import { Loader } from "@/ui/Loader";
import { ScrollProgress } from "@/ui/ScrollProgress";
import { FramerMotionBackground } from "@/ui/FramerMotionBackground";
import { Navbar } from "@/ui/Navbar";
import { ThemeProvider } from "@/ui/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing-script" });

export const metadata: Metadata = {
  title: "Creative Developer Portfolio",
  description: "Crafting Experiences, Not Just Websites",
  openGraph: {
    title: "Creative Developer Portfolio",
    description: "Crafting Experiences, Not Just Websites",
    url: "https://portfolio.local",
    siteName: "Developer Portfolio",
    images: [
      {
        url: "/og-image.png", // Placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${dancingScript.variable} font-sans antialiased bg-[#050505] text-[#F5F5F7] selection:bg-accent-cyan selection:text-black transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
        >
          <FramerMotionBackground />
          <Loader />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
