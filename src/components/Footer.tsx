import { Link } from "react-router-dom";
import {
  ChevronRight,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Twitter,
  BookOpen,
} from "lucide-react";
import { socialLinks } from "../data/social";
import ecellLogo from "../assets/images/ecell_logo.png";

const iconMap: Record<string, any> = {
  Whatsapp: MessageCircle,
  Instagram: Instagram,
  Linkedin: Linkedin,
  X: Twitter,
  Medium: BookOpen,
  Youtube: Youtube,
};

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/5 relative selection:bg-primary selection:text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 items-start">
          {/* Brand Identity */}
          <div className="space-y-8">
            <Link
              to="/"
              className="flex items-center space-x-2 sm:space-x-3 group"
            >
              <div className="p-1.5 sm:p-2 border border-white/10 group-hover:border-primary transition-all duration-500">
                <img
                  src={ecellLogo}
                  alt="E-Cell UVCE Logo"
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain group-hover:scale-110 transition-transform"
                />
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-base sm:text-xl font-bold tracking-tighter text-white uppercase italic">
                  Entrepreneurship <span className="text-primary">Cell</span>
                </span>
                <span className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest">
                  University Visvesvaraya College of Engineering
                </span>
              </div>
            </Link>

            <div className="flex space-x-2">
              {socialLinks.map((social, i) => {
                const Icon = iconMap[social.name];
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-primary hover:bg-white/5 rounded-full transition-all duration-300"
                  >
                    {Icon && <Icon size={16} />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Directory */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-600 mb-8 font-mono">
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 gap-x-4 gap-y-3 font-mono text-[10px] uppercase tracking-widest">
              {[
                "About",
                "Events",
                "Contact" /* "Gallery", "Resources", "Merch" */,
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={
                      item === "Merch"
                        ? "/merchandise"
                        : `/${item.toLowerCase()}`
                    }
                    className="text-gray-500 hover:text-white flex items-center group transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-primary transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="md:text-right flex flex-col md:items-end">
            <div className="flex flex-col space-y-4 font-mono text-[10px] uppercase tracking-[0.2em]">
              {[
                {
                  label: "Privacy_Policy",
                  href: "https://docs.google.com/document/d/1jajviq87SWCDtZoTMrP1af6GVzkNclcwClIis7GT6io/edit?usp=sharing",
                },
                {
                  label: "Terms_of_Service",
                  href: "https://docs.google.com/document/d/19l_xmBvtFVcYKG4PJCtSCf40ai-3aeDj9US7wOoYP2k/edit?usp=sharing",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/contact"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-mono text-gray-700 uppercase tracking-[0.5em] border-t border-white/5 pt-8">
          <p>© {new Date().getFullYear()} E-Cell UVCE. All Rights Reserved.</p>
          <p className="hover:text-white transition-colors cursor-crosshair mt-4 md:mt-0">
            Built by the Technical Team, E-Cell UVCE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
