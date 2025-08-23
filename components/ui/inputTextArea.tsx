interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helpText,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full px-1">
      {label && (
        <label className="block text-sm md:text-base font-medium text-gray-700 mb-0 md:mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:outline-none focus:ring-1 ${error ? "focus:ring-red-500" : "focus:ring-purple-500"} focus:border-transparent appearance-none ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${props.id || props.name}-error` : undefined}
        {...props}
      />
      {helpText && !error && (
        <p className="text-xs text-gray-500 mt-0 md:mt-1">{helpText}</p>
      )}
      {error && (
        <p 
          className="text-xs text-red-600 mt-0 md:mt-1"
          id={`${props.id || props.name}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
