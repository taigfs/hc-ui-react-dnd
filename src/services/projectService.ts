import axiosInstance from "./api";

export const getProject = async (id) => {
  try {
    const response = await axiosInstance.get(`/project/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
