import React from 'react'
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from './buttonnew'

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    text?: string
    className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    text = 'Loading...',
    className = '',
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    }

    return (
        <div className={`flex items-center justify-center space-x-2 ${className}`}>
            <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
            {text && <span className="text-sm text-gray-600">{text}</span>}
        </div>
    )
}

interface ErrorDisplayProps {
    error: string
    onRetry?: () => void
    className?: string
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry, className = '' }) => {
    return (
        <div className={`flex flex-col items-center justify-center space-y-4 p-6 ${className}`}>
            <AlertCircle className="w-12 h-12 text-red-500" />
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
                <p className="text-sm text-gray-600 mb-4">{error}</p>
                {onRetry && (
                    <Button
                        onClick={onRetry}
                        variant="primary"
                        className="flex items-center space-x-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>Try Again</span>
                    </Button>
                )}
            </div>
        </div>
    )
}

interface DataWrapperProps {
    isLoading: boolean
    isError: boolean
    error: string | null
    onRetry?: () => void
    children: React.ReactNode
    loadingText?: string
    className?: string
}

export const DataWrapper: React.FC<DataWrapperProps> = ({
    isLoading,
    isError,
    error,
    onRetry,
    children,
    loadingText = 'Loading data...',
    className = '',
}) => {
    if (isLoading) {
        return (
            <div className={`min-h-[200px] flex items-center justify-center ${className}`}>
                <LoadingSpinner text={loadingText} />
            </div>
        )
    }

    if (isError && error) {
        return <ErrorDisplay error={error} onRetry={onRetry} className={className} />
    }

    return <>{children}</>
}

interface SkeletonProps {
    className?: string
    count?: number
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={`animate-pulse bg-gray-200 rounded ${className}`} />
            ))}
        </>
    )
}

// Common skeleton patterns
export const CardSkeleton: React.FC = () => (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    </div>
)

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
    rows = 5,
    columns = 4,
}) => (
    <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex space-x-4">
                {Array.from({ length: columns }).map((_, colIndex) => (
                    <Skeleton key={colIndex} className="h-4 flex-1" />
                ))}
            </div>
        ))}
    </div>
)
