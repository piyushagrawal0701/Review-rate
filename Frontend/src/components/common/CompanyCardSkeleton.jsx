const CompanyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl p-6 animate-pulse">

      <div className="flex gap-5">

        <div className="w-24 h-24 rounded-xl bg-gray-200"></div>

        <div className="flex-1">

          <div className="h-6 w-52 bg-gray-200 rounded"></div>

          <div className="h-4 w-40 bg-gray-200 rounded mt-4"></div>

          <div className="h-4 w-32 bg-gray-200 rounded mt-3"></div>

        </div>

      </div>

    </div>
  );
};

export default CompanyCardSkeleton;