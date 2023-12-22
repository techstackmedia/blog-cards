import Footer from "../../Footer";
import Navbar from "../../Navbar";
import './styles.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
