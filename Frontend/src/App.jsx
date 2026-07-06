import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'

function App() {
  return (
    <>
      <Header business="Nem Barber"/>

      <main>
        <Hero />
      </main>
    </>
  );
}

export default App;