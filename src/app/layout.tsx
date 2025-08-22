import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "INFLOW - Moldova's Premier Rock Band",
  description:
    "Join us on our journey through festivals, albums, and unforgettable live performances that define modern rock music.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
