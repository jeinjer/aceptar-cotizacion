import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import "./globals.css";


export const metadata: Metadata = {
  title: "Aceptar Cotización",
  description: "TP6 - G7 - ISW - UTN FRC - 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
        className={`serif antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
