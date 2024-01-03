import { useTheme } from '../../hooks/useTheme';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className={`${isDark ? 'footer' : ''}`}>
        <p>&copy; {currentYear} Techstack Media</p>
      </footer>
    </div>
  );
};

export default Footer;
