"use client";
import { useState } from "react";
import Welcome from "./_components/welcome";
import Studio from "./_components/studio";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  if (isStarted) {
    return <Studio />;
  }
  return <Welcome isStarted={isStarted} setIsStarted={setIsStarted} />;
}
