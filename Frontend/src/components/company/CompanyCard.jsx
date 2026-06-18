import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const CompanyCard = ({ company }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-4 border rounded-xl shadow-sm bg-white">

      {/* LEFT SECTION */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

        <img
          src={company?.logo || "https://placehold.co/100x100"}
          alt={company.name}
          className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-md object-cover"
        />

        <div>

          <h2 className="text-[18px] md:text-[20px] font-semibold">
            {company.name}
          </h2>

          <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm md:text-base">
            <MapPin size={16} />
            <span>{company.location}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3 text-sm md:text-base">

            <span className="font-semibold">
              {company.averageRating || 0}
            </span>

            <span>⭐⭐⭐⭐⭐</span>

            <span>
              {company.totalReviews || 0} Reviews
            </span>

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-end md:items-end gap-3 md:gap-0">

        <p className="text-xs md:text-sm text-gray-500">
          Founded on{" "}
          {company.foundedOn
            ? new Date(company.foundedOn).toLocaleDateString()
            : "-"}
        </p>

        <Link
          to={`/company/${company._id}`}
          className="bg-[#333] text-white px-5 py-2 md:px-8 md:py-3 rounded-md text-sm md:text-base w-full sm:w-auto text-center"
        >
          Detail Review
        </Link>

      </div>

    </div>
  );
};

export default CompanyCard;