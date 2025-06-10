import React from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Highlights from "@/components/sections/Highlights";
import Schedule from "@/components/sections/Schedule";
import Gallery from "@/components/sections/Gallery";
import Registration from "@/components/sections/Registration";
import FAQ from "@/components/sections/FAQ";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <Schedule />
      <Gallery />
      <Registration />
      <FAQ />
    </>
  );
};

export default Home;
