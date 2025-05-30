import Heading from "@/components/heading";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import Image from "next/image";
import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
const videoConstraints = {
  width: 1280,
  height: 750,
  facingMode: "user",
};
const Studio = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current
      ? webcamRef.current.getScreenshot()
      : null;
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div className="container h-auto mx-auto p-2 flex flex-col sm:space-y-16 items-center justify-center sm:p-20">
      <Heading className="lg:text-6xl" />
      <div className="w-full flex sm:flex-row xl:justify-start justify-center flex-col">
        <div
          id="webcam-container"
          className="relative border-[8] border-b-[50] border-transparent border-solid [border-image:url('/frame-display.webp')_55_fill]"
        >
          <Webcam
            audio={false}
            height={800}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={550}
            videoConstraints={videoConstraints}
          />
          <img
            src={"/paper-plane.png"}
            alt="sticker"
            width={60}
            height={60}
            className="absolute -top-12 -left-10 size-24 object-cover"
          />
          <img
            src={"/flower.gif"}
            alt="sticker"
            width={60}
            height={60}
            className="absolute -top-10 -right-10 size-24 object-cover"
          />
          <img
            src={"/cute.gif"}
            alt="sticker"
            width={60}
            height={60}
            className="absolute -top-[78px] right-2/5 size-28 object-contain -rotate-[13deg]"
          />
        </div>
        {/* <button onClick={capture}>Capture photo</button> */}
      </div>
    </div>
  );
};

export default Studio;
