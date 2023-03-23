import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPage } from "./pages/ProjectPage/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ScenePage } from "./pages/ScenePage/ScenePage";
import { defaultTheme } from "./themes/DefaultTheme";
import "./styles/index.scss";

function App() {
  const { darkAlgorithm } = theme;
  return (
    <React.StrictMode>
      <ThemeProvider theme={defaultTheme}>
        <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
          <BrowserRouter>
            <Routes>
              <Route path="/scenes/:id" element={<ScenePage />} />
              <Route path="/projects/:id" element={<ProjectPage />} />
              <Route path="/" element={<ProjectsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
