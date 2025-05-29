"use client";
import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/backgroundbeamwithcollision";
import { LineShadowText } from "@/components/ui/lineshadowtext";
import { useTheme } from "next-themes";
import { AuroraText } from "@/components/ui/aurora-text";
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

const Welcome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const shadowColor = theme.theme === "dark" ? "white" : "black";

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

  return (
    <BackgroundBeamsWithCollision className="h-screen bg-background">
      <div className="w-full flex flex-col items-center space-y-4">
        <div className="flex gap-2">
          <h1 className="text-foreground w-auto flex gap-1 text-center text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            <LineShadowText className="italic" shadowColor={shadowColor}>
              Photo
            </LineShadowText>
            <AuroraText>PiP</AuroraText>
          </h1>
        </div>
        <WordRotate
          className="text-base sm:text-2xl font-medium text-foreground"
          words={[
            "Capture the Moment. Cherish the Memory.",
            "Timeless Photos, Effortless Fun.",
            "Making Your Moments Unforgettable.",
          ]}
        />
        <button
          type="button"
          aria-label="Start"
          className="w-fit cursor-pointer px-8 py-1 border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
        >
          Start
        </button>
        <div className="flex flex-col items-center gap-2 sm:text-lg">
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
          <p className="flex items-center gap-0.5">
            Built with{" "}
            <Heart
              className="animate-heartbeat"
              size={20}
              fill="red"
              stroke="none"
            />
          </p>
          <div className="mt-10 sm:block hidden">
            <BounceCards
              images={images}
              containerWidth={500}
              containerHeight={250}
              animationDelay={1}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.5)"
              transformStyles={transformStyles}
              enableHover={true}
            />
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default Welcome;
