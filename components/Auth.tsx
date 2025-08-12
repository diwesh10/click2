"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin"|"signup">("signup");
  const [message, setMessage] = useState<string|undefined>();

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setMessage(undefined);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Account created! You can sign in now.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        location.href = "/dashboard";
      }
    } catch (err: any) {
      setMessage(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">{mode === "signup" ? "Create your account" : "Welcome back"}</h2>
      <form onSubmit={handleAuth} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full rounded-xl p-3 bg-gray-900 text-white">
          {mode === "signup" ? "Sign up" : "Sign in"}
        </button>
      </form>
      <p className="text-sm mt-3 text-gray-600">
        {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
        <button className="underline" onClick={() => setMode(mode === "signup" ? "signin" : "signup")}>
          {mode === "signup" ? "Sign in" : "Create an account"}
        </button>
      </p>
      {message && <p className="text-sm mt-3">{message}</p>}
    </div>
  );
}
