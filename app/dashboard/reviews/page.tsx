'use client'
import React, { useState } from 'react'
import { Star, Users, CheckCircle, AlertCircle, Reply } from 'lucide-react'
import { ReviewCard } from '@/app/dashboard/reviews/_components/review-card'
import { ReviewsStats } from '@/app/dashboard/reviews/_components/ReviewsStats'
import { ReviewsFilter } from '@/app/dashboard/reviews/_components/ReviewsFilter'
import { ReviewsList } from '@/app/dashboard/reviews/_components/ReviewsList'
import { reviews as reviewsMock } from '@/lib/data/mock-data'
import { Heading2 } from '@/components/typography/Heading2'
import { cn } from '@/lib/utils'

const filterOptions = ['All', 'Replied', 'Pending']

export default function ReviewsPage() {
    const [reviews, setReviews] = useState(reviewsMock)
    const [reviewsFilter, setReviewsFilter] = useState('All')
    const [replyingTo, setReplyingTo] = useState<number | null>(null)

    const filteredReviews =
        reviewsFilter === 'All'
            ? reviews
            : reviewsFilter === 'Replied'
              ? reviews.filter((r) => r.replied)
              : reviews.filter((r) => !r.replied)

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
            : 0

    const handleReply = (reviewId: number, replyText: string) => {
        setReviews((prev) =>
            prev.map((review) =>
                review.id === reviewId ? { ...review, replied: true, replyText: replyText } : review
            )
        )
        setReplyingTo(null)
    }

    return (
        <div className="space-y-2 md:space-y-4">
            <div className="flex items-center justify-between">
                <Heading2 className={cn('text-left text-gray-900')}>Reviews Management</Heading2>
                <div className="flex items-center space-x-4">
                    <ReviewsFilter value={reviewsFilter} onChange={setReviewsFilter} />
                </div>
            </div>

            <ReviewsStats reviews={reviews} averageRating={averageRating} />
            <ReviewsList
                reviews={filteredReviews}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                setReviews={setReviews}
                handleReply={handleReply}
            />
        </div>
    )
}
