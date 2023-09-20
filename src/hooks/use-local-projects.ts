import { useEffect, useState, useContext } from 'react';
import db from "../dexie/database";
import { Project } from '../interfaces/Project';
import { createDefaultScene } from '../utils/create-default-scene';
import useLocalScenes from './use-local-scenes';
import useLocalStories from './use-local-stories';
import { createDefaultStory } from '../utils/create-default-story';

function useLocalProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { create: createScene } = useLocalScenes();
  const { create: createStory } = useLocalStories();

  // Método para buscar um projeto por ID
  const get = async (id: string) => {
    try {
      const project = await db.projects.where('id').equals(id).first();
      return project;
    } catch (error) {
      console.error('Erro ao buscar projeto por ID:', error);
      throw error;
    }
  };

  // Method to create a new project
  const create = async (project: Project) => {
    try {
      const projectId = await db.projects.add(project);
      const newProject = await db.projects.get(projectId);

      if (!newProject?.id) { throw new Error('Error creating project'); }

      createScene(createDefaultScene(newProject?.id));
      createStory(createDefaultStory(newProject?.id));

    } catch (error) {
      console.error('Error creating project:', error);
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
