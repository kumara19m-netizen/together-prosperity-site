import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Together Prosperity Private Limited",
  description: "Powering the future with Blockchain, IoT & AI — Karnataka, India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}