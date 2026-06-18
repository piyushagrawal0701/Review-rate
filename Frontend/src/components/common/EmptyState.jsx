const EmptyState = ({ text }) => {
  return (
    <div className="bg-white rounded-xl p-10 text-center">
      <h2 className="text-xl font-semibold">
        {text}
      </h2>
    </div>
  );
};

export default EmptyState;