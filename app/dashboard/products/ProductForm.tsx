"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { createProduct, updateProduct } from "@/lib/actions/products";

export interface ProductFormData {
  _id?: string;
  title: string;
  slug?: string | null;
  categoryId?: string | null;
  order?: number | null;
  description?: string | null;
  operation?: string | null;
  tagline?: string | null;
  features?: string[];
  designedFor?: string[];
  keyFeatures?: string[];
  applications?: string[];
  capacities?: string[];
  design?: string[];
  configurationNote?: string | null;
  disclaimer?: string | null;
  imageDisclaimer?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

const LIST_FIELDS: Array<{ key: keyof Pick<ProductFormData, "features" | "designedFor" | "keyFeatures" | "applications" | "capacities" | "design">; label: string; hint: string }> = [
  { key: "features", label: "Features", hint: "Comma-separated" },
  { key: "designedFor", label: "Designed For", hint: "Comma-separated use cases" },
  { key: "keyFeatures", label: "Key Features", hint: "Comma-separated" },
  { key: "applications", label: "Applications", hint: "Comma-separated environments" },
  { key: "capacities", label: "Available Capacities", hint: "e.g. 630kg, 1000kg, 1600kg" },
  { key: "design", label: "Design Characteristics", hint: "Comma-separated" },
];

export default function ProductForm({
  categories,
  initial,
}: {
  categories: Array<{ _id: string; title: string }>;
  initial?: ProductFormData | null;
}) {
  const router = useRouter();
  const isNew = !initial?._id;

  const [form, setForm] = useState<ProductFormData>(() => ({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    categoryId: initial?.categoryId ?? "",
    order: initial?.order ?? 0,
    description: initial?.description ?? "",
    operation: initial?.operation ?? "",
    tagline: initial?.tagline ?? "",
    features: initial?.features ?? [],
    designedFor: initial?.designedFor ?? [],
    keyFeatures: initial?.keyFeatures ?? [],
    applications: initial?.applications ?? [],
    capacities: initial?.capacities ?? [],
    design: initial?.design ?? [],
    configurationNote: initial?.configurationNote ?? "",
    disclaimer: initial?.disclaimer ?? "",
    imageDisclaimer: initial?.imageDisclaimer ?? "",
    seoTitle: initial?.seoTitle ?? "",
    seoDescription: initial?.seoDescription ?? "",
  }));

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const slugFromTitle = useMemo(() => {
    let slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (slug.startsWith("elevator-") && slug !== "elevator") slug = slug.replace(/^elevator-/, "");
    return slug;
  }, [form.title]);

  const set = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      const { [key]: _, ...rest } = e;
      void _;
      return rest;
    });
  };

  const setList = (key: keyof Pick<ProductFormData, "features" | "designedFor" | "keyFeatures" | "applications" | "capacities" | "design">, raw: string) => {
    set(key, raw.split(",").map((s) => s.trim()).filter(Boolean));
  };

  const listValue = (key: keyof Pick<ProductFormData, "features" | "designedFor" | "keyFeatures" | "applications" | "capacities" | "design">) =>
    (form[key] ?? []).join(", ");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.slug?.trim() && !slugFromTitle) e.slug = "Slug is required";
    if (!form.categoryId) e.categoryId = "Category is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug?.trim() || slugFromTitle,
        categoryId: form.categoryId!,
        order: Number(form.order ?? 0),
        description: form.description || null,
        operation: form.operation || null,
        tagline: form.tagline || null,
        features: form.features ?? [],
        designedFor: form.designedFor ?? [],
        keyFeatures: form.keyFeatures ?? [],
        applications: form.applications ?? [],
        capacities: form.capacities ?? [],
        design: form.design ?? [],
        configurationNote: form.configurationNote || null,
        disclaimer: form.disclaimer || null,
        imageDisclaimer: form.imageDisclaimer || null,
        seoTitle: form.seoTitle || null,
        seoDescription: form.seoDescription || null,
      };
      if (isNew) {
        const res = await createProduct(payload);
        toast.success("Product created");
        router.push(`/dashboard/products/${res.id}`);
        router.refresh();
      } else {
        await updateProduct(initial._id!, payload);
        toast.success("Product updated");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const currentCategory = categories.find((c) => c._id === form.categoryId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/products" className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-xl font-bold">{isNew ? "New Product" : `Edit: ${initial!.title}`}</h2>
            {!isNew && currentCategory && (
              <p className="text-xs text-slate-500 dark:text-slate-400">Category: {currentCategory.title}</p>
            )}
          </div>
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          {isNew ? "Create product" : "Save changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Product title *" value={form.title} onChange={(e) => set("title", e.target.value)} error={errors.title} placeholder="e.g. Passenger Elevator Cabin" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Slug *"
                  value={form.slug ?? ""}
                  onChange={(e) => set("slug", e.target.value)}
                  onBlur={() => {
                    if (!form.slug?.trim()) set("slug", slugFromTitle);
                  }}
                  error={errors.slug}
                  placeholder={slugFromTitle || "product-slug"}
                />
                <Select
                  label="Category *"
                  value={form.categoryId ?? ""}
                  onValueChange={(v) => set("categoryId", v)}
                  error={errors.categoryId}
                  options={categories.map((c) => ({ value: c._id, label: c.title }))}
                  placeholder="Select category"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Sort order" type="number" value={String(form.order ?? 0)} onChange={(e) => set("order", Number(e.target.value) || 0)} />
              </div>
              <Textarea label="Description" value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={5} placeholder="Short product description shown on listing pages." />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Copy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Tagline" value={form.tagline ?? ""} onChange={(e) => set("tagline", e.target.value)} placeholder="Closing / secondary tagline" />
              <Input label="Operation" value={form.operation ?? ""} onChange={(e) => set("operation", e.target.value)} placeholder="Short operation description" />
              <Textarea label="Configuration note" value={form.configurationNote ?? ""} onChange={(e) => set("configurationNote", e.target.value)} placeholder="e.g. configured per project requirements" />
              {LIST_FIELDS.map((f) => (
                <div key={f.key}>
                  <Input label={f.label} value={listValue(f.key)} onChange={(e) => setList(f.key, e.target.value)} placeholder={f.hint} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="SEO title" value={form.seoTitle ?? ""} onChange={(e) => set("seoTitle", e.target.value)} maxLength={60} placeholder="Max 60 chars" />
              <Textarea label="SEO meta description" value={form.seoDescription ?? ""} onChange={(e) => set("seoDescription", e.target.value)} maxLength={160} placeholder="Max 160 chars" />
            </CardContent>
          </Card>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea label="Spec disclaimer" value={form.disclaimer ?? ""} onChange={(e) => set("disclaimer", e.target.value)} rows={3} placeholder="Specifications may vary by project…" />
              <Textarea label="Image disclaimer" value={form.imageDisclaimer ?? ""} onChange={(e) => set("imageDisclaimer", e.target.value)} rows={3} placeholder="Images are for illustrative purposes only…" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-4 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900">
                Public page: <Link className="font-medium text-[#0047BB] dark:text-blue-400 hover:underline" href={`/products`}>/products</Link>{" "}
                reflects saved changes automatically (revalidated).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}