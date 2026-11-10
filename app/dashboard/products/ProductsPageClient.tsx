"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Search, Eye, Trash2, Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { deleteProduct } from "@/lib/actions/products";

export interface ProductRow {
  _id: string;
  title: string;
  slug: string | null;
  category?: string | null;
  categorySlug?: string | null;
  order?: number | null;
  configuredAt?: string | null;
}

export default function ProductsPageClient({
  products,
  categories,
  canWrite,
}: {
  products: ProductRow[];
  categories: Array<{ _id: string; title: string; slug: string | null }>;
  canWrite: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const initialCat = searchParams.get("category") ?? "";

  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState(initialCat);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQ = !q || p.title.toLowerCase().includes(q.toLowerCase()) || (p.slug ?? "").toLowerCase().includes(q.toLowerCase());
      const matchesCat = !category || p.categorySlug === category;
      return matchesQ && matchesCat;
    });
  }, [products, q, category]);

  const urlFor = (slug: string | null, categorySlug?: string | null) =>
    `/products/${categorySlug ?? "uncategorized"}/${slug ?? ""}`;

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Products</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{filtered.length} of {products.length} products</p>
        </div>
        {canWrite && (
          <Link href="/dashboard/products/new">
            <Button size="sm">
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by title or slug…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              router.replace(`/dashboard/products?q=${encodeURIComponent(e.target.value)}`, { scroll: false });
            }}
            className="pl-9"
          />
        </div>
        <div className="w-full sm:w-64">
          <Select value={category} onValueChange={(v) => setCategory(v)} options={[{ value: "", label: "All categories" }, ...categories.map((c) => ({ value: c.slug ?? c._id, label: c.title }))]} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All products</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                    No products match your filters.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((p) => (
                <TableRow key={p._id}>
                  <TableCell className="font-medium text-slate-800 dark:text-slate-100">{p.title}</TableCell>
                  <TableCell>
                    <Badge variant="neutral">{p.category || "—"}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 font-mono text-xs">{p.slug || "—"}</TableCell>
                  <TableCell>{p.order ?? 0}</TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 text-xs">{p.configuredAt ? new Date(p.configuredAt).toLocaleDateString() : "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link href={urlFor(p.slug, p.categorySlug)} target="_blank" title="View live page">
                        <Button size="icon" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      {canWrite && (
                        <>
                          <Link href={`/dashboard/products/${p._id}`} title="Edit">
                            <Button size="icon" variant="ghost">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button size="icon" variant="ghost" className="text-red-500" disabled={deleting === p._id} onClick={() => handleDelete(p._id, p.title)} title="Delete">
                            {deleting === p._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}