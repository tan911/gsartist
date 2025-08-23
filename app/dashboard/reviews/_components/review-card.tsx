import React from 'react'
import { Star } from 'lucide-react'
import { Review } from '@/types'

interface ReviewCardProps {
    review: Review
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{review.client}</span>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                        i < review.rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                    {review.service && (
                        <span className="text-xs text-gray-500">{review.service}</span>
                    )}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
            </div>

            <p className="text-gray-700 text-sm">{review.comment}</p>

            {review.replied && review.replyText && (
                <div className="mt-2 p-2 bg-gray-50 border-l-4 border-green-400 text-sm text-gray-600">
                    <strong className="block text-green-700">Reply:</strong>
                    {review.replyText}
                </div>
            )}
        </div>
    )
}
