import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Heading4Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const Heading5 = ({ children, className, ...props }: Heading4Props) => {
  return (
    <h5
      className={cn(
        "text-lg md:text-xl font-semibold tracking-tight bg-gradient-to-b from-[#dbdbc5] via-[#dbdbc5] via-[#c6c6af] to-[#dbdbc5] bg-clip-text text-transparent",
        className
      )}
      {...props}>
      {children}
    </h5>
  );
};
