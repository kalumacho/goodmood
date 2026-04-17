export const dynamic = "force-dynamic";
import OnboardingFlow from "./OnboardingFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personnalisation",
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <OnboardingFlow />
    </div>
  );
}
