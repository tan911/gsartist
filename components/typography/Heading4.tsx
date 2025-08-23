import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface Heading4Props extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
    className?: string
}

export const Heading4 = ({ children, className, ...props }: Heading4Props) => {
    return (
        <h4
            className={cn(
                'text-base md:text-lg font-semibold tracking-tight bg-gradient-to-b from-purple-600 to-pink-600 bg-clip-text text-transparent',
                className
            )}
            {...props}
        >
            {children}
        </h4>
    )
}
