import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, CalendarDays, Star, MessageSquare } from "lucide-react";

import { getCompanyDetails } from "../services/companyService";
import { getReviews } from "../services/reviewService";

import AddReviewModal from "../components/review/AddReviewModal";
import ReviewCard from "../components/review/ReviewCard";

import { useAuth } from "../context/AuthContext";

const CompanyDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [company, setCompany] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState("");

  const [showReviewModal, setShowReviewModal] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const companyResponse = await getCompanyDetails(id);

      const reviewResponse = await getReviews(id, sort);

      setCompany(companyResponse.data);

      setReviews(reviewResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, sort]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Company Card */}

          <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={company.company.logo || "https://placehold.co/200"}
                alt={company.company.name}
                className="w-32 h-32 rounded-2xl object-cover border"
              />

              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {company.company.name}
                </h1>

                <div className="flex flex-wrap gap-6 mt-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />

                    <span>{company.company.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} />

                    <span>
                      Founded{" "}
                      {new Date(company.company.foundedOn).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-gray-700 leading-relaxed">
                  {company.company.description}
                </p>
              </div>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-yellow-500">
                  <Star size={20} />
                  <span className="font-semibold">Rating</span>
                </div>

                <h3 className="text-2xl font-bold mt-2">
                  {company.averageRating}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-blue-500">
                  <MessageSquare size={20} />
                  <span className="font-semibold">Reviews</span>
                </div>

                <h3 className="text-2xl font-bold mt-2">
                  {company.totalReviews}
                </h3>
              </div>
            </div>
          </div>

          {/* Reviews Header */}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Reviews</h2>

              <p className="text-gray-500">{reviews.length} reviews</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-12 px-4 rounded-xl border bg-white"
              >
                <option value="">Latest</option>

                <option value="rating">Highest Rating</option>

                <option value="oldest">Oldest</option>
              </select>

              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                    return;
                  }

                  setShowReviewModal(true);
                }}
                className="h-12 px-6 rounded-xl text-white bg-gradient-to-r from-fuchsia-600 to-blue-700"
              >
                Add Review
              </button>
            </div>
          </div>

          {/* Reviews */}

          <div className="space-y-5 mt-6">
            {reviews.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center">
                <h3 className="text-xl font-semibold">No Reviews Yet</h3>

                <p className="text-gray-500 mt-2">
                  Be the first person to review this company.
                </p>
              </div>
            ) : (
              reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  refreshReviews={fetchData}
                />
              ))
            )}
          </div>
        </div>

        <AddReviewModal
          open={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          companyId={id}
          onSuccess={fetchData}
        />
      </div>
    </>
  );
};

export default CompanyDetails;
