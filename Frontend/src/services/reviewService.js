import api from "../api/axios";

export const getReviews = async (
  companyId,
  sort
) => {
  const response = await api.get(
    `/reviews/company/${companyId}`,
    {
      params: {
        sort,
      },
    }
  );

  return response.data;
};

export const addReview = async (
  data
) => {
  const response = await api.post(
    "/reviews",
    data
  );

  return response.data;
};

export const likeReview = async (
  id
) => {
  const response = await api.patch(
    `/reviews/${id}/like`
  );

  return response.data;
};