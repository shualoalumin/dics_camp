import Layout from "./layout/Layout";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Special from "./components/sections/Special";
import Highlights from "./components/sections/Highlights";
import Schedule from "./components/sections/Schedule";
import Registration from "./components/sections/Registration";
import Testimonial from "./components/sections/Testimonial";
import Gallery from "./components/sections/Gallery";
import FAQ from "./components/sections/FAQ";
import FooterCTA from "./components/sections/FooterCTA";
import { LanguageProvider } from "@/contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <About />
        <Special />
        <Highlights />
        <Schedule />
        <Registration />
        <Testimonial />
        <Gallery />
        <FAQ />
        <FooterCTA />
      </Layout>
    </LanguageProvider>
  );
}

export default App;
