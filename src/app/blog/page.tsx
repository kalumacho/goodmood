import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

const categoryColors: Record<string, "sage" | "coral" | "navy" | "gray"> = {
  sport: "coral",
  nutrition: "sage",
  wellness: "navy",
  mindset: "gray",
};

export default async function BlogPage() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-navy py-16 px-6 text-center">
        <h1 className="text-4xl font-black text-white mb-2">Le Blog GoodMood</h1>
        <p className="text-white/60">Sport, nutrition, bien-être & mindset</p>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {!articles || articles.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-navy/40">Aucun article pour le moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <div className="bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all group">
                  {article.cover_image ? (
                    <div className="h-48 bg-navy/5 overflow-hidden">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-navy to-navy-50" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={categoryColors[article.category] || "gray"}>
                        {article.category}
                      </Badge>
                      <span className="text-xs text-navy/40">{formatDate(article.published_at)}</span>
                    </div>
                    <h2 className="font-bold text-navy text-lg leading-tight group-hover:text-coral transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-navy/60 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
