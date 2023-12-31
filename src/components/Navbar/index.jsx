import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const Navbar = () => {
  const { toggleDarkMode, isDark } = useTheme();

  return (
    <nav className={`${isDark ? 'nav' : ''}`}>
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
            // fontSize: 16
          }}
        >
          {isDark ? 'Light Mode 💡' : 'Dark Mode 🌚'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
