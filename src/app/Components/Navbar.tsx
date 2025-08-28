"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Mail, Phone, ChevronRight, MapPin, Menu, X } from "lucide-react";

const useNavbarStyles = () => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
     .navbar-fade-in {
  animation: navbar-fade-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.navbar-slide-up {
  animation: navbar-slide-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.navbar-scale-in {
  animation: navbar-scale-in 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes navbar-fade-in {
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes navbar-slide-up {
  0% { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes navbar-scale-in {
  0% { opacity: 0; transform: scale(0.96); }
  100% { opacity: 1; transform: scale(1); }
}

.glass-effect {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.nav-link-enhanced {
  position: relative;
  overflow: hidden;
  padding: 12px 24px !important;
  margin: 0 12px;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-link-enhanced::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #6b7280, #4b5563);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateX(-50%);
  border-radius: 2px 2px 0 0;
}

.nav-link-enhanced:hover::after {
  width: 80%;
}

.nav-link-enhanced.active::after {
  width: 90%;
  animation: pulse-underline 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

.nav-link-enhanced.transparent::after {
  background: linear-gradient(90deg, #9ca3af, #6b7280);
  box-shadow: 0 0 8px rgba(107, 114, 128, 0.4);
}

.nav-link-enhanced.transparent:hover {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
}

.nav-link-enhanced.scrolled:hover {
  background: rgba(107, 114, 128, 0.05);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(107, 114, 128, 0.1);
}

@keyframes pulse-underline {
  0%, 100% { 
    opacity: 1;
    transform: translateX(-50%) scaleX(1);
  }
  50% { 
    opacity: 0.7;
    transform: translateX(-50%) scaleX(0.95);
  }
}


.mobile-menu-backdrop {
  background: rgba(255, 255, 255, 0.1);

}


.glass-effect {
  background: rgba(255, 255, 255, 0.98);

}

.mobile-nav-enhanced:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}

/* Logo transition effects */
.logo-transition {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.logo-color-invert {
  filter: invert(1) brightness(0) saturate(100%);
}

.logo-color-dark {
  filter: brightness(0) saturate(100%);
}

.logo-fade-transition {
  transition: opacity 0.3s ease-in-out;
}

    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useNavbarStyles();

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/branch", label: "Our Branches" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand with Enhanced Transitions */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center group transition-all duration-300 ease-out"
              >
                {/* Option 1: Single logo with color filter change */}
                <Image
                  src="/logo.png"
                  alt="DigitalLink"
                  width={180}
                  height={48}
                  className={`h-10 w-auto logo-transition group-hover:scale-105 ${
                    isScrolled
                      ? "logo-color-dark" // Changes to dark when scrolled
                      : ""
                  }`}
                  priority
                />

                {/* Option 2: Two different logos with fade transition (uncomment to use)
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="DigitalLink"
                    width={180}
                    height={48}
                    className={`h-10 w-auto logo-fade-transition group-hover:scale-105 ${
                      isScrolled ? "opacity-0" : "opacity-100"
                    }`}
                    priority
                  />
                  <Image
                    src="/logo-dark.png"
                    alt="DigitalLink"
                    width={180}
                    height={48}
                    className={`h-10 w-auto logo-fade-transition group-hover:scale-105 absolute top-0 left-0 ${
                      isScrolled ? "opacity-100" : "opacity-0"
                    }`}
                    priority
                  />
                </div>
                */}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    isActive={
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href))
                    }
                    isScrolled={isScrolled}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Contact Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <ContactAction
                href="mailto:sales@digitallink-sa.com"
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                tooltip="sales@digitallink-sa.com"
                isScrolled={isScrolled}
              />
              <ContactAction
                href="tel:+966597015415"
                icon={<Phone className="w-4 h-4" />}
                label="Call"
                tooltip="+966 59 701 5415"
                isScrolled={isScrolled}
              />
              <ContactAction
                href="https://www.google.com/maps/search/?api=1&query=Olaya+Street,+Riyadh,+Saudi+Arabia"
                icon={<MapPin className="w-4 h-4" />}
                label="Location"
                tooltip="Olaya Street, Riyadh"
                isScrolled={isScrolled}
                external
              />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                className={`relative inline-flex items-center justify-center p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:ring-offset-2 transition-all duration-200 ease-out ${
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100/60"
                    : "text-white hover:text-gray-200 hover:bg-white/20"
                }`}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? "Close menu" : "Open menu"}
                </span>
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 transition-transform duration-200" />
                ) : (
                  <Menu className="h-5 w-5 transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 lg:hidden mobile-menu-backdrop"
              onClick={toggleMobileMenu}
            />

            {/* Menu Panel */}
            <div className="absolute top-full left-0 right-0 lg:hidden navbar-slide-up">
              <div className="glass-effect border-t border-gray-200/20 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 py-4">
                  {/* Navigation Items */}
                  <div className="space-y-1 mb-6">
                    {navItems.map((item, index) => (
                      <MobileNavLink
                        key={item.href}
                        href={item.href}
                        onClick={toggleMobileMenu}
                        isActive={
                          pathname === item.href ||
                          (item.href !== "/" && pathname.startsWith(item.href))
                        }
                        delay={index * 50}
                      >
                        {item.label}
                      </MobileNavLink>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-gray-200/30 pt-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <MobileContact
                        href="mailto:sales@digitallink-sa.com"
                        icon={<Mail className="w-4 h-4" />}
                        title="Email Us"
                        subtitle="sales@digitallink-sa.com"
                        onClick={toggleMobileMenu}
                      />
                      <MobileContact
                        href="tel:+966597015415"
                        icon={<Phone className="w-4 h-4" />}
                        title="Call Us"
                        subtitle="+966 59 701 5415"
                        onClick={toggleMobileMenu}
                      />
                      <MobileContact
                        href="https://www.google.com/maps/search/?api=1&query=Olaya+Street,+Riyadh,+Saudi+Arabia"
                        icon={<MapPin className="w-4 h-4" />}
                        title="Visit Us"
                        subtitle="Olaya Street, Riyadh"
                        onClick={toggleMobileMenu}
                        external
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
}

// NavLink component
function NavLink({
  href,
  children,
  isActive,
  isScrolled,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  isScrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={`nav-link-enhanced text-sm font-medium transition-all duration-300 ease-out ${
        !isScrolled ? "transparent" : "scrolled"
      } ${isActive ? "active" : ""} ${
        isScrolled
          ? `${
              isActive ? "text-gray-600" : "text-gray-700 hover:text-gray-900"
            }`
          : `${isActive ? "text-gray-300" : "text-white hover:text-gray-200"}`
      }`}
    >
      {children}
    </Link>
  );
}

// ContactAction component
function ContactAction({
  href,
  icon,
  label,
  tooltip,
  isScrolled,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  isScrolled: boolean;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-gray-500/20 transform hover:scale-105 ${
        isScrolled
          ? "text-gray-600 hover:text-gray-600 hover:bg-gray-50 hover:shadow-md"
          : "text-white hover:text-gray-200 hover:bg-white/20 hover:shadow-md"
      }`}
      title={tooltip}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <span className="sr-only">{label}</span>

      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
          isScrolled
            ? "bg-gradient-to-br from-gray-400/10 to-gray-600/10"
            : "bg-gradient-to-br from-white/10 to-gray-200/10"
        }`}
      ></div>
    </Link>
  );
}

// MobileNavLink component
function MobileNavLink({
  href,
  children,
  onClick,
  isActive,
  delay = 0,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  delay?: number;
}) {
  return (
    <Link
      href={href}
      className={`mobile-nav-enhanced navbar-scale-in flex items-center px-4 py-3 text-base font-medium transition-all duration-300 ease-out ${
        isActive
          ? "text-gray-600 bg-gray-50/60 border border-gray-200/50 shadow-sm"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50/60"
      }`}
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
      {isActive && (
        <div className="ml-auto w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
      )}
    </Link>
  );
}

// MobileContact component
function MobileContact({
  href,
  icon,
  title,
  subtitle,
  onClick,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center p-3 rounded-xl hover:bg-gray-50/60 transition-all duration-200 ease-out group"
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="flex-shrink-0 p-2 rounded-lg bg-gray-50/60 text-gray-600 group-hover:bg-gray-100/60">
        {icon}
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      {external && (
        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
      )}
    </Link>
  );
}
