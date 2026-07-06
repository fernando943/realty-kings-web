"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatFunnel } from "@/components/ChatFunnel";

function ChatInner() {
  const searchParams = useSearchParams();
  const prefilledAddress = searchParams?.get("address") || "";
  return <ChatFunnel variant="fullscreen" initialAddress={prefilledAddress} />;
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <ChatInner />
    </Suspense>
  );
}
