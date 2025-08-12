"use client";

import { useParams } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import { track } from "@/lib/track";
import { useEffect } from "react";

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    track({ event_type: "lesson_open", page: `/lesson/${slug}` });
  }, [slug]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold">Lesson: HTML Basics</h1>
        <p className="text-gray-700 mt-2">
          HTML is the structure of the web. You build documents with tags like <code>&lt;h1&gt;</code>,
          <code>&lt;p&gt;</code>, and <code>&lt;a&gt;</code>. Attributes like <code>href</code> add extra meaning.
        </p>
        <ul className="list-disc pl-6 mt-3 text-gray-700 space-y-1">
          <li>Documents start with <code>&lt;!doctype html&gt;</code></li>
          <li>Structure: <code>&lt;html&gt; &lt;head&gt; &lt;body&gt;</code></li>
          <li>Links: <code>&lt;a href="https://example.com"&gt;Example&lt;/a&gt;</code></li>
        </ul>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Watch: HTML in 60 seconds</h2>
        <VideoPlayer
          src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
          poster="https://dummyimage.com/1200x675/000/fff&text=HTML+Basics"
        />
      </div>
      <button
        className="rounded-xl px-4 py-2 border"
        onClick={() => track({ event_type: "click", page: `/lesson/${slug}`, target: "cta_next_quiz" })}
      >
        Next: Take the Quiz
      </button>
    </div>
  );
}
