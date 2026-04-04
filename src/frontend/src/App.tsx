import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./shared/components/Layout";
import DashboardListPage from "./features/dashboards/pages/DashboardListPage";
import DashboardViewerPage from "./features/dashboards/pages/DashboardViewerPage";
import DashboardEditorPage from "./features/dashboards/pages/DashboardEditorPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardListPage />} />
          <Route path="/dashboard/:id" element={<DashboardViewerPage />} />
          <Route path="/dashboard/:id/edit" element={<DashboardEditorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
