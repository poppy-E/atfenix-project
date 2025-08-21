import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  Headset,
  Shield,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Header = () => {
  // --- STATE MANAGEMENT ---
  const [isLegalDropdownOpen, setIsLegalDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);

  // --- REFS ---
  const legalDropdownRef = useRef(null);
  const legalDropdownButtonRef = useRef(null);

  // --- HANDLERS ---
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // --- EFFECTS ---
  useEffect(() => {
    const fixNavigation = () => {
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";
      const navLinks = document.querySelectorAll("header nav > a");
      navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href")?.split("/").pop();
        const underline = link.querySelector("div");
        if (linkPage === currentPage) {
          link.classList.remove("text-gray-700");
          link.classList.add("text-primary-light", "font-semibold");
          if (underline) underline.style.width = "100%";
        }
      });
    };
    fixNavigation();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isLegalDropdownOpen &&
        legalDropdownRef.current &&
        !legalDropdownRef.current.contains(event.target) &&
        legalDropdownButtonRef.current &&
        !legalDropdownButtonRef.current.contains(event.target)
      ) {
        setIsLegalDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLegalDropdownOpen]);

  return (
    <>
      <style>{`
       /* --- MOBILE MENU & HAMBURGER STYLES --- */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;                 /* fix: full screen starts from left edge */
  right: 0;
  width: 100%;
  height: 100vh;           /* full viewport height */
  background-color: white;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  z-index: 40;
  overflow-y: auto;        /* scroll content if needed */
  color: #374151;
}

.bg-dark-light {
  background-color: #1e293b;
}

.mobile-menu.active {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-menu-nav {
  padding: 4rem 0;
}

.mobile-menu-nav a {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #374151;
  font-weight: 500;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f3f4f6;
}

.mobile-menu-nav a:hover {
  background-color: #f9fafb;
  color: #f97316;
  padding-left: 2rem;
}

.mobile-menu-nav a.active {
  color: #f97316;
  background-color: #fef3c7;
  border-left: 3px solid #f97316;
}

.mobile-dropdown {
  position: relative;
}

.mobile-dropdown-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  color: #374151;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f3f4f6;
  text-align: left;
}

.mobile-dropdown-toggle:hover {
  background-color: #f9fafb;
  color: #f97316;
}

.mobile-dropdown-toggle.active {
  color: #f97316;
  background-color: #fef3c7;
}

.mobile-dropdown-menu {
  overflow: hidden;
  background-color: #f9fafb;
  transition: max-height 0.5s ease-in-out;
  max-height: 0;
}

.mobile-dropdown-menu.active {
  max-height: 500px; /* large enough to show items */
}

.mobile-dropdown-menu a {
  padding: 0.5rem 1.5rem 0.5rem 3rem;
  font-size: 0.9rem;
  border-bottom: 1px solid #e5e7eb;
}

.mobile-dropdown-menu a:hover {
  background-color: #f3f4f6;
  color: #f97316;
}

.hamburger {
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
}

.hamburger span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #374151;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger span:nth-child(1) { top: 6px; }
.hamburger span:nth-child(2) { top: 12px; }
.hamburger span:nth-child(3) { top: 18px; }

.hamburger.active span:nth-child(1) { transform: rotate(45deg); top: 12px; }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg); top: 12px; }

      `}</style>
      <header className="bg-white shadow-lg fixed w-full z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <a
                href="https://www.atfenix.com/index.html"
                className="flex-shrink-0 group"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src="/images/atfenixlogo.png"
                    alt="ATFENIX Logo"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/200x50/cccccc/333333?text=Logo+Not+Found";
                    }}
                    className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </a>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="https://www.atfenix.com/index.html"
                className="text-gray-700 hover:text-primary-light font-medium transition-colors duration-300 relative group"
              >
                Home
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light group-hover:w-full transition-all duration-300"></div>
              </a>
              <a
                href="https://www.atfenix.com/co-location.html"
                className="text-gray-700 hover:text-primary-light font-medium transition-colors duration-300 relative group"
              >
                Colocation
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light group-hover:w-full transition-all duration-300"></div>
              </a>
              <a
                href="https://www.atfenix.com/vps.html"
                className="text-gray-700 hover:text-primary-light font-medium transition-colors duration-300 relative group"
              >
                VPS
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light group-hover:w-full transition-all duration-300"></div>
              </a>
              <a
                href="https://www.atfenix.com/dedicated-server.html"
                className="text-gray-700 hover:text-primary-light font-medium transition-colors duration-300 relative group"
              >
                Dedicated
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light group-hover:w-full transition-all duration-300"></div>
              </a>
              <div className="relative group">
                <button
                  ref={legalDropdownButtonRef}
                  onClick={() => setIsLegalDropdownOpen(!isLegalDropdownOpen)}
                  className="text-gray-700 hover:text-primary-light font-medium transition-colors duration-300 flex items-center relative"
                >
                  Legal
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform" />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light group-hover:w-full transition-all duration-300"></div>
                </button>
                <div
                  ref={legalDropdownRef}
                  className={`absolute bg-white border border-gray-200 rounded-lg shadow-xl w-56 z-50 top-full mt-2 ${
                    isLegalDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <div className="relative group/policies">
                    <div className="flex justify-between items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light transition-colors cursor-pointer">
                      <span>Policies</span>
                      <ChevronLeft className="h-4 w-4" />
                    </div>
                    <div className="absolute hidden group-hover/policies:block top-0 right-full mr-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl">
                      <a
                        href="https://www.atfenix.com/legal/privacy-policy.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Privacy Policy
                      </a>
                      <a
                        href="https://www.atfenix.com/legal/terms-of-service.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Terms of Service
                      </a>
                      <a
                        href="https://www.atfenix.com/legal/refund-policy.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Refund & Cancellation
                      </a>
                      <a
                        href="https://www.atfenix.com/legal/copyright.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Copyright Policy
                      </a>
                    </div>
                  </div>
                  <div className="relative group/compliance">
                    <div className="flex justify-between items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light transition-colors cursor-pointer">
                      <span>Compliance & Agreements</span>
                      <ChevronLeft className="h-4 w-4" />
                    </div>
                    <div className="absolute hidden group-hover/compliance:block top-0 right-full mr-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl">
                      <a
                        href="https://www.atfenix.com/legal/sla.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Service Level Agreement
                      </a>
                      <a
                        href="https://www.atfenix.com/legal/aup.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Acceptable Use Policy
                      </a>
                      <a
                        href="https://www.atfenix.com/legal/dpa.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Data Processing Agreement
                      </a>
                      <a
                        href="https://www.atfenix.com/legal/scs.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Security & Compliance
                      </a>

                      <a
                        href="https://www.atfenix.com/legal/dr.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Disaster Recovery
                      </a>
                      <a
                        href="https://www.atfenix.com/legal/esp.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Environmental Policy
                      </a>
                      <a
                        href="https://www.atfenix.com/legal/ca.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Colocation Agreement
                      </a>
                      <a
                        href="https://www.atfenix.com/legal/csa.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Cloud Services Agreement
                      </a>
                      <a
                        href="https://www.atfenix.com/legal/irp.html"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-light"
                      >
                        Incident Response Policy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="https://www.atfenix.com/about-us.html"
                className="text-gray-700 hover:text-primary-light font-medium transition-colors duration-300 relative group"
              >
                About
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light group-hover:w-full transition-all duration-300"></div>
              </a>
              <a
                href="https://www.atfenix.com/contact-us.html"
                className="text-gray-700 hover:text-primary-light font-medium transition-colors duration-300 relative group"
              >
                Contact
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light group-hover:w-full transition-all duration-300"></div>
              </a>
            </nav>
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="mobile-menu-button p-2 rounded-md text-gray-700 hover:text-primary-light focus:outline-none"
                aria-label="Toggle mobile menu"
                onClick={toggleMobileMenu}
              >
                <div
                  className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-scroll-area p-2">
          <nav className="mobile-menu-nav">
            <a href="https://www.atfenix.com/index.html">Home</a>
            <a href="https://www.atfenix.com/co-location.html">Colocation</a>
            <a href="https://www.atfenix.com/vps.html">VPS</a>
            <a href="https://www.atfenix.com/dedicated-server.html">
              Dedicated
            </a>
            <div className="mobile-dropdown">
              <button
                className={`mobile-dropdown-toggle ${
                  isPoliciesOpen ? "active" : ""
                }`}
                onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
              >
                Policies{" "}
                <ChevronDown
                  className={`h-4 w-4 ml-1 transition-transform ${
                    isPoliciesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`mobile-dropdown-menu ${
                  isPoliciesOpen ? "active" : ""
                }`}
              >
                <a href="https://www.atfenix.com/legal/privacy-policy.html">
                  Privacy Policy
                </a>
                <a href="https://www.atfenix.com/legal/terms-of-service.html">
                  Terms of Service
                </a>
                <a href="https://www.atfenix.com/legal/refund-policy.html">
                  Refund & Cancellation
                </a>
                <a href="https://www.atfenix.com/legal/copyright.html">
                  Copyright Policy
                </a>
              </div>
            </div>
            <div className="mobile-dropdown">
              <button
                className={`mobile-dropdown-toggle ${
                  isComplianceOpen ? "active" : ""
                }`}
                onClick={() => setIsComplianceOpen(!isComplianceOpen)}
              >
                Compliance & Agreements{" "}
                <ChevronDown
                  className={`h-4 w-4 ml-1 transition-transform ${
                    isComplianceOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`mobile-dropdown-menu ${
                  isComplianceOpen ? "active" : ""
                }`}
              >
                <a href="https://www.atfenix.com/legal/sla.html">
                  Service Level Agreement
                </a>
                <a href="https://www.atfenix.com/legal/aup.html">
                  Acceptable Use Policy
                </a>
                <a href="https://www.atfenix.com/legal/dpa.html">
                  Data Processing Agreement
                </a>
                <a href="https://www.atfenix.com/legal/scs.html">
                  Security & Compliance
                </a>
                <a href="https://www.atfenix.com/legal/dr.html">
                  Disaster Recovery
                </a>
                <a href="https://www.atfenix.com/legal/esp.html">
                  Environmental Policy
                </a>
                <a href="https://www.atfenix.com/legal/ca.html">
                  Colocation Agreement
                </a>
                <a href="https://www.atfenix.com/legal/csa.html">
                  Cloud Services Agreement
                </a>
                <a href="https://www.atfenix.com/legal/irp.html">
                  Incident Response Policy
                </a>
              </div>
            </div>
            <a href="https://www.atfenix.com/about-us.html">About</a>
            <a href="https://www.atfenix.com/contact-us.html">Contact</a>
          </nav>
        </div>
        <div className="mobile-menu-footer p-4 mt-auto border-t border-gray-700">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-dark-light p-4 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Headset className="text-white h-4 w-4" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-dark-light p-4 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="text-white h-4 w-4" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    99.99% Uptime
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 items-center justify-center">
            <a
              href="https://x.com/Atfenix_dc"
              className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-gray-500/50"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/company/atfenix-data-center"
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-blue-600/50"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/theatfenix"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:
                  "linear-gradient(45deg, #f58529, #feda77, #dd2a7b, #8134af, #515bd4)",
              }}
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
