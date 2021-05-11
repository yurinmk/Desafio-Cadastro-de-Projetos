import "./Home.css";
import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProjectDetails from "../../components/main/projectDetails/ProjectDetails";

function Home() {
  return (
    <div className="container-home">
      <header>
        <Header />
      </header>
      <main>
        <ProjectDetails />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
