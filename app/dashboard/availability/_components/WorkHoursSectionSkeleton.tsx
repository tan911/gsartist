import { Card } from '@/components/ui/card'

export function WorkingHoursSectionSkeleton() {
    const skeletonDays = Array(7).fill(null) // mimic 7 days

    return (
        <Card className="p-4 md:p-8 animate-pulse">
            <div className="h-6 w-40 bg-gray-200 rounded mb-6" /> {/* Heading */}
            <div className="space-y-0">
                {skeletonDays.map((_, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between py-2 md:py-4 border-b border-gray-100 last:border-b-0"
                    >
                        {/* Left side: checkbox + label */}
                        <div className="flex items-center space-x-4">
                            <div className="h-4 w-4 bg-gray-200 rounded" /> {/* checkbox */}
                            <div className="h-4 w-20 bg-gray-200 rounded" /> {/* day label */}
                        </div>

                        {/* Right side: inputs or unavailable */}
                        <div className="flex items-center space-x-2">
                            <div className="h-6 w-16 bg-gray-200 rounded" /> {/* start time */}
                            <div className="h-4 w-6 bg-gray-200 rounded" /> {/* "to" text */}
                            <div className="h-6 w-16 bg-gray-200 rounded" /> {/* end time */}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
