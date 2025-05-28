import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import BackToTop from '../components/ui/BackToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;