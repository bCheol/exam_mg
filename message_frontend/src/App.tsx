import AppLayout from "@/components/layout/app-layout";
import HomePage from "@/pages/main/home";
import { Error404Page } from "@/pages/main/pages";
import PollingPage from "@/pages/main/polling";
import SsePage from "@/pages/main/sse";
import WebSocketPage from "@/pages/main/websocket";
import PubSubPage from "@/pages/main/pubsub";
import "flatpickr/dist/flatpickr.css";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <Routes>
      {/* Dashboard Layout */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/polling" element={<PollingPage />} />
        <Route path="/sse" element={<SsePage />} />
        <Route path="/websocket" element={<WebSocketPage />} />
        <Route path="/pubsub" element={<PubSubPage />} />
      </Route>

      {/* Full-width / Error / Status Pages */}
      <Route path="/error-404" element={<Error404Page />} />

      {/* Fallback Route */}
      <Route path="*" element={<Error404Page />} />
      
    </Routes>
  );
}