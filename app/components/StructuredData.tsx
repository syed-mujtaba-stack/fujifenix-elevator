"use client";

// Renders JSON-LD schema — must be a Client Component (uses dangerouslySetInnerHTML)
export function StructuredData({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
