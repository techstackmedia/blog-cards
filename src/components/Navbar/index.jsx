import React, { /* useContext, */ useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import Search from '../Search';
// import { BlogContext } from '../../context/BlogContext';

const Navbar = () => {
  const { toggleDarkMode, isDark } = useTheme();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  // const { authToken } = useContext(BlogContext);
  // const userId = localStorage.getItem('user_id');

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
  const { pathname } = useLocation();

  // const onClick = (e) => {
  //   if (e.target.innerText === 'Sign Out') {
  //     localStorage.removeItem('auth_token');
  //     localStorage.removeItem('user_id');
  //     localStorage.removeItem('user_name');
  //     localStorage.removeItem('user_email');
  //   }
  // };

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
            <Link
              className={`navlink ${pathname === '/' ? 'active' : ''} ${
                isDark ? 'dark-active' : ''
              }`}
              to='/'
            >
              Home
            </Link>
          </div>
          <Search />
          <div
            className='divlink'
            style={{ position: 'relative', top: 2, zIndex: -1 }}
          >
            {/* <a
              className={`navlink ${pathname === '/about' ? 'active' : ''} ${
                isDark ? 'dark-active' : ''
              }`}
              href={`/bookmark/${userId}`}
            >
              Bookmark
            </a> */}
            {/* <div onClick={onClick} style={{ display: 'inline' }}>
              <Link
                className={`navlink ${
                  pathname === '/contact' ? 'active' : ''
                } ${isDark ? 'dark-active' : ''}`}
                to={
                  pathname === '/auth/login' ? `/auth/register` : '/auth/login'
                }
              >
                {authToken && pathname !== '/auth/login'
                  ? pathname === '/auth/register'
                    ? 'Login'
                    : 'Sign Out'
                  : pathname === '/auth/login'
                  ? 'Register'
                  : 'Login'}
              </Link>
            </div> */}
            <button
              onClick={toggleDarkMode}
              style={{
                backgroundColor: isDark ? '#ffffffde' : '#1111119b',
                // backgroundColor: isDark ? 'var(--color-transparent-button-disable)' : 'var(--transparent-navbar)',
                border: isDark ? '1px solid #fff' : '1px solid #333',
                color: isDark ? '#000' : '#fff',
                height: 30,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {isDark ? (
                <img
                  width={24}
                  height={24}
                  src='https://img.icons8.com/external-glyph-silhouettes-icons-papa-vector/78/external-Light-Mode-interface-glyph-silhouettes-icons-papa-vector.png'
                  alt='external-Light-Mode-interface-glyph-silhouettes-icons-papa-vector'
                />
              ) : (
                <img
                  width={24}
                  height={24}
                  src='https://img.icons8.com/ffffff/sf-black-filled/64/moon-symbol.png'
                  alt='moon-symbol'
                />
              )}
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
