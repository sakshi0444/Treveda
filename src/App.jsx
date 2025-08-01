import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import ContactForm from './components/contact';
import About from './components/About';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About/>

      <Products />
      <ContactForm/>
    </>
  );
}

export default App;
