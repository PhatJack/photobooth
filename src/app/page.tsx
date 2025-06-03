"use client";
import Welcome from "./_components/welcome";
import Studio from "./_components/studio";
import { usePhotoPiPContext } from "@/context/PhotoPiPContext";

export default function Home() {
  const [state] = usePhotoPiPContext();
  if (state.isStarted) {
    return <Studio />;
  }
  return <Welcome />;
}
