import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Login } from "./pages/Login";
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
              <Route path="/login" element={<Login />} />
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
