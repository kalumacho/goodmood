"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Sword, Salad, TrendingUp, Sparkles, BookOpen, MessageCircle, Menu, X, LogOut, LayoutDashboard } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Base", icon: LayoutDashboard },
  { href: "/sport", label: "Missions", icon: Sword },
  { href: "/nutrition", label: "Rations", icon: Salad },
  { href: "/progress", label: "Niveau", icon: TrendingUp },
  { href: "/wellness", label: "Chakra", icon: Sparkles },
  { href: "/blog", label: "Parchemins", icon: BookOpen },
  { href: "/messages", label: "Sensei", icon: MessageCircle },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-void border-r border-orange/10 min-h-screen fixed left-0 top-0 z-30 p-6">
        {/* Logo */}
        <Link href="/dashboard" className="mb-10 block">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange rounded flex items-center justify-center">
              <span className="text-void font-black text-sm">GM</span>
            </div>
            <div>
              <span className="text-lg font-black uppercase tracking-tight text-white">Good</span>
              <span className="text-lg font-black uppercase tracking-tight text-orange">Mood</span>
            </div>
          </div>
          <div className="mt-1 text-xs text-white/20 uppercase tracking-widest font-bold">Ninja Wellness</div>
        </Link>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={href} href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded text-xs font-black uppercase tracking-widest transition-all",
                  active
                    ? "bg-orange text-void shadow-orange"
                    : "text-white/40 hover:text-white hover:bg-orange/10 hover:text-orange"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Chakra bar decoration */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />

        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-white/20 hover:text-red-light hover:bg-red/10 rounded text-xs font-black uppercase tracking-widest transition-all">
          <LogOut size={16} />
          Quitter le clan
        </button>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-void border-b border-orange/20 px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange rounded flex items-center justify-center">
            <span className="text-void font-black text-xs">GM</span>
          </div>
          <span className="font-black uppercase text-white text-sm tracking-tight">Good<span className="text-orange">Mood</span></span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-20 bg-void pt-14 overflow-y-auto">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded text-sm font-black uppercase tracking-widest transition-all",
                  pathname === href ? "bg-orange text-void" : "text-white/50 hover:text-orange hover:bg-orange/10"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
            <div className="my-3 h-px bg-orange/20" />
            <button onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3.5 text-white/30 hover:text-red-light rounded text-sm font-black uppercase tracking-widest">
              <LogOut size={18} />
              Quitter le clan
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
