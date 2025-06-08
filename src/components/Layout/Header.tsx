import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: t("about", "header"), href: "#about" },
    { label: t("highlights", "header"), href: "#highlights" },
    { label: t("schedule", "header"), href: "#schedule" },
    { label: t("gallery", "header"), href: "#gallery" },
    { label: t("register", "header"), href: "#register" },
    { label: t("faq", "header"), href: "#faq" },
    { label: t("contact", "header"), href: "#contact" },
  ];

  const handleBannerDismiss = () => {
    const banner = document.querySelector(".banner-container");
    banner?.classList.add("slide-up");

    setTimeout(() => {
      setShowBanner(false);
    }, 300);
  };

  return (
    <>
      {showBanner && (
        <div className="banner-container fixed w-full z-50 transition-transform duration-300">
          <div className="bg-yellow-500 text-gray-900">
            <div className="container mx-auto px-4 py-1 md:py-2 text-center font-semibold text-sm">
              <span className="animate-pulse inline-block">🔥</span>{" "}
              {language === "en"
                ? "Registration opens June 2nd (Monday) - Limited spots available!"
                : "6월 2일(월) 신청 오픈 - 선착순 마감됩니다."}{" "}
              <a
                href="#register"
                className="underline hover:text-yellow-900 transition-colors"
              >
                {language === "en" ? "Register early" : "서두르세요"}
              </a>
              <button
                onClick={handleBannerDismiss}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900 hover:text-yellow-900 transition-colors"
                aria-label="Close banner"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <header
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
        style={{
          top: showBanner ? "34px" : "0",
        }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Mobile Menu Button - Left */}
          <button
            className="md:hidden p-2 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X
                className={isScrolled ? "text-gray-800" : "text-white"}
                size={24}
              />
            ) : (
              <Menu
                className={isScrolled ? "text-gray-800" : "text-white"}
                size={24}
              />
            )}
          </button>

          {/* Title - Center */}
          <div className="flex-1 text-center md:text-left flex items-center md:block">
            <h1
              className={`font-bold text-lg md:text-2xl ${
                isScrolled ? "text-blue-500" : "text-white"
              } mx-auto md:mx-0`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ cursor: "pointer" }}
            >
              DICS International Camp
            </h1>
          </div>

          {/* Mobile Language Toggle - Right */}
          <button
            onClick={() => setLanguage(language === "en" ? "ko" : "en")}
            className="md:hidden p-2 rounded-full transition-colors hover:bg-white/10 flex items-center justify-center"
            aria-label="Toggle language"
          >
            <span
              className={`fi ${
                language === "en" ? "fi-kr" : "fi-us"
              } flag-icon-circular flag-icon-small`}
              style={{
                display: "inline-block",
                filter: isScrolled ? "none" : "brightness(1.2) contrast(1.1)",
              }}
            ></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8 items-center">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`font-medium transition-colors ${
                      isScrolled
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-white hover:text-yellow-300"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop Language Toggle */}
            <div className="flex items-center ml-12 space-x-3">
              <button
                className={`transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                  language === "en"
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-75"
                }`}
                onClick={() => setLanguage("en")}
                aria-label="Set language to English"
              >
                <span
                  className="fi fi-us flag-icon-circular"
                  style={{
                    display: "inline-block",
                    filter: isScrolled
                      ? "none"
                      : "brightness(1.2) contrast(1.1)",
                  }}
                ></span>
              </button>
              <button
                className={`transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                  language === "ko"
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-75"
                }`}
                onClick={() => setLanguage("ko")}
                aria-label="Set language to Korean"
              >
                <span
                  className="fi fi-kr flag-icon-circular"
                  style={{
                    display: "inline-block",
                    filter: isScrolled
                      ? "none"
                      : "brightness(1.2) contrast(1.1)",
                  }}
                ></span>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-24 bg-white/90 backdrop-blur-sm shadow-lg z-40 md:hidden transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="pt-8 overflow-y-auto h-full">
            <ul className="space-y-6">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block font-medium text-gray-800 hover:text-blue-600 transition-colors text-xs text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div style={{ height: showBanner ? "34px" : "0" }} />
    </>
  );
};

export default Header;
