import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider, theme } from "antd";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPage } from "./pages/ProjectPage/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ScenePage } from "./pages/ScenePage/ScenePage";
import { StoryPage } from "./pages/StoryPage/StoryPage";
import { defaultTheme } from "./themes/DefaultTheme";

import "./styles/index.scss";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import SocketProvider from "./providers/socket-provider";
import { MetadataPage } from "./pages/MetadataPage";
import { DataPage } from "./pages/DataPage/DataPage";
import { AppProviders } from "./providers/app-providers";

const queryClient = new QueryClient();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.ts').then(() => {
      console.log('Service Worker registrado com sucesso!');
    }).catch((err: Error) => {
      console.error('Falha ao registrar o Service Worker:', err);
    });
  });
}

function App() {
  const { darkAlgorithm } = theme;
  return (
    <>
      <GoogleOAuthProvider clientId="219074626190-q45elrs4mdaptg4dvtdp4geet0ju7rt3.apps.googleusercontent.com">
        <ThemeProvider theme={defaultTheme}>
          <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
            <QueryClientProvider client={queryClient}>
              <SocketProvider serverUrl={import.meta.env.VITE_BACKEND_URL}>
                <AppProviders>
                  <BrowserRouter>
                    <Routes>
                      <Route element={<PrivateRoute />}>
                        <Route path="/projects/:id" element={<ProjectPage />} />
                        <Route path="/metadata/:id" element={<MetadataPage />} />
                        <Route path="/data/:id" element={<DataPage />} />
                        <Route path="/scenes/:id" element={<ScenePage />} />
                        <Route path="/stories/:id" element={<StoryPage />} />
                        <Route path="/" element={<ProjectsPage />} />
                      </Route>
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/404" element={<NotFoundPage />} />
                      <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                  </BrowserRouter>
                </AppProviders>
              </SocketProvider>
            </QueryClientProvider>
          </ConfigProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);