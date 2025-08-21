import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Heading1Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className, ...props }: Heading1Props) => {
  return (
    <h1
      className={cn(
        "text-xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
        className
      )}
      {...props}>
      {children}
    </h1>
  );
};
