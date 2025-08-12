"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { track } from "@/lib/track";

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Hello {email ?? "Learner"} 👋</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 space-y-3">
          <h2 className="text-xl font-semibold">Start Learning</h2>
          <p className="text-gray-600">Read a quick text lesson and watch a short video.</p>
          <Link href="/lesson/html-basics" className="inline-block rounded-xl px-4 py-2 border"
            onClick={() => track({ event_type: "click", target: "start_lesson", page: "/dashboard" })}>
            Go to Lesson
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 space-y-3">
          <h2 className="text-xl font-semibold">Take a Quiz</h2>
          <p className="text-gray-600">Test your knowledge with instant tracking.</p>
          <Link href="/quiz/html-basics" className="inline-block rounded-xl px-4 py-2 border"
            onClick={() => track({ event_type: "click", target: "start_quiz", page: "/dashboard" })}>
            Go to Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
