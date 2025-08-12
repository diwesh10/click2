"use client";

import { useParams } from "next/navigation";
import Quiz from "@/components/Quiz";
import { useEffect } from "react";
import { track } from "@/lib/track";

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();

  useEffect(() => {
    track({ event_type: "quiz_open", quiz_id: quizId, page: `/quiz/${quizId}` });
  }, [quizId]);

  return (
    <div className="space-y-6">
      <Quiz quizId={quizId} />
    </div>
  );
}
