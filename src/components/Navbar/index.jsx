import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import Search from '../Search';

const Navbar = () => {
  const { toggleDarkMode, isDark } = useTheme();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  const handleScroll = () => {
    setPrevScrollPosition(scrollPosition);
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition]);

  const shouldShowNavbar = scrollPosition <= 400;
  const scrollDirection = scrollPosition > prevScrollPosition ? 'down' : 'up';
  const showNav = shouldShowNavbar || scrollDirection === 'up';
  const {pathname} = useLocation()

  return (
    <>
      {showNav && (
        <nav
          className={`navbar ${isDark ? 'nav' : ''}`}
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
          <div className='divlink'>
            <Link className={`navlink ${pathname === '/' ? 'active' : ''} ${isDark ? 'dark-active' : ''}`} to='/'>
              Home
            </Link>
          </div>
          <Search />
          <div className='divlink' style={{position: 'relative', top: 2, zIndex: -1}}>
            <Link className={`navlink ${pathname === '/about' ? 'active' : ''} ${isDark ? 'dark-active' : ''}`} to='/about'>
              About
            </Link>
            <Link className={`navlink ${pathname === '/contact' ? 'active' : ''} ${isDark ? 'dark-active' : ''}`} to='/contact'>
              Contact
            </Link>
            <button
              onClick={toggleDarkMode}
              style={{
                backgroundColor: isDark ? '#ffffffde' : '#1111119b',
                border: isDark ? '1px solid #fff' : '1px solid #333',
                color: isDark ? '#000' : '#fff',
              }}
            >
              {isDark ? 'Light Mode 💡' : 'Dark Mode 🌚'}
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
