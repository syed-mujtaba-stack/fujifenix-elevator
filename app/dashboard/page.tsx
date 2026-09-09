import { client } from "@/sanity/lib/client";
import DashboardClient from "./DashboardClient";

// ─── GROQ Queries ────────────────────────────────────────────────────────────

const statsQuery = `{
  "totalProducts":    count(*[_type == "product"]),
  "activeInquiries":  count(*[_type == "inquiry"  && status != "closed"]),
  "activePopups":     count(*[_type == "popup"    && isActive == true]),
  "adminUsers":       count(*[_type == "adminUser" && isActive == true])
}`;

const recentInquiriesQuery = `
  *[_type == "inquiry"] | order(createdAt desc) [0...5] {
    _id,
    name,
    subject,
    status,
    source,
    createdAt
  }
`;

// ─── Types ───────────────────────────────────────────────────────────────────

interface SanityStats {
  totalProducts: number;
  activeInquiries: number;
  activePopups: number;
  adminUsers: number;
}

interface SanityInquiry {
  _id: string;
  name: string;
  subject: string | null;
  status: string;
  source: string;
  createdAt: string | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeAgo(iso: string | null): string {
  if (!iso) return "Unknown time";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

const sourceLabel: Record<string, string> = {
  contact: "Contact Form",
  cta: "Get a Quote",
  popup: "Popup",
};

// ─── Page (Server Component) ─────────────────────────────────────────────────

export default async function DashboardPage() {
  // Fetch in parallel, fall back to zeros on error
  const [rawStats, rawInquiries] = await Promise.all([
    client
      .fetch<SanityStats>(statsQuery)
      .catch((): SanityStats => ({
        totalProducts: 0,
        activeInquiries: 0,
        activePopups: 0,
        adminUsers: 0,
      })),
    client
      .fetch<SanityInquiry[]>(recentInquiriesQuery)
      .catch((): SanityInquiry[] => []),
  ]);

  const stats = [
    {
      name: "Total Products",
      value: rawStats.totalProducts,
      icon: "package" as const,
      color: "bg-blue-100 text-blue-600",
      iconColor: "text-blue-600",
      href: "/dashboard/products",
    },
    {
      name: "Active Inquiries",
      value: rawStats.activeInquiries,
      icon: "message" as const,
      color: "bg-green-100 text-green-600",
      iconColor: "text-green-600",
      href: "/dashboard/inquiries",
    },
    {
      name: "Active Popups",
      value: rawStats.activePopups,
      icon: "bell" as const,
      color: "bg-purple-100 text-purple-600",
      iconColor: "text-purple-600",
      href: "/dashboard/popups",
    },
    {
      name: "Admin Users",
      value: rawStats.adminUsers,
      icon: "users" as const,
      color: "bg-orange-100 text-orange-600",
      iconColor: "text-orange-600",
      href: "/dashboard/settings/users",
    },
  ];

  const recentActivity = rawInquiries.map((inq) => ({
    id: inq._id,
    type: "inquiry" as const,
    title: inq.subject ?? `Inquiry from ${inq.name}`,
    meta: `${inq.name} · ${sourceLabel[inq.source] ?? inq.source} · ${timeAgo(inq.createdAt)}`,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  }));

  return <DashboardClient stats={stats} recentActivity={recentActivity} />;
}