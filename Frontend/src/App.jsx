import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Servicos/Servicos";
import Gallery from "./components/Gallery/Gallery";
import BookingForm from "./components/BookingForm/BookingForm";
import Location from "./components/Location/Location";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header business="Nem Barber" />

      <main>
        <Hero />
        <Services />
        <Gallery />
        <BookingForm />
        <Location />
        <Footer />
      </main>

      
    </>
  );
}

export default App;