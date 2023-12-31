import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [currentTheme, setCurrentTheme] = useState(storedTheme);

  useEffect(() => {
    const detectOSTheme = () => {
      const darkModeMediaQuery = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
      if (!localStorage.getItem('theme')) {
        setCurrentTheme(darkModeMediaQuery.matches ? 'dark' : 'light');
      }
    };

    detectOSTheme();

    const darkModeChangeListener = (event) => {
      if (!localStorage.getItem('theme')) {
        setCurrentTheme(event.matches ? 'dark' : 'light');
      }
    };

    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    if (darkModeMediaQuery.addEventListener) {
      darkModeMediaQuery.addEventListener('change', darkModeChangeListener);
    }

    return () => {
      if (darkModeMediaQuery.removeEventListener) {
        darkModeMediaQuery.removeEventListener(
          'change',
          darkModeChangeListener
        );
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const toggleDarkMode = () => {
    setCurrentTheme((prevTheme) => {
      return prevTheme === 'dark' ? 'light' : 'dark';
    });
  };
  const isDark = currentTheme === 'dark';

  const theme = { toggleDarkMode, isDark };
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
