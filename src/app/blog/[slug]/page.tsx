import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select("title, excerpt")
    .eq("slug", params.slug)
    .single();
  return { title: data?.title || "Article" };
}

const categoryColors: Record<string, "sage" | "coral" | "navy" | "gray"> = {
  sport: "coral", nutrition: "sage", wellness: "navy", mindset: "gray",
};

export default async function ArticlePage({ params }: Props) {
  const supabase = createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!article) notFound();

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-navy/50 hover:text-navy text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour au blog
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Badge variant={categoryColors[article.category] || "gray"}>{article.category}</Badge>
          <span className="text-sm text-navy/40">{formatDate(article.published_at)}</span>
        </div>

        <h1 className="text-4xl font-black text-navy leading-tight mb-6">{article.title}</h1>

        {article.cover_image && (
          <div className="rounded-card overflow-hidden mb-8 h-64">
            <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none text-navy/80 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
