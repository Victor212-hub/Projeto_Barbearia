import { useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import BarberLogin from "../../components/BarberLogin/BarberLogin";

function BarberLoginPage() {
  const { loginBarberMock } = useAuth();
  const navigate = useNavigate();

  async function handleLoginSuccess() {
    const response = await loginBarberMock();

    if (response.success) {
      navigate("/barbeiro/painel", { replace: true });
    }
  }

  function handleBackToSite() {
    navigate("/", { replace: true });
  }

  return (
    <BarberLogin
      onLoginSuccess={handleLoginSuccess}
      onBackToSite={handleBackToSite}
    />
  );
}

export default BarberLoginPage;
