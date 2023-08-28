import { Project } from "../interfaces/Project";
import axiosInstance from "./api";

export abstract class ProjectService {

  static async getProject (id: number) {
    const response = await axiosInstance.get<Project>(`/project/${id}`);
    return response.data;
  };
}
