import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helpText,
  className = "",
  children,
  ...props
}) => {
  return (
    <div className="w-full relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-0 md:mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full border rounded-lg px-4 py-2 pr-10 bg-white border-gray-300 shadow-sm transition-all focus:outline-none focus:ring-0 focus:ring-purple-500 focus:border-purple-400 hover:border-purple-300 appearance-none ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}>
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-12.5 -translate-y-1/2 text-gray-500">
        <ChevronDown className="w-5 h-5" />
      </span>
      {helpText && !error && (
        <p className="text-xs text-gray-500 mt-1">{helpText}</p>
      )}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};
