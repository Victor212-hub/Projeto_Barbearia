import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Services from './components/Servicos/Servicos'


function App() {
  return (
    <>
      <Header business="Nem Barber"/>

      <main>
        <Hero />
        <Services />
      </main>
    </>
  );
}

export default App;