import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreviewImagesProps {
  images?: string[];
}

const PreviewImages = ({ images }: PreviewImagesProps) => {
  // Track hovered images to enhance animations on hover
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Define smooth spring animation configuration
  const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20
  };

  return (
    <div className="w-[90%] sm:mx-0 mx-auto sm:w-full flex flex-col items-center justify-center space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
      >
        Preview Image
      </motion.h1>
      <AnimatePresence>
        {images && images.length > 0 ? (
          <motion.div 
            className="w-full grid grid-cols-2 gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.7}}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: hoveredIndex === index ? -10 : 0 
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
                transition={{
                  ...springTransition,
                  delay: index * 0.15,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative"
              >
                <motion.img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="size-full object-cover shadow-lg border-[8] border-b-[30] border-gray-200 dark:border-gray-800"
                  style={{
                    boxShadow: hoveredIndex === index ? 
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : 
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="w-full grid grid-cols-2 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[1, 2, 3, 4].map((num, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  scale: 0.7, 
                  // rotate: index === 0 ? 5 : index === 1 ? -8 : index === 2 ? -10 : 12
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  // rotate: index === 0 ? 3 : index === 1 ? -6 : index === 2 ? -6 : 8,
                  y: hoveredIndex === index ? -10 : 0 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
                transition={{ 
                  ...springTransition,
                  delay: index * 0.15 
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative overflow-visible size-full"
              >
                <motion.img
                  src={`/preview-image/${num}.png`}
                  alt={`Preview ${num}`}
                  className="size-full sm:size-[90%] object-cover shadow-md border-[8] border-b-[30] border-gray-200 dark:border-gray-800"
                  style={{
                    boxShadow: hoveredIndex === index ? 
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : 
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreviewImages;
