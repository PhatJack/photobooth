import React from "react";
import { usePhotoPiPContext } from "@/context/PhotoPiPContext";
import Heading from "@/components/heading";
import { cn } from "@/lib/utils";

const Finished = () => {
  const [state, dispatch] = usePhotoPiPContext();

  return (
    <div className="container h-dvh mx-auto p-2 flex flex-col gap-6 items-center">
      <Heading className="lg:text-6xl" />
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex flex-col gap-6 relative">
          {state.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Photo ${index + 1}`}
              className={cn(
                "w-[35%] h-auto absolute",
                index === 0 ? "left-1/3 top-0" : "",
                index === 1 ? "right-0 top-0" : "",
                index === 2 ? "left-0 bottom-0" : "",
              )}
            />
          ))}
          <img
            src="/frame/1.png"
            alt=""
            className="absolute left-0 top-0 h-[700px] -z-10"
          />
        </div>
        <div className="w-full"></div>
      </div>
      {/* <button
        onClick={() => {
          dispatch({ type: "FINISH", payload: false });
          dispatch({ type: "START", payload: true });
          dispatch({ type: "CLEAR_IMAGES" });
        }}
        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Take New Photos
      </button> */}
    </div>
  );
};

export default Finished;
