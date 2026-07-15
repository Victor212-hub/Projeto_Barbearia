import { useState } from "react";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Servicos/Servicos";
import Gallery from "./components/Gallery/Gallery";
import BookingForm from "./components/BookingForm/BookingForm";
import Location from "./components/Location/Location";
import Footer from "./components/Footer/Footer";
import BarberArea from "./components/BarberArea/BarberArea";
import BarberLogin from "./components/BarberLogin/BarberLogin";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  function goToHome() {
    setCurrentPage("home");
  }

  function goToBarberLogin() {
    setCurrentPage("barber-login");
  }

  function goToBarberArea() {
    setCurrentPage("barber-area");
  }

  if (currentPage === "barber-login") {
    return (
      <BarberLogin
        onLoginSuccess={goToBarberArea}
        onBackToSite={goToHome}
      />
    );
  }

  if (currentPage === "barber-area") {
    return <BarberArea onBackToSite={goToHome} />;
  }

  return (
    <>
      <Header
        businessName="Barbearia"
        onOpenBarberArea={goToBarberLogin}
      />

      <main>
        <Hero />
        <Services />
        <Gallery />
        <BookingForm />
        <Location />
      </main>

      <Footer businessName="Barbearia" />
    </>
  );
}

export default App;