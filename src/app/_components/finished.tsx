import React from "react";
import { usePhotoPiPContext } from "@/context/PhotoPiPContext";
import Heading from "@/components/heading";

const Finished = () => {
  const [state, dispatch] = usePhotoPiPContext();

  return (
    <div className="container h-dvh mx-auto p-2 flex flex-col gap-6 items-center">
      <Heading className="lg:text-6xl" />
      <div className="grid grid-cols-2 gap-4">
        {state.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Photo ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        ))}
      </div>
      <button
        onClick={() => {
          dispatch({ type: "FINISH", payload: false });
          dispatch({ type: "START", payload: true });
          dispatch({ type: "CLEAR_IMAGES" });
        }}
        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Take New Photos
      </button>
    </div>
  );
};

export default Finished;
