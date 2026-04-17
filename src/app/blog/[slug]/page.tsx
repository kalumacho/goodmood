export const dynamic = "force-dynamic";
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
  return { title: data?.title || "Parchemin" };
}

const categoryColors: Record<string, "orange" | "chakra" | "red" | "gray"> = {
  sport: "orange", nutrition: "chakra", wellness: "red", mindset: "gray",
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
    <div className="min-h-screen bg-void">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/30 hover:text-orange text-xs font-black uppercase tracking-widest mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour aux parchemins
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Badge variant={categoryColors[article.category] || "gray"}>{article.category}</Badge>
          <span className="text-xs text-white/30">{formatDate(article.published_at)}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-white leading-tight mb-6">{article.title}</h1>

        {article.cover_image && (
          <div className="rounded overflow-hidden mb-8 h-64 border border-white/5">
            <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover opacity-80" />
          </div>
        )}

        <div
          className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
