import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { BerichtePage } from "./pages/BerichtePage";
import { DashboardPage } from "./pages/DashboardPage";
import { DiagnostikPage } from "./pages/DiagnostikPage";
import { EinstellungenPage } from "./pages/EinstellungenPage";
import { FoerderplanungPage } from "./pages/FoerderplanungPage";
import { KinderprofilePage } from "./pages/KinderprofilePage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="kinderprofile" element={<KinderprofilePage />} />
          <Route path="kinderprofile/:childId" element={<KinderprofilePage />} />
          <Route path="diagnostik" element={<DiagnostikPage />} />
          <Route path="foerderplanung" element={<FoerderplanungPage />} />
          <Route path="berichte" element={<BerichtePage />} />
          <Route path="einstellungen" element={<EinstellungenPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
