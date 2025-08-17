interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-0 md:mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {helpText && !error && (
        <p className="text-xs text-gray-500 mt-0 md:mt-1">{helpText}</p>
      )}
      {error && <p className="text-xs text-red-600 mt-0 md:mt-1">{error}</p>}
    </div>
  );
};
