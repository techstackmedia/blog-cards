import { useTheme } from "../../hooks/useTheme";

const Footer = () => {
  const { isLight } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className={`${isLight ? 'footer' : ''}`}>
        <p>&copy; {currentYear} Techstack Media</p>
      </footer>
    </div>
  );
};

export default Footer;
