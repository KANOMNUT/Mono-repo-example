'use client'
import { useState, useEffect } from 'react';

// Navigation links data
const NAV_LINKS = [
  { to: '#about', label: 'About', mobileLabel: 'About' },
  { to: '#exp', label: 'Work Experience', mobileLabel: 'Experience' },
  { to: '#skills', label: 'Skills', mobileLabel: 'Skills' },
  { 
    to: 'https://stseakanomnutt.blob.core.windows.net/portfolio/ThanachaiT-Resume.pdf', 
    label: 'Resume', 
    mobileLabel: 'Resume',
    external: true 
  }
];

function NavLink({ to, children, external = false, className = '' }) {
  const baseClasses = 'mx-4 my-5 hover:text-gray-600 transition-colors duration-200';
  const combinedClasses = `${baseClasses} ${className}`.trim();
  
  return (
    <a 
      href={to} 
      className={combinedClasses}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  );
}

function MobileNav({ open, setOpen }) {
  const handleLinkClick = () => {
    setTimeout(() => setOpen(false), 100);
  };

  return (
    <div 
      className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out filter drop-shadow-md z-40`}
      aria-hidden={!open}
    >
      <nav className="flex flex-col ml-14 mt-20 text-black text-xl font-mono">
        {NAV_LINKS.map((link) => (
          <button
            key={link.to}
            className="text-left bg-transparent border-none p-0 hover:text-gray-600 transition-colors duration-200"
            onClick={handleLinkClick}
            type="button"
          >
            <NavLink to={link.to} external={link.external}>
              {link.mobileLabel}
            </NavLink>
          </button>
        ))}
      </nav>
    </div>
  );
}

function HamburgerButton({ open, onClick }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden bg-transparent border-none p-0 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 rounded"
      onClick={onClick}
      aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={open}
      tabIndex={0}
      type="button"
      onKeyDown={handleKeyDown}
    >
      {[...Array(3)].map((_, index) => (
        <span
          key={index}
          className={`h-1 bg-black rounded-lg transform transition duration-300 ease-in-out ${
            open ? 'w-0 opacity-0' : 'w-full opacity-100'
          }`}
        />
      ))}
    </button>
  );
}

function DesktopNav() {
  return (
    <div className="hidden md:flex text-black font-mono">
      {NAV_LINKS.map((link) => (
        <NavLink key={link.to} to={link.to} external={link.external}>
          {link.label.toUpperCase()}
        </NavLink>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (open && !e.target.closest('nav') && !e.target.closest('button')) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <nav 
      className={`flex w-full filter drop-shadow-md bg-white px-5 py-4 h-20 items-center ${
        sticky ? 'fixed top-0' : ''
      } z-50`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full flex justify-center items-center text-xl">
        <DesktopNav />
        <MobileNav open={open} setOpen={setOpen} />
      </div>
      <HamburgerButton open={open} onClick={() => setOpen(!open)} />
    </nav>
  );
}
