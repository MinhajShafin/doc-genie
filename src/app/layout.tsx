import "./globals.css";
import LoadingProvider from "@/components/loading-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen bg-gray-100">
        <LoadingProvider>
          <main className="flex-grow">{children}</main>
        </LoadingProvider>
      </body>
    </html>
  );
}
