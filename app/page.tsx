"use client";

import NoteProvider from "./context/NoteContext";
import NotePage from "./pages/NotePage";

export default function Home() {
  return (
    <NoteProvider>
      <NotePage />
    </NoteProvider>
  );
}
