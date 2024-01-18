import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { BlogProvider } from './context/BlogContext';
import { BlogDetailProvider } from './context/BlogDetailContext';
import { ThemeProvider } from './context/ThemeContext';
import RegisterPage from './pages/Register';
import Bookmark from './pages/Bookmark';
import LoginPage from './pages/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import { BlogAuthProvider } from './context/BlogAuthContext';
import { BlogBookmarkProvider } from './context/BlogBookmarkContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <BlogAuthProvider>
          <BlogProvider>
            <BlogBookmarkProvider>
              <BlogDetailProvider>
                <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route element={<PrivateRoutes />}>
                    <Route path='/bookmark/:id' element={<Bookmark />}></Route>
                  </Route>
                  <Route path='/contact' element={<Home />}></Route>
                  <Route path='/:id' element={<Detail />}></Route>
                  <Route
                    path='/auth/register'
                    element={<RegisterPage />}
                  ></Route>
                  <Route path='/auth/login' element={<LoginPage />}></Route>
                </Routes>
              </BlogDetailProvider>
            </BlogBookmarkProvider>
          </BlogProvider>
        </BlogAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
