import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between">

      <div className="flex gap-5">

        <img
          src={
            company?.logo ||
            "https://placehold.co/100x100"
          }
          alt={company.name}
          className="w-[100px] h-[100px] rounded-md object-cover"
        />

        <div>

          <h2 className="text-[20px] font-semibold">
            {company.name}
          </h2>

          <div className="flex items-center gap-2 text-gray-500 mt-2">

            <MapPin size={16} />

            <span>
              {company.location}
            </span>

          </div>

          <div className="flex items-center gap-3 mt-4">

            <span className="font-semibold">
              {company.averageRating || 0}
            </span>

            <span>
              ⭐⭐⭐⭐⭐
            </span>

            <span>
              {company.totalReviews || 0}
              {" "}Reviews
            </span>

          </div>

        </div>

      </div>

      <div className="text-right">

        <p className="text-sm text-gray-500 mb-8">
          Founded on{" "}
          {company.foundedOn
            ? new Date(
                company.foundedOn
              ).toLocaleDateString()
            : "-"}
        </p>

        <Link
          to={`/company/${company._id}`}
          className="bg-[#333] text-white px-8 py-3 rounded-md"
        >
          Detail Review
        </Link>

      </div>

    </div>
  );
};

export default CompanyCard;