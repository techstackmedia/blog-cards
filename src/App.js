import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { BlogProvider } from './context/BlogContext';
import { BlogDetailProvider } from './context/BlogDetailContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <BlogProvider>
          <BlogDetailProvider>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/about' element={<Home />}></Route>
              <Route path='/contact' element={<Home />}></Route>
              <Route path='/:id' element={<Detail />}></Route>
            </Routes>
          </BlogDetailProvider>
        </BlogProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
