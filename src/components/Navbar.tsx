
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle smooth scrolling to anchors
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Close the mobile menu if it's open
      setIsMenuOpen(false);
      
      // Smooth scroll to the element
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for the navbar
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="bg-white py-4 px-6 md:px-10 fixed w-full top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-whatsapp font-bold text-2xl">UniZap</div>
          <span className="bg-whatsapp text-white text-xs px-1.5 py-0.5 rounded-md">CRM</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#features" 
            className="text-gray-600 hover:text-whatsapp transition-colors"
            onClick={(e) => handleSmoothScroll(e, "features")}
          >
            Recursos
          </a>
          <a 
            href="#how-it-works" 
            className="text-gray-600 hover:text-whatsapp transition-colors"
            onClick={(e) => handleSmoothScroll(e, "how-it-works")}
          >
            Como funciona
          </a>
          <a 
            href="#pricing" 
            className="text-gray-600 hover:text-whatsapp transition-colors"
            onClick={(e) => handleSmoothScroll(e, "pricing")}
          >
            Preços
          </a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 px-6">
          <div className="flex flex-col gap-4">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-whatsapp transition-colors"
              onClick={(e) => handleSmoothScroll(e, "features")}
            >
              Recursos
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-600 hover:text-whatsapp transition-colors"
              onClick={(e) => handleSmoothScroll(e, "how-it-works")}
            >
              Como funciona
            </a>
            <a 
              href="#pricing" 
              className="text-gray-600 hover:text-whatsapp transition-colors"
              onClick={(e) => handleSmoothScroll(e, "pricing")}
            >
              Preços
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
