import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface MetaTextProps extends HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode
    className?: string
}

export const Meta = ({ children, className, ...props }: MetaTextProps) => {
    return (
        <span className={cn('leading-relaxed text-xs md:text-sm', className)} {...props}>
            {children}
        </span>
    )
}
