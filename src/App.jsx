import { useEffect } from "react";
import { BriefDrawer } from "./components/BriefDrawer";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Archive } from "./pages/Projects";
import { CaseStudy } from "./pages/ProjectDetail";
import { AdminLogin } from "./admin/AdminLogin";
import { AdminOverview } from "./admin/OverviewPage";
import { AdminProjects } from "./admin/ProjectsPage";
import { ProjectEditor } from "./admin/ProjectEditorPage";
import { AdminSettings } from "./admin/SettingsPage";
import { AdminServices } from "./admin/ServicesPage";
import { AdminCatalog } from "./admin/CatalogPage";
import { AdminUsers } from "./admin/UsersPage";

export function RouterApp() {
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Archive />} />
        <Route path="/projects/:slug" element={<CaseStudy />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/projects/new" element={<ProjectEditor />} />
        <Route path="/admin/projects/:id" element={<ProjectEditor />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/catalog" element={<AdminCatalog />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!loc.pathname.startsWith("/admin") && <BriefDrawer />}
    </>
  );
}

export default RouterApp;
