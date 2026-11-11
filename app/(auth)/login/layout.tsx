import type { Metadata } from "next";

/**
 * Sign-in is a private utility route. The page itself is a client component,
 * so metadata lives here: no index, no follow, never cached.
 */
export const metadata: Metadata = {
  title: "Sign in",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
