"use client";
import Welcome from "./_components/welcome";
import Studio from "./_components/studio";
import { usePhotoPiPContext } from "@/context/PhotoPiPContext";
import Finished from "./_components/finished";

export default function Home() {
  const [state] = usePhotoPiPContext();
	console.log(state)
  if (state.isStarted) {
    return <Studio />;
  }
	if(state.isFinished) {
		return <Finished />
	}
  return <Welcome />;
}
