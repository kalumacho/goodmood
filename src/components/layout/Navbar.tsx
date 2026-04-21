"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Dumbbell,
  Salad,
  TrendingUp,
  Leaf,
  BookOpen,
  MessageCircle,
  Menu,
  X,
  LogOut,
  Sparkles,
  Star,
} from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sport", label: "Sport", icon: Dumbbell },
  { href: "/nutrition", label: "Nutrition", icon: Salad },
  { href: "/progress", label: "Progrès", icon: TrendingUp },
  { href: "/wellness", label: "Wellness", icon: Leaf },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/messages", label: "Messages", icon: MessageCircle },
];

interface NavbarProps {
  userEmail?: string | null;
  level?: number;
  levelTitle?: string;
}

export default function Navbar({ userEmail, level = 1, levelTitle = "Débutant" }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "?";
  const displayName = userEmail ? userEmail.split("@")[0] : "Invité";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-navy min-h-screen fixed left-0 top-0 z-30 p-6 border-r border-white/5">
        <Link href="/dashboard" className="mb-8 flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-coral flex items-center justify-center shadow-[0_6px_20px_-4px_rgba(232,114,74,0.55)] group-hover:scale-105 transition-transform">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Good<span className="text-coral">Mood</span>
          </span>
        </Link>

        <nav className="flex-1 flex flex-col gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-coral text-white shadow-[0_6px_20px_-4px_rgba(232,114,74,0.5)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(1.5rem+1px)] w-1 h-6 rounded-r-full bg-coral" />
                )}
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-coral to-coral-dark text-white font-bold flex items-center justify-center text-sm shrink-0">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white text-sm font-semibold truncate capitalize">{displayName}</div>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={10} className="text-coral shrink-0" />
                <span className="text-coral text-xs font-semibold">Niv. {level}</span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/40 text-xs truncate">{levelTitle}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-xl text-sm transition-all mt-2"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-navy/95 backdrop-blur px-4 py-3 flex items-center justify-between border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-coral flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            Good<span className="text-coral">Mood</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-20 bg-navy pt-16 animate-fade-in">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-all",
                    active
                      ? "bg-coral text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-coral-dark text-white font-bold flex items-center justify-center">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white text-sm font-semibold truncate">{displayName}</div>
                  <div className="text-white/40 text-xs truncate">{userEmail || ""}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-4 text-white/50 hover:text-white rounded-xl text-base"
              >
                <LogOut size={20} />
                Déconnexion
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
