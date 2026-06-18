import {
  ThumbsUp,
  Share2,
  Star,
  CalendarDays,
} from "lucide-react";

import { likeReview } from "../../services/reviewService";

const ReviewCard = ({
  review,
  refreshReviews,
}) => {
  const handleLike = async () => {
    try {
      await likeReview(review._id);
      refreshReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: review.subject,
        text: review.reviewText,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 transition hover:shadow-md">

      {/* Header */}

      <div className="flex justify-between items-start gap-4">

        <div className="flex gap-4">

          {/* Avatar */}

          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white flex items-center justify-center text-lg font-bold">

            {review.fullName
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

          <div>

            <h3 className="font-semibold text-lg">
              {review.fullName}
            </h3>

            <p className="text-gray-500">
              {review.subject}
            </p>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">

              <CalendarDays size={15} />

              <span>
                {new Date(
                  review.createdAt
                ).toLocaleDateString()}
              </span>

            </div>

          </div>

        </div>

        {/* Rating */}

        <div className="flex items-center gap-1">

          {[1, 2, 3, 4, 5].map(
            (star) => (
              <Star
                key={star}
                size={18}
                fill={
                  star <= review.rating
                    ? "#facc15"
                    : "none"
                }
                className={
                  star <= review.rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            )
          )}

        </div>

      </div>

      {/* Review Content */}

      <div className="mt-5">

        <p className="text-gray-700 leading-relaxed">
          {review.reviewText}
        </p>

      </div>

      {/* Footer */}

      <div className="flex items-center gap-6 mt-6 pt-4 border-t">

        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <ThumbsUp size={18} />

          <span>
            {review.likes}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
        >
          <Share2 size={18} />

          <span>Share</span>
        </button>

      </div>

    </div>
  );
};

export default ReviewCard;