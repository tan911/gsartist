import React from 'react'
import { Star, Users, CheckCircle, AlertCircle } from 'lucide-react'
import { Review } from '@/types'

interface ReviewsStatsProps {
    reviews: Review[]
    averageRating: number
}

export const ReviewsStats: React.FC<ReviewsStatsProps> = ({ reviews, averageRating }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
            </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
            </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">5-Star Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {reviews.filter((r) => r.rating === 5).length}
                    </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">Pending Replies</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {reviews.filter((r) => !r.replied).length}
                    </p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
        </div>
    </div>
)
