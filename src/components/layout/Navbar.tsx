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
  { href: "/nutrition", label: "Nutrition", icon: Salad },
  { href: "/progress", label: "Progression", icon: TrendingUp },
  { href: "/wellness", label: "Chakra", icon: Sparkles },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/messages", label: "Coach", icon: MessageCircle },
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
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r-2 border-navy min-h-screen fixed left-0 top-0 z-30 p-6">
        {/* Logo */}
        <Link href="/dashboard" className="mb-10 block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-coral border-2 border-navy rounded-xl shadow-[3px_3px_0px_#0D1B2A] flex items-center justify-center">
              <span className="text-white font-black text-sm">GM</span>
            </div>
            <div>
              <div className="text-lg font-black uppercase tracking-tight text-navy leading-none">
                Good<span className="text-coral">Mood</span>
              </div>
              <div className="text-xs text-navy/40 uppercase tracking-widest font-bold">Ninja Wellness</div>
            </div>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={href} href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-150",
                  active
                    ? "bg-coral text-white border-2 border-navy shadow-[2px_2px_0px_#0D1B2A] -translate-x-0.5 -translate-y-0.5"
                    : "text-navy/50 hover:text-navy hover:bg-coral/10 border-2 border-transparent"
                )}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="my-4 h-0.5 bg-navy/10" />

        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-navy/30 hover:text-red-500 hover:bg-red-50 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 border-transparent">
          <LogOut size={15} />
          Déconnexion
        </button>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b-2 border-navy px-4 h-14 flex items-center justify-between shadow-[0_2px_0px_#0D1B2A]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-coral border-2 border-navy rounded-lg shadow-[2px_2px_0px_#0D1B2A] flex items-center justify-center">
            <span className="text-white font-black text-xs">GM</span>
          </div>
          <span className="font-black uppercase text-navy text-sm tracking-tight">
            Good<span className="text-coral">Mood</span>
          </span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="text-navy border-2 border-navy rounded-lg w-9 h-9 flex items-center justify-center shadow-[2px_2px_0px_#0D1B2A] bg-white">
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-20 bg-cream pt-14 overflow-y-auto animate-fade-in">
          <nav className="flex flex-col gap-2 p-4">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all border-2",
                    active
                      ? "bg-coral text-white border-navy shadow-[3px_3px_0px_#0D1B2A]"
                      : "text-navy/60 border-transparent hover:bg-coral/10 hover:text-coral"
                  )}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
            <div className="my-2 h-0.5 bg-navy/10" />
            <button onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3.5 text-navy/30 hover:text-red-500 rounded-xl text-sm font-black uppercase tracking-widest border-2 border-transparent">
              <LogOut size={18} />
              Déconnexion
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
