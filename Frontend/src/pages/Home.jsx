import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CompanyCard from "../components/company/CompanyCard";
import AddCompanyModal from "../components/company/AddCompanyModal";
import CompanyCardSkeleton from "../components/common/CompanyCardSkeleton";

import { getCompanies } from "../services/companyService";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("name");

  const [showModal, setShowModal] = useState(false);

  const fetchCompanies = async (
    customFilters = null
  ) => {
    try {
      setLoading(true);

      const filters =
        customFilters || {
          search,
          city,
          sort,
        };

      const response =
        await getCompanies(filters);

      setCompanies(
        response.data || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters =
    async () => {
      try {
        setLoading(true);

        setSearch("");
        setCity("");
        setSort("name");

        const response =
          await getCompanies({
            search: "",
            city: "",
            sort: "name",
          });

        setCompanies(
          response.data || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCompanies();
  }, [sort]);

  return (
    <div className="min-h-screen bg-[#f7f8fc]">

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Filters */}

        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">

          {/* Left Section */}

          <div className="flex flex-col lg:flex-row gap-4 lg:items-end">

            <div>
              <label className="block text-[#666] text-sm mb-2">
                Select City
              </label>

              <input
                type="text"
                placeholder="Indore, Madhya Pradesh, India"
                value={city}
                onChange={(e) =>
                  setCity(
                    e.target.value
                  )
                }
                className="w-full lg:w-[400px] h-[45px] border border-gray-300 rounded-md px-4 outline-none focus:border-purple-500"
              />
            </div>

            <button
              onClick={() =>
                fetchCompanies()
              }
              className="h-[45px] px-8 rounded bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white font-medium"
            >
              Find Company
            </button>

            {(city ||
              search ||
              sort !==
                "name") && (
              <button
                onClick={
                  handleClearFilters
                }
                className="h-[45px] px-8 rounded border border-gray-300 bg-white hover:bg-gray-50 font-medium"
              >
                Clear Filters
              </button>
            )}

            <button
              onClick={() => {
                if (!user) {
                  navigate(
                    "/login"
                  );
                  return;
                }

                setShowModal(
                  true
                );
              }}
              className="h-[45px] px-8 rounded bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white font-medium"
            >
              + Add Company
            </button>

          </div>

          {/* Sort */}

          <div>
            <label className="block text-[#666] text-sm mb-2">
              Sort By
            </label>

            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value
                )
              }
              className="w-full md:w-[180px] h-[45px] border border-gray-300 rounded-md px-3 outline-none"
            >
              <option value="name">
                Name
              </option>

              <option value="rating">
                Rating
              </option>

              <option value="location">
                Location
              </option>

            </select>
          </div>

        </div>

        <hr className="my-8 border-gray-200" />

        {/* Results */}

        <div className="flex justify-between items-center mb-6">

          <p className="text-gray-500">
            Results Found:{" "}
            <span className="font-semibold text-black">
              {
                companies.length
              }
            </span>
          </p>

        </div>

        {/* Company List */}

        {loading ? (
          <div className="space-y-5">

            {[...Array(6)].map(
              (_, i) => (
                <CompanyCardSkeleton
                  key={i}
                />
              )
            )}

          </div>
        ) : companies.length ===
          0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">

            <h3 className="text-2xl font-semibold">
              No Companies Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your
              search or filters.
            </p>

          </div>
        ) : (
          <div className="space-y-6 pb-10">

            {companies.map(
              (company) => (
                <CompanyCard
                  key={
                    company._id
                  }
                  company={
                    company
                  }
                />
              )
            )}

          </div>
        )}

      </div>

      <AddCompanyModal
        open={showModal}
        onClose={() =>
          setShowModal(false)
        }
        onSuccess={
          fetchCompanies
        }
      />

    </div>
  );
};

export default Home;