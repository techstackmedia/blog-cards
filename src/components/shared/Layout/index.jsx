import { useTheme } from '../../../hooks/useTheme';
import Footer from '../../Footer';
import Navbar from '../../Navbar';
import './styles.css';

const Layout = ({ children }) => {
  const { isLight } = useTheme();
  return (
    <div className={`layout ${isLight ? 'dark-layout' : ''}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
