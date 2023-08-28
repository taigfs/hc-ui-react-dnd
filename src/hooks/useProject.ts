import { useEffect, useState } from "react";
import axiosInstance from "../services/api";

export const useProject = (id) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/project/${id}`);
        const projectData = response.data;
        setProject(projectData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);

  return project;
};
