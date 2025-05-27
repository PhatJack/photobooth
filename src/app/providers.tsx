import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-providers";
import React from "react";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <div className="absolute size-fit top-4 right-4 z-50">
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
};

export default Providers;
