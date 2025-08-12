"use client";

import { useRef, useEffect } from "react";
import { track } from "@/lib/track";

type Props = {
  src: string;
  poster?: string;
};

export default function VideoPlayer({ src, poster }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPlay = () => track({ event_type: "video_play", video_time: el.currentTime });
    const onPause = () => track({ event_type: "video_pause", video_time: el.currentTime });
    const onEnded = () => track({ event_type: "video_ended", video_time: el.currentTime });
    const onSeeked = () => track({ event_type: "video_seeked", video_time: el.currentTime });

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("seeked", onSeeked);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("seeked", onSeeked);
    };
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden shadow bg-black">
      <video ref={ref} controls poster={poster} className="w-full h-auto">
        <source src={src} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
