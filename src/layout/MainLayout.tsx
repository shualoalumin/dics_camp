import React from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default MainLayout;
