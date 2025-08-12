"use client";

import { supabase } from "@/lib/supabaseClient";

type TrackPayload = {
  event_type: string;
  page?: string;
  target?: string;
  video_time?: number;
  quiz_id?: string;
  quiz_question_id?: string;
  quiz_answer?: string;
  quiz_correct?: boolean;
  metadata?: Record<string, any>;
};

export async function track(payload: TrackPayload) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const user_id = userData.user?.id;
    if (!user_id) {
      // silently ignore if not logged in
      return;
    }
    const row = { user_id, ...payload };
    await supabase.from("clickstream").insert(row);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("track error", e);
  }
}
