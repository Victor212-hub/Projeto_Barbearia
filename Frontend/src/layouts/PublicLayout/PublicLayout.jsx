import { Outlet } from "react-router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./PublicLayout.css";

function PublicLayout() {
  return (
    <>
      <Header businessName="Barbearia" />
      <main>
        <Outlet />
      </main>
      <Footer businessName="Barbearia" />
    </>
  );
}

export default PublicLayout;
