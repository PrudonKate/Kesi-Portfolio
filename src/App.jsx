import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import AboutMeMain from "./components/AboutMeMain/AboutMeMain.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <AboutMeMain/>
      <Footer/>
    </div>
  );
}

export default App;

