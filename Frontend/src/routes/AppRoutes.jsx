import { Route, Routes } from "react-router";
import ProtectedRoute from "../auth/ProtectedRoute";
import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import ClientLayout from "../layouts/ClientLayout/ClientLayout";
import BarberLayout from "../layouts/BarberLayout/BarberLayout";
import HomePage from "../pages/HomePage/HomePage";
import BookingPage from "../pages/BookingPage/BookingPage";
import ClientLoginPage from "../pages/ClientLoginPage/ClientLoginPage";
import ClientProfilePage from "../pages/ClientProfilePage/ClientProfilePage";
import BarberLoginPage from "../pages/BarberLoginPage/BarberLoginPage";
import BarberDashboardPage from "../pages/BarberDashboardPage/BarberDashboardPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/agendar" element={<BookingPage />} />
        <Route path="/entrar" element={<ClientLoginPage />} />
      </Route>

      <Route element={<ProtectedRoute redirectTo="/entrar" allowedRoles={["CLIENT"]} />}>
        <Route element={<ClientLayout />}>
          <Route path="/cliente" element={<ClientProfilePage />} />
        </Route>
      </Route>

      <Route path="/barbeiro/login" element={<BarberLoginPage />} />

      <Route element={<ProtectedRoute redirectTo="/barbeiro/login" allowedRoles={["BARBER", "ADMIN"]} />}>
        <Route element={<BarberLayout />}>
          <Route path="/barbeiro/painel" element={<BarberDashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
