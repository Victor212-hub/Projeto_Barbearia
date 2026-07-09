import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Servicos/Servicos";
import Gallery from "./components/Gallery/Gallery";

function App() {
  return (
    <>
      <Header business="Nem Barber" />

      <main>
        <Hero />
        <Services />
        <Gallery />
      </main>
    </>
  );
}

export default App;