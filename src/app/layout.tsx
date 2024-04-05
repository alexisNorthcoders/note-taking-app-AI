import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserWrapper } from "@/context/UserContext";

import { ThemeProvider } from "./ThemeProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes AI",
  description: "Nextjs Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class">
            <UserWrapper>{children}</UserWrapper></ThemeProvider>
        </body>
      </html>
   
  );
}
