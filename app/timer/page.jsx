"use client";

import TimerProvider from "@/app/context/TimerContext";
import TimerPage from '@/app/pages/TimerPage'

export default function Home() {
  return (
    <TimerProvider>
      <TimerPage />
    </TimerProvider>
  );
}
