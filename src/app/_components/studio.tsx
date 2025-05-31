import Heading from "@/components/heading";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Camera, Printer, Settings } from "lucide-react";
import { motion } from "motion/react";
import PreviewImages from "@/components/preview-images";
const videoConstraints = {
  width: 1280,
  height: 750,
  facingMode: "user",
};
const Studio = () => {
  const [images, setImages] = useState<string[]>([]);
  const webcamRef = useRef<Webcam | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current
      ? webcamRef.current.getScreenshot()
      : null;
    if (imageSrc) {
      setImages((prevImages) => [...prevImages, imageSrc]);
    }
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div className="container h-auto mx-auto p-2 flex flex-col space-y-16 items-center justify-center sm:p-20">
      <Heading className="lg:text-6xl" />
      <div className="w-full flex sm:flex-row xl:justify-between justify-center flex-col gap-6">
        <div
          id="webcam-container"
          className="w-full relative flex sm:justify-start items-center justify-center"
        >
          <div className="w-[75%] sm:w-fit border-[8] border-b-[50] border-transparent border-solid [border-image:url('/frame-display.webp')_55_fill] relative">
            <Webcam
              audio={false}
              height={900}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={550}
              className=""
              videoConstraints={videoConstraints}
            />
            <img
              src={"/paper-plane.png"}
              alt="sticker"
              width={60}
              height={60}
              className="sm:block hidden absolute -top-12 -left-10 size-24 object-cover"
            />
            <img
              src={"/flower.gif"}
              alt="sticker"
              width={60}
              height={60}
              className="sm:block hidden absolute -top-10 -right-10 size-24 object-cover"
            />
            <img
              src={"/cute.gif"}
              alt="sticker"
              width={60}
              height={60}
              className="sm:block hidden absolute -top-[78px] right-2/5 size-20 sm:size-28 object-contain -rotate-[13deg]"
            />
          </div>
        </div>
        <PreviewImages images={images} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-10 size-fit"
      >
        <Dock direction="middle">
          <DockIcon className="bg-black/10 dark:bg-white/10">
            <Settings className="size-6" />
          </DockIcon>
          <DockIcon
            onClick={() => capture()}
            className="bg-purple-400 text-white"
          >
            <Camera className="size-6" />
          </DockIcon>
          <DockIcon className="bg-black/10 dark:bg-white/10">
            <Printer className="size-6" />
          </DockIcon>
        </Dock>
      </motion.div>
    </div>
  );
};

export default Studio;
