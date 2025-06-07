import Heading from "@/components/heading";
import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Camera, Printer, Settings, RefreshCw, X } from "lucide-react";
import { motion } from "motion/react"; // Fixed import
import PreviewImages from "@/components/preview-images";
import { usePhotoPiPContext } from "@/context/PhotoPiPContext";
const videoConstraints = {
  width: 1280,
  height: 750,
  facingMode: "user",
};
const Studio = () => {
  const [state, dispatch] = usePhotoPiPContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isMirrored, setIsMirrored] = useState<boolean>(true);
  const [maxImages, setMaxImages] = useState<number>(4);
  const [countdown, setCountdown] = useState<number>(0);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const webcamRef = useRef<Webcam | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current
      ? webcamRef.current.getScreenshot()
      : null;
    if (imageSrc) {
      dispatch({ type: "ADD_IMAGE", payload: imageSrc });
    }
  }, [webcamRef, maxImages, dispatch]);

  const startCountdown = useCallback(() => {
    if (state.images.length < maxImages && !isCapturing) {
      setIsCapturing(true);
      setCountdown(4);
    }
  }, [state.images.length, maxImages, isCapturing]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCapturing && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isCapturing && countdown === 0) {
      capture();
      if (state.images.length < maxImages) {
        setTimeout(() => {
          setCountdown(4); // Reset countdown for the next capture
        }, 500);
        if (state.images.length + 1 >= maxImages) {
          setIsCapturing(false);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [countdown, isCapturing, capture]);

  useEffect(() => {
    if (state.images.length >= maxImages) {
      setTimeout(() => {
        dispatch({ type: "FINISH", payload: true });
        dispatch({ type: "START", payload: false });
      }, 1000);
    }
  }, [state.images.length, maxImages, dispatch]);

  return (
    <div className="container h-dvh mx-auto p-2 flex flex-col gap-6 items-center">
      <Heading className="lg:text-6xl" />
      <div className="w-full h-full flex sm:flex-row xl:justify-between sm:justify-center flex-col gap-6">
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
              width={450}
              className=""
              mirrored={isMirrored}
              videoConstraints={videoConstraints}
            />
            {isCapturing && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-white text-8xl font-bold animate-pulse">
                  {countdown}
                </div>
              </div>
            )}
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
        <PreviewImages images={state.images} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-6 size-fit"
      >
        <Dock>
          <DockIcon
            className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="size-6" />
          </DockIcon>
          <DockIcon
            onClick={() => {
              if (state.images.length < maxImages) {
                startCountdown();
              } else {
                dispatch({ type: "FINISH", payload: true });
                dispatch({ type: "START", payload: false });
              }
            }}
            className="bg-purple-400 text-white hover:bg-purple-500"
          >
            <Camera className="size-6" />
          </DockIcon>
          <DockIcon className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20">
            <Printer className="size-6" />
          </DockIcon>
        </Dock>
      </motion.div>
      {isSettingsOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-black/50 z-[99] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 shadow-lg w-full max-w-sm sm:max-w-md"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Settings</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {/* Camera Flip Setting */}
              <div className="flex flex-col space-y-2">
                <label className="font-medium">Camera Orientation</label>
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 sm:p-4">
                  <span className="text-sm">Flip Camera</span>
                  <button
                    id="flip-btn"
                    onClick={() => {
                      setIsMirrored(!isMirrored);
                    }}
                    className={`px-4 py-2 flex items-center gap-2 relative overflow-hidden ${
                      isMirrored
                        ? "bg-purple-500 text-white"
                        : "bg-gray-300 dark:bg-gray-600"
                    } transition-colors active:scale-95`}
                  >
                    <RefreshCw size={16} />
                    {isMirrored ? "Mirrored" : "Normal"}
                  </button>
                </div>
              </div>

              {/* Total Images Setting */}
              <div className="flex flex-col space-y-2">
                <label className="font-medium">Total Images</label>
                <div className="grid grid-cols-3 gap-3">
                  {[2, 3, 4].map((number) => (
                    <button
                      key={number}
                      onClick={() => {
                        setMaxImages(number);
                      }}
                      id={`btn-${number}`}
                      className={`px-2 sm:px-4 py-2 border-2 relative overflow-hidden ${
                        maxImages === number
                          ? "border-purple-500 bg-purple-100 dark:bg-purple-900/40"
                          : "border-gray-300 dark:border-gray-600"
                      } transition-all hover:border-purple-300 active:scale-95`}
                    >
                      {number} Images
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Current: {state.images.length} of {maxImages} images taken
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-3 bg-purple-500 text-white hover:bg-purple-600 transition-colors font-medium"
              >
                Apply & Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Studio;
