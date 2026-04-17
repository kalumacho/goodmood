"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { slugify, formatDate } from "@/lib/utils";
import { Plus, Trash2, MessageCircle, Eye } from "lucide-react";
import type { Article, Message } from "@/types/database";

export default function AdminView({
  articles,
  messages,
}: {
  articles: Article[];
  messages: Message[];
}) {
  const [tab, setTab] = useState<"articles" | "messages">("articles");
  const [showForm, setShowForm] = useState(false);
  const [localArticles, setLocalArticles] = useState(articles);
  const [form, setForm] = useState({ title: "", category: "sport", content: "", excerpt: "", cover_image: "" });
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const createArticle = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .insert({
        ...form,
        slug: slugify(form.title),
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!error && data) {
      setLocalArticles((prev) => [data, ...prev]);
      setForm({ title: "", category: "sport", content: "", excerpt: "", cover_image: "" });
      setShowForm(false);
    }
    setLoading(false);
  };

  const deleteArticle = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    await supabase.from("articles").delete().eq("id", id);
    setLocalArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const markRead = async (id: string) => {
    await supabase.from("messages").update({ is_read: true }).eq("id", id);
  };

  const categoryColors: Record<string, "sage" | "coral" | "navy" | "gray"> = {
    sport: "coral", nutrition: "sage", wellness: "navy", mindset: "gray",
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("articles")}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${tab === "articles" ? "bg-navy text-white" : "bg-white text-navy/60 hover:text-navy"}`}
        >
          Articles ({localArticles.length})
        </button>
        <button
          onClick={() => setTab("messages")}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${tab === "messages" ? "bg-navy text-white" : "bg-white text-navy/60 hover:text-navy"}`}
        >
          Messages ({messages.filter((m) => !m.is_read).length} non lus)
        </button>
      </div>

      {tab === "articles" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-navy">Articles</h2>
            <Button size="sm" onClick={() => setShowForm(!showForm)}>
              <Plus size={16} className="mr-1" />
              Nouvel article
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <h3 className="font-bold text-navy mb-4">Créer un article</h3>
              <div className="space-y-4">
                <Input label="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre de l'article" />
                <div>
                  <label className="block text-sm font-medium text-navy/70 mb-1.5">Catégorie</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-card border border-navy/15 bg-cream focus:outline-none focus:ring-2 focus:ring-coral/40 text-navy"
                  >
                    <option value="sport">Sport</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="wellness">Wellness</option>
                    <option value="mindset">Mindset</option>
                  </select>
                </div>
                <Input label="Extrait" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Résumé court" />
                <Input label="Image de couverture (URL)" value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} placeholder="https://..." />
                <div>
                  <label className="block text-sm font-medium text-navy/70 mb-1.5">Contenu (HTML)</label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 rounded-card border border-navy/15 bg-cream focus:outline-none focus:ring-2 focus:ring-coral/40 text-navy font-mono text-sm"
                    placeholder="<p>Contenu de l'article...</p>"
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={createArticle} loading={loading} disabled={!form.title || !form.content}>
                    Publier l&apos;article
                  </Button>
                  <Button variant="ghost" onClick={() => setShowForm(false)}>Annuler</Button>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            {localArticles.map((article) => (
              <Card key={article.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={categoryColors[article.category] || "gray"}>{article.category}</Badge>
                      <span className="text-xs text-navy/40">{formatDate(article.published_at)}</span>
                    </div>
                    <h3 className="font-bold text-navy">{article.title}</h3>
                    {article.excerpt && <p className="text-sm text-navy/50 mt-1">{article.excerpt}</p>}
                  </div>
                  <div className="flex gap-2">
                    <a href={`/blog/${article.slug}`} target="_blank" className="p-2 text-navy/40 hover:text-navy rounded-lg hover:bg-navy/5">
                      <Eye size={16} />
                    </a>
                    <button onClick={() => deleteArticle(article.id)} className="p-2 text-navy/40 hover:text-red-500 rounded-lg hover:bg-red-50">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
            {localArticles.length === 0 && (
              <div className="text-center py-12 text-navy/30 text-sm">Aucun article. Crée le premier !</div>
            )}
          </div>
        </div>
      )}

      {tab === "messages" && (
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="text-center py-12 text-navy/30 text-sm">Aucun message pour le moment.</div>
          )}
          {messages.map((msg) => (
            <Card key={msg.id} className={!msg.is_read ? "ring-2 ring-coral/20" : ""}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-coral/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={16} className="text-coral" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-navy/40">
                        {new Date(msg.sent_at).toLocaleString("fr-FR")}
                      </span>
                      {!msg.is_read && <span className="w-2 h-2 rounded-full bg-coral" />}
                    </div>
                    <p className="text-sm text-navy">{msg.content}</p>
                  </div>
                </div>
                {!msg.is_read && (
                  <button
                    onClick={() => markRead(msg.id)}
                    className="text-xs text-navy/40 hover:text-navy shrink-0"
                  >
                    Marquer lu
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
