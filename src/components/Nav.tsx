import { useState } from "react";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";

interface NavProps {
  activeLink: string;
  setActiveLink: (value: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const Nav: React.FC<NavProps> = ({
  activeLink,
  scrollToSection,
  setActiveLink,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", sectionId: "Home" },
    { name: "About", sectionId: "About" },
    { name: "Community", sectionId: "Community" },
    { name: "Buy Token", sectionId: "BuyToken" },
  ];

  const handleItemClick = (sectionId: string, activeLinkValue: string) => {
    console.log(sectionId);
    scrollToSection(sectionId);
    setActiveLink(activeLinkValue);
    setMenuOpen(false);
  };

  return (
    <div className="fixed z-50 w-full top-0  px-4">
      <nav className="flex items-center justify-between px-2 sm:px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 bg-[#E98112] border-[4.35px] border-[#FFB86C] py-2 px-4 md:px-8 rounded-[21.89px]">
          <div className="w-8">
            <img src={logo} alt="Fly Coin Logo" className="w-full" />
          </div>
          <span className="text-white font-bold text-base lg:text-[28px]">
            Fly Coin
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 bg-[#E98112] border-[4.35px] border-[#FFB86C] py-4 px-8 rounded-[21.89px]">
          {navItems.map(({ name, sectionId }) => (
            <h3
              key={sectionId}
              className={`cursor-pointer text-white text-xs lg:text-[20px] ${
                activeLink === sectionId ? "font-bold underline" : ""
              } ${sectionId === "BuyToken" && " border px-4 py-2 rounded-lg "}`}
              onClick={() => handleItemClick(sectionId, sectionId)}
            >
              {name}
            </h3>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden" onClick={() => setMenuOpen((prev) => !prev)}>
          {menuOpen ? (
            <X className="text-[#E98112] w-8 h-8" />
          ) : (
            <Menu className="text-[#E98112] w-8 h-8" />
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-[#E98112] border-t border-[#FFB86C] p-4 flex flex-col space-y-4 z-20">
            {navItems.map(({ name, sectionId }) => (
              <h3
                key={sectionId}
                className={`cursor-pointer text-white text-base ${
                  activeLink === sectionId ? "font-bold underline" : ""
                } `}
                onClick={() => handleItemClick(sectionId, sectionId)}
              >
                {name}
              </h3>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
