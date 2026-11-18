import AppLayout from "@/components/layout/app-layout";
import HomePage from "@/pages/main/home";
import { Error404Page } from "@/pages/main/pages";
import Polling from "@/pages/main/polling";
import PubSub from "@/pages/main/pubsub";

import "flatpickr/dist/flatpickr.css";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <Routes>
      {/* Dashboard Layout */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/polling" element={<Polling />} />
        <Route path="/pubsub" element={<PubSub />} />
      </Route>

      {/* Full-width / Error / Status Pages */}
      <Route path="/error-404" element={<Error404Page />} />

      {/* Fallback Route */}
      <Route path="*" element={<Error404Page />} />
      
    </Routes>
  );
}