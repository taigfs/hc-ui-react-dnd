import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider, theme } from "antd";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query'

import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPage } from "./pages/ProjectPage/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ScenePage } from "./pages/ScenePage/ScenePage";
import { defaultTheme } from "./themes/DefaultTheme";

import "./styles/index.scss";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import SocketProvider from "./providers/socket-provider";

const queryClient = new QueryClient();

function App() {
  const { darkAlgorithm } = theme;
  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId="219074626190-q45elrs4mdaptg4dvtdp4geet0ju7rt3.apps.googleusercontent.com">
        <ThemeProvider theme={defaultTheme}>
          <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
            <SocketProvider serverUrl={import.meta.env.VITE_BACKEND_URL}>
              <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                  <Routes>
                    <Route element={<PrivateRoute />}>
                      <Route path="/scenes/:id" element={<ScenePage />} />
                      <Route path="/projects/:id" element={<ProjectPage />} />
                      <Route path="/" element={<ProjectsPage />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </BrowserRouter>
              </QueryClientProvider>
            </SocketProvider>
          </ConfigProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
