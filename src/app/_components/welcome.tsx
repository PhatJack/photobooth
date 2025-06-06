"use client";
import React, { Dispatch, useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/backgroundbeamwithcollision";
import { WordRotate } from "@/components/ui/words-rotate";
import { Heart } from "lucide-react";
import Link from "next/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { ColourfulText } from "@/components/ui/colorful-text";
import { Highlight } from "@/components/ui/hero-highlight";
import BounceCards from "@/components/ui/bounce-cards";
import { Cover } from "@/components/ui/cover";
import Heading from "@/components/heading";
import { motion } from "motion/react";
import { usePhotoPiPContext } from "@/context/PhotoPiPContext";

const Welcome = () => {
  const [state, dispatch] = usePhotoPiPContext();
  const [isOpen, setIsOpen] = useState(false);

  const images = [
    "/cards/1.jpg",
    "/cards/2.jpg",
    "/cards/3.jpg",
    "/cards/4.jpg",
    "/cards/5.jpg",
  ];

  const transformStyles = [
    "rotate(5deg) translate(-200px)",
    "rotate(0deg) translate(-100px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(100px)",
    "rotate(-5deg) translate(200px)",
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/PhatJack/",
      icon: "GH",
      bgColor: "bg-[#181717]",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/phat-nguyen-tien-733397286/",
      icon: "IN",
      bgColor: "bg-[#0A66C2]",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/jack.willam2003",
      icon: "FB",
      bgColor: "bg-[#0866FF]",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/sep_neit.tahp/",
      icon: "IG",
      bgColor: "bg-[#FF0069]",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <BackgroundBeamsWithCollision className="h-screen bg-background">
      <motion.div
        className="w-full flex flex-col items-center space-y-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex gap-2" variants={fadeInUp}>
          <Heading />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <WordRotate
            className="text-base sm:text-2xl font-medium text-foreground"
            words={[
              "Capture the Moment. Cherish the Memory.",
              "Timeless Photos, Effortless Fun.",
              "Making Your Moments Unforgettable.",
            ]}
          />
        </motion.div>
        <motion.button
          type="button"
          aria-label="Start"
          onClick={() => {
            dispatch({ type: "START", payload: true });
          }}
          className="w-fit cursor-pointer px-8 py-1 border-2 border-black dark:border-white uppercase bg-white text-black shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] hover:translate-y-[-2px] hover:shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_rgba(0,0,0),6px_6px_rgba(0,0,0)] dark:hover:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_rgba(255,255,255),6px_6px_rgba(255,255,255)]"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start
        </motion.button>
        <motion.div
          className="flex flex-col items-center gap-2 sm:text-lg"
          variants={fadeInUp}
        >
          <div>
            Developed by{" "}
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
              <ModalTrigger className="p-0 font-semibold cursor-pointer">
                <Highlight>Jack Phat</Highlight>
              </ModalTrigger>
              <ModalBody>
                <ModalContent>
                  <div className="flex flex-col space-y-4">
                    <Cover>👨‍💻 Developer Detail</Cover>
                    <p className="text-balance">
                      👋 Hi there! I&apos;m{" "}
                      <ColourfulText text="Jack Phat" className="font-bold" />,
                      a passionate front-end developer and the creator of this
                      platform{" "}
                      <ColourfulText text="PhotoPiP" className="font-bold" />. I
                      built this website to make capturing and sharing moments
                      more fun and engaging.
                      <br />
                      🛠️ This project was built with{" "}
                      <span className="font-semibold">Next.js</span> and uses{" "}
                      <span className="font-semibold">Framer Motion</span> and{" "}
                      <span className="font-semibold">GSAP</span> for smooth
                      animation.
                      <br />
                    </p>

                    <div className="flex justify-between items-center border-y py-2 border-gray-300">
                      <span>Socials</span>
                      <div className="flex gap-2">
                        {socialLinks.map((link, index) => (
                          <Link
                            key={index}
                            href={link.url}
                            target="_blank"
                            className={`"size-10 px-3 py-2 aspect-square flex items-center justify-center ${link.bgColor} text-white`}
                          >
                            {link.icon}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </ModalContent>
                <ModalFooter>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 font-semibold bg-gray-100 text-black dark:bg-black dark:border-white dark:text-white border-2 border-black text-sm hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-500 dark:hover:text-white w-full"
                  >
                    Close
                  </button>
                </ModalFooter>
              </ModalBody>
            </Modal>
          </div>
          <motion.p
            className="flex items-center gap-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Built with{" "}
            <Heart
              className="animate-heartbeat"
              size={20}
              fill="red"
              stroke="none"
            />
          </motion.p>
          <div className="mt-10 sm:block hidden">
            <BounceCards
              images={images}
              containerWidth={500}
              containerHeight={250}
              animationDelay={2}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.5)"
              transformStyles={transformStyles}
              enableHover={true}
            />
          </div>
        </motion.div>
      </motion.div>
    </BackgroundBeamsWithCollision>
  );
};

export default Welcome;
