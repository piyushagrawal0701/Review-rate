import { useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import { addReview } from "../../services/reviewService";

const AddReviewModal = ({
  companyId,
  open,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] =
    useState(false);

  const [rating, setRating] =
    useState(5);

  const [formData, setFormData] =
    useState({
      fullName: "",
      subject: "",
      reviewText: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      subject: "",
      reviewText: "",
    });

    setRating(5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addReview({
        companyId,
        ...formData,
        rating,
      });

      toast.success(
        "Review Added Successfully"
      );

      resetForm();

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to add review"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl">

        <div className="border-b p-6">

          <h2 className="text-3xl font-bold">
            Add Review
          </h2>

          <p className="text-gray-500 mt-1">
            Share your experience
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          <div className="space-y-5">

            <div>
              <label className="block font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl p-3"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={
                  formData.subject
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl p-3"
                placeholder="Amazing Company"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-3">
                Rating
              </label>

              <div className="flex gap-2">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <FaStar
                      key={star}
                      size={32}
                      onClick={() =>
                        setRating(
                          star
                        )
                      }
                      className={`cursor-pointer transition ${
                        star <= rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  )
                )}

              </div>

              <p className="text-sm text-gray-500 mt-2">
                Selected Rating:
                {" "}
                {rating}/5
              </p>

            </div>

            <div>
              <label className="block font-medium mb-2">
                Review
              </label>

              <textarea
                rows={5}
                name="reviewText"
                value={
                  formData.reviewText
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl p-3 resize-none"
                placeholder="Write your review..."
                required
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 mt-8">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-xl"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white"
            >
              {loading
                ? "Submitting..."
                : "Submit Review"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddReviewModal;