export const dynamic = "force-dynamic";
import OnboardingFlow from "./OnboardingFlow";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Initialisation du Ninja" };

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute inset-0 manga-lines opacity-20" />
      <div className="relative w-full">
        <OnboardingFlow />
      </div>
    </div>
  );
}
