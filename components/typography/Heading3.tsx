import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Heading3Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const Heading3 = ({ children, className, ...props }: Heading3Props) => {
  return (
    <h3
      className={cn(
        "text-lg md:text-xl font-semibold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
        className
      )}
      {...props}>
      {children}
    </h3>
  );
};
