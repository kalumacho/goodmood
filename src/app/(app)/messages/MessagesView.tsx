"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Send } from "lucide-react";
import type { Message } from "@/types/database";

export default function MessagesView({
  userId,
  initialMessages,
}: {
  userId: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!content.trim()) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .insert({ user_id: userId, content: content.trim(), sender: "user", is_read: false })
      .select()
      .single();

    if (!error && data) {
      setMessages((prev) => [...prev, data]);
      setContent("");
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] p-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-5 border-b border-navy/5">
        <div className="w-10 h-10 rounded-full bg-coral flex items-center justify-center text-white font-bold text-sm">
          GM
        </div>
        <div>
          <div className="font-bold text-navy text-sm">Coach GoodMood</div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="text-xs text-navy/40">En ligne</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">👋</div>
            <p className="text-navy/40 text-sm">Envoie ton premier message à ton coach !</p>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-coral text-white rounded-br-md"
                  : "bg-cream text-navy rounded-bl-md"
              }`}
            >
              <p>{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-white/60" : "text-navy/40"}`}>
                {new Date(msg.sent_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-navy/5 flex gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Écris ton message..."
          rows={1}
          className="flex-1 px-4 py-3 rounded-card border border-navy/15 bg-cream focus:outline-none focus:ring-2 focus:ring-coral/40 text-navy text-sm resize-none"
        />
        <Button onClick={sendMessage} loading={loading} disabled={!content.trim()} size="sm" className="self-end">
          <Send size={16} />
        </Button>
      </div>
    </Card>
  );
}
