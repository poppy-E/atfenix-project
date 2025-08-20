import React, { useState, useEffect } from "react";
import {
  Twitter,
  Linkedin,
  Instagram,
  Headset,
  Shield,
  Server,
  Cloud,
  Building,
  Replace,
  LineChart,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  const [status, setStatus] = useState({
    lightClass: "bg-yellow-500",
    textClass: "text-yellow-500",
    textContent: "Checking status...",
  });

  useEffect(() => {
    const serverUrlToCheck = "https://1.1.1.1";

    const checkSystemStatus = async () => {
      try {
        await fetch(serverUrlToCheck, { mode: "no-cors" });
        setStatus({
          lightClass: "bg-green-500",
          textClass: "text-green-500",
          textContent: "99.99% Uptime",
        });
      } catch (error) {
        setStatus({
          lightClass: "bg-red-500 animate-pulse",
          textClass: "text-red-500",
          textContent: "Offline",
        });
      }
    };

    checkSystemStatus();
    const intervalId = setInterval(checkSystemStatus, 120000);
    return () => clearInterval(intervalId);
  }, []);

  const backgroundPatternStyle = {
    backgroundImage:
      "radial-gradient(circle at 25% 25%, #f97316 0%, transparent 50%), radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)",
  };

  return (
    <footer className="bg-white pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={backgroundPatternStyle}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16 footer-grid">
          {/* Brand and description */}
          <div className="lg:col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <img
                src="/images/atfenixlogo.png"
                alt="ATFENIX"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
              Tier 3 Rated Data Center providing enterprise-grade hosting
              solutions with 99.99% uptime guarantee and 24/7 expert support.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a
                href="https://x.com/Atfenix_dc"
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-blue-500/50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={18} />
              </a>

              <a
                href="https://linkedin.com/company/atfenix-data-center"
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-blue-600/50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
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
                <Instagram size={18} />
              </a>
            </div>

            {/* Support / SLA section */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Headset size={14} className="text-white" />
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">
                    24/7 Support
                  </div>
                  <div className="text-gray-600 text-xs">Expert assistance</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield size={14} className="text-white" />
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">
                    99.99% Uptime
                  </div>
                  <div className="text-gray-600 text-xs">SLA guaranteed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mr-3"></div>
              Services
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/dedicated-server.html"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-300 flex items-center group"
                >
                  <Server
                    size={14}
                    className="mr-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  Dedicated Servers
                </a>
              </li>
              <li>
                <a
                  href="/vps.html"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-300 flex items-center group"
                >
                  <Cloud
                    size={14}
                    className="mr-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  VPS Hosting
                </a>
              </li>
              <li>
                <a
                  href="/co-location.html"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-300 flex items-center group"
                >
                  <Building
                    size={14}
                    className="mr-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  Colocation
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-3"></div>
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/contact-us.html"
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-300 flex items-center group"
                >
                  <Replace
                    size={14}
                    className="mr-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  Contact us Page
                </a>
              </li>
              <li>
                <a
                  href="/about-us.html"
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-300 flex items-center group"
                >
                  <LineChart
                    size={14}
                    className="mr-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  About Us Page
                </a>
              </li>
              <li>
                <a
                  href="https://www.network.atfenix.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-300 flex items-center group"
                >
                  <Globe
                    size={14}
                    className="mr-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  Network Status Page
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919211978879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-300 flex items-center group"
                >
                  <MessageCircle
                    size={14}
                    className="mr-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-3"></div>
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm mb-1">
                    Corporate Office
                  </div>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    A-61, Sector 16 Noida, Gautam Buddha Nagar, Noida, Uttar
                    Pradesh 201301
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm mb-1">
                    Sales & Support
                  </div>
                  <div className="text-gray-600 text-sm">
                    <a
                      href="tel:+919211978879"
                      className="hover:text-orange-500 transition-colors duration-300"
                    >
                      +91 9211978879
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm mb-1">
                    Email Us
                  </div>
                  <div className="text-gray-600 text-sm">
                    <a
                      href="mailto:corporate@atfenix.com"
                      className="hover:text-orange-500 transition-colors duration-300"
                    >
                      corporate@atfenix.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Clock size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm mb-1">
                    Business Hours
                  </div>
                  <div className="text-gray-600 text-sm">
                    24/7 Support Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 mb-12 newsletter-section">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest updates on our services, network status, and
              industry insights delivered to your inbox.
            </p>
            <form id="newsletter-form" className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p id="newsletter-message" className="text-green-600 mt-4 h-5"></p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 footer-links">
            <div className="flex items-center space-x-6">
              <p className="text-gray-600 text-sm">
                &copy; 2025 Atfenix Data Centre Private Limited (CIN
                U63111UP2025PTC229268) All Rights Reserved
              </p>
              <div
                id="status-indicator"
                className="flex items-center space-x-2"
              >
                <div
                  id="status-light"
                  className={`w-2 h-2 rounded-full ${status.lightClass}`}
                ></div>
                <span
                  id="status-text"
                  className={`${status.textClass} text-xs font-medium`}
                >
                  {status.textContent}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              <a
                href="/legal/privacy-policy.html"
                className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/legal/terms-of-service.html"
                className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/legal/sla.html"
                className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-300"
              >
                SLA
              </a>
              <a
                href="/legal/aup.html"
                className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-300"
              >
                AUP
              </a>
              <a
                href="/legal/dpa.html"
                className="text-gray-600 hover:text-orange-500 text-sm transition-colors duration-300"
              >
                DPA
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
