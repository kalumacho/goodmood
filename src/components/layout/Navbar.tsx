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
      <aside className="hidden lg:flex flex-col w-64 bg-navy min-h-screen fixed left-0 top-0 z-30 p-6">
        <Link href="/dashboard" className="mb-10">
          <span className="text-2xl font-bold text-white tracking-tight">
            Good<span className="text-coral">Mood</span>
          </span>
        </Link>

        <nav className="flex-1 flex flex-col gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === href || pathname.startsWith(href + "/")
                  ? "bg-coral text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white hover:bg-white/10 rounded-xl text-sm transition-all mt-auto"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-navy px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard">
          <span className="text-xl font-bold text-white">
            Good<span className="text-coral">Mood</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-20 bg-navy pt-16">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-all",
                  pathname === href
                    ? "bg-coral text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon size={20} />
                {label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-4 text-white/50 hover:text-white rounded-xl text-base mt-4"
            >
              <LogOut size={20} />
              Déconnexion
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
