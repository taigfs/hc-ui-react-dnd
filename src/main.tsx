import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Projects } from "./pages/Projects";
import { Scene } from "./pages/Scene";
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
              <Route path="/" element={<Scene />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/login" element={<Login />} />
              <Route path="/404" element={<NotFound />} />
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
