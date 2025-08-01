import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth';
import SessionSyncProvider from "@/components/providers/SessionSyncProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Visualizer",
  description: "Created by Yesu Balla",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionSyncProvider user={session?.user ?? null} />
            {session?.user ?
              (
                <SidebarProvider>
                  <AppSidebar />
                  <main className="w-full">
                    <Navbar />
                    <div className="px-4">{children}</div>
                  </main>
                </SidebarProvider>

              ) :
              (
                <main className="w-full min-h-screen flex items-center justify-center px-4">
                  {children}
                </main>
              )}
          </ThemeProvider>
        </body>
      </html >
    </SessionProvider>
  );
}
