import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export const Paragraph = ({
  children,
  className,
  ...props
}: ParagraphProps) => {
  return (
    <p
      className={cn("leading-relaxed text-sm md:text-base", className)}
      {...props}>
      {children}
    </p>
  );
};
