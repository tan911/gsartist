"use client";
import React, { useState } from "react";
import { Star, Users, CheckCircle, AlertCircle, Reply } from "lucide-react";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewsStats } from "@/components/reviews/ReviewsStats";
import { ReviewsFilter } from "@/components/reviews/ReviewsFilter";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { reviews as reviewsMock } from "@/lib/data/mock-data";

const filterOptions = ["All", "Replied", "Pending"];

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState(reviewsMock);
  const [reviewsFilter, setReviewsFilter] = useState("All");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const filteredReviews =
    reviewsFilter === "All"
      ? reviews
      : reviewsFilter === "Replied"
        ? reviews.filter((r) => r.replied)
        : reviews.filter((r) => !r.replied);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const handleReply = (reviewId: number, replyText: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, replied: true, replyText: replyText }
          : review
      )
    );
    setReplyingTo(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reviews Management</h2>
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
  );
};
