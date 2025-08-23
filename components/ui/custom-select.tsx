import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface Option {
    value: string
    label: string
}

interface CustomSelectProps {
    label?: string
    error?: string
    helpText?: string
    className?: string
    options: Option[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
    disabled?: boolean
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
    label,
    error,
    helpText,
    className = '',
    options,
    value,
    onChange,
    placeholder = '',
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find((option) => option.value === value)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen)
        }
    }

    const handleSelect = (optionValue: string) => {
        onChange(optionValue)
        setIsOpen(false)
    }

    return (
        <div className={`w-full relative ${className}`} ref={dropdownRef}>
            {label && (
                <label
                    id="select-label"
                    className="block text-sm font-medium text-gray-700 mb-0 md:mb-2"
                >
                    {label}
                </label>
            )}

            <div
                className={`w-full border rounded-lg px-4 py-2 bg-white ${
                    error ? 'border-red-500' : 'border-gray-300'
                } shadow-sm transition-all focus:outline-none ${
                    !disabled && 'hover:border-purple-300'
                } cursor-pointer flex justify-between items-center ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ${
                    isOpen
                        ? `border-${error ? 'red' : 'purple'}-400 ring-0 ring-${
                              error ? 'red' : 'purple'
                          }-500`
                        : ''
                }`}
                onClick={toggleDropdown}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls="dropdown-options"
                aria-labelledby={label ? 'select-label' : undefined}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'select-error' : helpText ? 'select-help' : undefined}
                tabIndex={disabled ? -1 : 0}
            >
                <span
                    className={`${
                        !selectedOption ? 'text-gray-400' : 'text-gray-700'
                    } text-xs md:text-sm`}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                />
            </div>

            {isOpen && (
                <div
                    id="dropdown-options"
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
                    role="listbox"
                    aria-labelledby={label ? 'select-label' : undefined}
                >
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`px-4 py-2 cursor-pointer hover:bg-purple-50 text-gray-700 transition-colors ${
                                value === option.value
                                    ? 'bg-purple-100 font-semibold text-purple-700'
                                    : ''
                            }`}
                            role="option"
                            aria-selected={value === option.value}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}

            {helpText && !error && (
                <p id="select-help" className="text-xs text-gray-500 mt-1">
                    {helpText}
                </p>
            )}
            {error && (
                <p id="select-error" className="text-xs text-red-600 mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}
