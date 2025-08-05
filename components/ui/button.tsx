// import React from "react";
// import { cn } from "@/lib/utils";
// import { ButtonProps } from "@/types";

// export const Button: React.FC<ButtonProps> = ({
//   variant = "primary",
//   size = "md",
//   className,
//   children,
//   ...props
// }) => {
//   const baseClasses =
//     "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

//   const variants = {
//     primary:
//       "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
//     secondary:
//       "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
//     ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
//     danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
//   };

//   const sizes = {
//     sm: "px-3 py-1.5 text-sm",
//     md: "px-4 py-2 text-sm",
//     lg: "px-6 py-3 text-base",
//   };

//   return (
//     <button
//       className={cn(baseClasses, variants[variant], sizes[size], className)}
//       {...props}>
//       {children}
//     </button>
//   );
// };
