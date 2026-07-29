import { useNavigate } from "react-router";
import BarberArea from "../../components/BarberArea/BarberArea";

function BarberDashboardPage() {
  const navigate = useNavigate();

  return <BarberArea onBackToSite={() => navigate("/", { replace: true })} />;
}

export default BarberDashboardPage;
