import React from 'react'

const UnreadBadge = ({ count, className = '' }: { count: number; className?: string }) =>
    count > 0 ? (
        <span
            className={`flex items-center justify-center w-4 h-4 md:w-6 md:h-6 text-xs font-bold text-white bg-red-500 rounded-full shadow ring-2 ring-white ${className}`}
        >
            {count > 99 ? '99+' : count}
        </span>
    ) : null

export default UnreadBadge
