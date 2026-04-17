export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Parchemins" };

const categoryColors: Record<string, "orange" | "chakra" | "red" | "gray"> = {
  sport: "orange",
  nutrition: "chakra",
  wellness: "red",
  mindset: "gray",
};

export default async function BlogPage() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div className="min-h-screen bg-void">
      <header className="bg-shadow border-b border-orange/20 py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 manga-lines opacity-10" />
        <div className="relative">
          <p className="text-orange font-black text-xs uppercase tracking-widest mb-2">Archives secrètes</p>
          <h1 className="text-4xl font-black uppercase tracking-wider text-white mb-2">Les Parchemins</h1>
          <p className="text-white/30 text-sm font-bold uppercase tracking-widest">Sport · Nutrition · Bien-être · Mindset</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {!articles || articles.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/20 font-black uppercase tracking-widest">Aucun parchemin pour le moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <div className="bg-shadow border border-white/5 hover:border-orange/40 rounded overflow-hidden transition-all group hover:shadow-orange">
                  {article.cover_image ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-orange/20 to-void flex items-center justify-center">
                      <span className="text-orange/30 font-black text-4xl uppercase">GM</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={categoryColors[article.category] || "gray"}>
                        {article.category}
                      </Badge>
                      <span className="text-xs text-white/30">{formatDate(article.published_at)}</span>
                    </div>
                    <h2 className="font-black uppercase tracking-wide text-white text-sm leading-tight group-hover:text-orange transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-white/40 text-xs mt-2 line-clamp-2">{article.excerpt}</p>
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
