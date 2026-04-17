"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
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
    <div className="bg-shadow border border-white/5 rounded flex flex-col h-[600px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-orange/10">
        <div className="w-10 h-10 rounded bg-orange flex items-center justify-center text-void font-black text-xs">
          GM
        </div>
        <div>
          <div className="font-black uppercase tracking-widest text-white text-xs">Sensei GoodMood</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="text-xs text-white/30 font-bold uppercase tracking-widest">En ligne</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🥷</div>
            <p className="text-white/20 text-xs font-black uppercase tracking-widest">Envoie ton premier message au sensei !</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded text-xs ${
              msg.sender === "user"
                ? "bg-orange text-void font-black rounded-br-none"
                : "bg-void border border-white/10 text-white/70 rounded-bl-none"
            }`}>
              <p>{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-void/50" : "text-white/30"}`}>
                {new Date(msg.sent_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-orange/10 flex gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Écris ton message au sensei..."
          rows={1}
          className="flex-1 px-4 py-3 rounded border border-white/10 bg-void focus:outline-none focus:ring-2 focus:ring-orange/40 text-white text-xs font-bold resize-none placeholder:text-white/20"
        />
        <Button onClick={sendMessage} loading={loading} disabled={!content.trim()} size="sm" className="self-end">
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
