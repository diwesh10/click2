"use client";

import { useMemo, useState } from "react";
import { track } from "@/lib/track";

type Q = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export default function Quiz({ quizId }: { quizId: string }) {
  const questions: Q[] = useMemo(() => [
    { id: "q1", question: "What does HTML stand for?", options: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "HyperText Markup Language", "Hyper Tool Multi Language"], correctIndex: 2 },
    { id: "q2", question: "Which tag creates a link?", options: ["<link>", "<a>", "<href>", "<url>"], correctIndex: 1 },
    { id: "q3", question: "Where does the <title> tag belong?", options: ["<body>", "<head>", "<footer>", "<main>"], correctIndex: 1 }
  ], []);

  const [answers, setAnswers] = useState<Record<string, number | null>>(
    Object.fromEntries(questions.map(q => [q.id, null]))
  );
  const [submitted, setSubmitted] = useState(false);

  function select(q: Q, idx: number) {
    setAnswers(prev => ({ ...prev, [q.id]: idx }));
    track({
      event_type: "quiz_answer",
      quiz_id: quizId,
      quiz_question_id: q.id,
      quiz_answer: q.options[idx],
      quiz_correct: idx === q.correctIndex
    });
  }

  function submit() {
    const score = questions.reduce((acc, q) => acc + ((answers[q.id] === q.correctIndex) ? 1 : 0), 0);
    setSubmitted(true);
    track({
      event_type: "quiz_submit",
      quiz_id: quizId,
      metadata: { score, total: questions.length, answers }
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-6">
      <h2 className="text-2xl font-bold">Quiz: HTML Basics</h2>
      {questions.map((q, i) => (
        <div key={q.id} className="space-y-3">
          <p className="font-medium">{i+1}. {q.question}</p>
          <div className="grid md:grid-cols-2 gap-2">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => select(q, idx)}
                className={`text-left border rounded-xl p-3 ${answers[q.id] === idx ? "border-black" : ""}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button onClick={submit} className="rounded-xl px-4 py-2 bg-gray-900 text-white">Submit</button>
      ) : (
        <p className="text-green-700 font-medium">Submitted! Check your score in the toast above and your events in Supabase.</p>
      )}
    </div>
  );
}
