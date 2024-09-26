"use client";

import NoteProvider from "@/app/context/NoteContext";
import NotePage from "@/app/pages/NotePage";

export default function Home() {
  return (
    <NoteProvider>
      <NotePage />
    </NoteProvider>
  );
}
