import React from 'react'
import { Star, Reply } from 'lucide-react'
import { Review } from '@/types'

interface ReviewsListProps {
    reviews: Review[]
    replyingTo: number | null
    setReplyingTo: (id: number | null) => void
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>
    handleReply: (reviewId: number, replyText: string) => void
}

export const ReviewsList: React.FC<ReviewsListProps> = ({
    reviews,
    replyingTo,
    setReplyingTo,
    setReviews,
    handleReply,
}) => (
    <div className="space-y-4">
        {reviews.map((review) => (
            <div
                key={review.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-semibold text-sm">
                                {review.client
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">{review.client}</h4>
                            <p className="text-sm text-gray-500">
                                {review.service ?? ''} • {review.date}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                (review.replied ?? false)
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                            {(review.replied ?? false) ? 'Replied' : 'Pending'}
                        </span>
                    </div>
                </div>

                <p className="text-gray-700 mb-4">{review.comment}</p>

                {review.replied && review.replyText && (
                    <div className="bg-purple-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center mb-2">
                            <Reply className="h-4 w-4 text-purple-600 mr-2" />
                            <span className="text-sm font-medium text-purple-900">Your Reply</span>
                        </div>
                        <p className="text-sm text-purple-800">{review.replyText}</p>
                    </div>
                )}

                {!review.replied && (
                    <div>
                        {replyingTo === review.id ? (
                            <div className="space-y-3">
                                <textarea
                                    placeholder="Write your reply..."
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    rows={3}
                                    value={review.replyText ?? ''}
                                    onChange={(e) =>
                                        setReviews((prev) =>
                                            prev.map((r) =>
                                                r.id === review.id
                                                    ? { ...r, replyText: e.target.value }
                                                    : r
                                            )
                                        )
                                    }
                                />
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() =>
                                            handleReply(review.id, review.replyText ?? '')
                                        }
                                        className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                                    >
                                        Send Reply
                                    </button>
                                    <button
                                        onClick={() => setReplyingTo(null)}
                                        className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setReplyingTo(review.id)}
                                className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium"
                            >
                                <Reply className="h-4 w-4 mr-1" />
                                Reply to Review
                            </button>
                        )}
                    </div>
                )}
            </div>
        ))}
    </div>
)
