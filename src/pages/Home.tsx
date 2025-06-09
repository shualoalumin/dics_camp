import React from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Program from "@/components/sections/Program";
import Registration from "@/components/sections/Registration";
import Faq from "@/components/sections/Faq";
import Gallery from "@/components/sections/Gallery";
import Sponsors from "@/components/sections/Sponsors";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Program />
      <Gallery />
      <Registration />
      <Faq />
      <Sponsors />
    </>
  );
};

export default Home;
