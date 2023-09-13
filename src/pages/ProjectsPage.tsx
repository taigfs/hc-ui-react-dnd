import { Button, Col, List, Row, Typography } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import moment from "moment"; // Import moment library

import { HCLayout } from "../components/HCLayout";
import { SiteLinks } from "../enum/SiteLinks";
import { useAppStore } from "../state/AppStore";
import { useQuery, useMutation } from "react-query";
import axiosInstance from "../services/api";
import { User } from "../interfaces/User";
import { useAuthStore } from "../state/AuthStore";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../state/BoardStore";
import { useDiagramStore } from "../state/DiagramStore";
import { LoadingSpinner } from "../components/Loading/Loading";
import db from "../dexie/database";
import { Project } from "../interfaces/Project";
import useLocalProjects from "../hooks/use-local-projects";

export const ProjectsPage = () => {
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const { reset } = useAppStore((state) => state); // Updated to include addProjects
  const { user, setUser } = useAuthStore((state) => state);
  const { reset: resetBoard } = useBoardStore((state) => state);
  const navigate = useNavigate();
  const { reset: resetDiagram } = useDiagramStore((state) => state);
  const { projects, getAll, create } = useLocalProjects();

  const { data: userData } = useQuery('user', () =>
    axiosInstance.get('/user/me').then((res) => res.data)
  );

  // const createProjectMutation = useMutation(({ projectName, teamId} : { projectName: string, teamId: number}) =>
  //   axiosInstance.post('/project', { name: projectName, teamId: teamId })
  // );

  // useEffect(() => {
  //       // Carregando projetos do banco de dados
  //       const loadProjects = async () => {
  //           const allProjects = await db.projects.toArray();
  //           console.log(allProjects);
  //       };

  //       loadProjects();
  //   }, []);

  useEffect(() => {
    if (userData && userData.teamId) {
      setUser({
        ...user,
        teamId: userData.teamId,
      } as User);
    }
  }, [userData]);

  const addProject = async (projectName: string) => {
    create({
      name: projectName
    });
    getAll();
  };

  const onCreateProject = async (projectName: string) => {
    if (!user?.teamId) { return; }
    try {
      setIsCreating(false);
      addProject(projectName);
    } catch (error) {
      console.error(error);
    }
  };

  const onProjectClick = (item: Project) => {
    if (!item.id) {
      return;
    }
    navigate(SiteLinks.Project.replace(":id", item.id));
  };

  const ListHeader = () => (
    <Row>
      <Col span={13}>Name</Col>
      <Col span={6}>Owner</Col>
      <Col span={5}>Last update</Col>
    </Row>
  );

  useEffect(() => {
    reset();
    resetBoard();
    resetDiagram();
  }, []);

  return (
    <>
      <HCLayout hasContent>
        <Container>
          <Row className="mb-3">
            <Col span={20} style={{ display: "flex", alignItems: "center" }}>
              <h1>Projects</h1>
            </Col>
            <Col span={4} className="text-right">
              <Button type="primary" onClick={() => setIsCreating(true)}>
                Create
              </Button>
            </Col>
          </Row>
          <StyledList
            header={<ListHeader />}
            bordered
            dataSource={!isCreating ? projects : [...projects, { creating: true }]}
            renderItem={(renderedItem) => {
              const item = renderedItem as Project;
              if (item.creating) {
                return (
                  <StyledListItem>
                    <Typography.Text
                      style={{ fontSize: 18, width: "100%" }}
                      editable={{
                        editing: true,
                        onChange: onCreateProject,
                      }}
                    >
                      New project
                    </Typography.Text>
                  </StyledListItem>
                );
              } else {
                const formattedDate = moment(item.createdAt).format("DD/MM/YYYY HH:mm"); // Format the date
                return (
                  <StyledListItem onClick={() => onProjectClick(item)}>
                    <Row className="w-100">
                      <Col span={13}>{item.name}</Col>
                      <Col span={6}>{item.owner || 'me'}</Col>
                      <Col span={5}>{formattedDate}</Col> {/* Use the formatted date */}
                    </Row>
                  </StyledListItem>
                );
              }
            }}
            size="large"
          />
        </Container>
      </HCLayout>
    </>
  );
};

const StyledListItem = styled(List.Item)`
  cursor: pointer;
  transition: background-color 0.15s ease;
  &:hover {
    background-color: ${(props) => props.theme.color.featuredSquareBg};
  }
`;

const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;

const StyledList = styled(List)`
  max-height: 520px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.squareBg};
    border-left: 1px solid ${(props) => props.theme.color.squareBorder};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.color.squareBorder};
    border-radius: 8px;
  }
`;
