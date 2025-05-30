"use client";
import { useTheme } from "next-themes";
import React from "react";
import { LineShadowText } from "./ui/lineshadowtext";
import { AuroraText } from "./ui/aurora-text";
import { cn } from "@/lib/utils";

const Heading = ({ className }: { className?: string }) => {
  const theme = useTheme();
  const shadowColor = theme.theme === "dark" ? "white" : "black";
  return (
    <h1
      className={cn(
        "text-foreground w-auto flex gap-1 text-center text-balance text-5xl font-bold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl",
        className
      )}
    >
      <LineShadowText className="italic" shadowColor={shadowColor}>
        Photo
      </LineShadowText>
      <AuroraText>PiP</AuroraText>
    </h1>
  );
};

export default Heading;
