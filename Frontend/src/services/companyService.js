import api from "../api/axios";

export const getCompanies =
  async (params) => {
    const response =
      await api.get(
        "/companies",
        {
          params,
        }
      );

    return response.data;
  };

export const createCompany =
  async (data) => {
    const response =
      await api.post(
        "/companies",
        data,
        
      );

    return response.data;
  };

export const getCompanyDetails =
  async (id) => {
    const response =
      await api.get(
        `/companies/${id}`
      );

    return response.data;
  };