export const dynamic = "force-dynamic";
import OnboardingFlow from "./OnboardingFlow";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Initialisation du Ninja" };

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-paper" />
      <div className="absolute inset-0 speed-lines opacity-30" />
      <div className="absolute bottom-0 right-0 w-64 h-64 halftone opacity-20" />
      <div className="relative w-full">
        <OnboardingFlow />
      </div>
    </div>
  );
}
