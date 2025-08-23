import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface Heading2Props extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
    className?: string
}

export const Heading2 = ({ children, className, ...props }: Heading2Props) => {
    return (
        <h2
            className={cn(
                'text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent',
                className
            )}
            {...props}
        >
            {children}
        </h2>
    )
}
