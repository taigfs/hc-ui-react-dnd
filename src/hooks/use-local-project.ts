import { useEffect, useState } from 'react';
import db from "../dexie/database";
import { Project } from '../interfaces/Project';

function useLocalProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Método para buscar um projeto por ID
  const get = async (id: string) => {
    try {
      const project = await db.projects.where('oid').equals(id).first();
      return project;
    } catch (error) {
      console.error('Erro ao buscar projeto por ID:', error);
      throw error;
    }
  };

  // Método para criar um novo projeto
  const create = async (project: Project) => {
    try {
      await db.projects.add(project);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw error;
    }
  };

  // Método para buscar todos os projetos
  const getAll = async () => {
    try {
      const allProjects = await db.projects.toArray();
      setProjects(allProjects);
    } catch (error) {
      console.error('Erro ao buscar todos os projetos:', error);
    }
  };

  // Efeito para buscar todos os projetos quando o componente monta
  useEffect(() => {
    getAll();
  }, []);

  return {
    projects,
    get,
    create,
    getAll,
  };
}

export default useLocalProjects;
