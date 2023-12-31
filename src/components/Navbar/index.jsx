import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const Navbar = () => {
  const { toggleDarkMode, isDark } = useTheme();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${isDark ? 'nav' : ''}`}
      style={{
        backgroundColor:
          scrollPosition < 400
            ? isDark
              ? 'var(--dark-background-color)'
              : 'var(--color-white)'
            : isDark
            ? 'var(--transparent-navbar)'
            : 'var(--dark-transparent-navbar)',
      }}
    >
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='#/about'>About</Link>
        <Link to='#/contact'>Contact</Link>
        <button
          onClick={toggleDarkMode}
          style={{
            backgroundColor: isDark ? '#fff' : '#1111119b',
            border: isDark ? '1px solid #fff' : '1px solid #333',
            color: isDark ? '#000' : '#fff',
          }}
        >
          {isDark ? 'Light Mode 💡' : 'Dark Mode 🌚'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
