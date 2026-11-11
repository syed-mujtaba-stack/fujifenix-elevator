// Official Fuji Fenix social profiles.
// Keep this list as the single source of truth for footer links, contact page
// links, and Organization structured data (`sameAs`).

export type SocialId = "instagram" | "threads" | "facebook" | "x" | "linkedin";

export interface SocialProfile {
  id: SocialId;
  name: string;
  handle: string;
  href: string;
}

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@fujifenix",
    href: "https://www.instagram.com/fujifenix/",
  },
  {
    id: "threads",
    name: "Threads",
    handle: "@fujifenix",
    href: "https://www.threads.com/@fujifenix",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "Fuji Fenix",
    href: "https://www.facebook.com/profile.php?id=61596154745650&sk=directory_links",
  },
  {
    id: "x",
    name: "X",
    handle: "@fujifenix",
    href: "https://x.com/fujifenix",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "Fuji Fenix",
    href: "https://www.linkedin.com/in/fuji-fenix-219525441/",
  },
] as const;

export const SOCIAL_URLS: readonly string[] = SOCIAL_PROFILES.map(
  (profile) => profile.href
);
