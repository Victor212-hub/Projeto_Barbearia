import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Servicos/Servicos";
import Gallery from "./components/Gallery/Gallery";
import BookingForm from "./components/BookingForm/BookingForm";

function App() {
  return (
    <>
      <Header business="Nem Barber" />

      <main>
        <Hero />
        <Services />
        <Gallery />
        <BookingForm />
      </main>
    </>
  );
}

export default App;