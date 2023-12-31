import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const Navbar = () => {
  const { toggleDarkMode, isLight } = useTheme();

  return (
    <nav className={`${isLight ? 'nav' : ''}`}>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='#/about'>About</Link>
        <Link to='#/contact'>Contact</Link>
        <button
          onClick={toggleDarkMode}
          style={{
            backgroundColor: isLight ? '#fff' : '#1111119b',
            border: isLight ? '1px solid #fff' : '1px solid #333',
            color: isLight ? '#000' : '#fff',
            // fontSize: 16
          }}
        >
          {isLight ? 'Light Mode 💡' : 'Dark Mode 🌚'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
