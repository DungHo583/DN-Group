import type { Metadata } from "next";
import "@/public/globals.css";
import { NextAuthProvider } from "@/components/nextauth-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "DN Group",
  description: "Dự án của DN Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
        style={{ overflowX: "hidden" }}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
