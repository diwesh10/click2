"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/track";

export default function NavBar() {
  const pathname = usePathname();

  useEffect(() => {
    track({ event_type: "page_view", page: pathname || "/" });
  }, [pathname]);

  async function signOut() {
    await supabase.auth.signOut();
    location.href = "/";
  }

  return (
    <nav className="w-full border-b bg-white">
      <div className="container flex items-center justify-between py-3">
        <Link href="/dashboard" className="font-bold">LearnTrack</Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" data-track="nav-dashboard">Dashboard</Link>
          <Link href="/lesson/html-basics" data-track="nav-lesson">Lesson</Link>
          <Link href="/quiz/html-basics" data-track="nav-quiz">Quiz</Link>
          <button onClick={signOut} className="rounded-xl px-3 py-2 border">Sign out</button>
        </div>
      </div>
    </nav>
  );
}
