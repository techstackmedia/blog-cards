import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { BlogProvider } from './context/BlogContext';
import { BlogDetailProvider } from './context/BlogDetailContext';

function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <BlogDetailProvider>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/:id' element={<Detail />}></Route>
          </Routes>
        </BlogDetailProvider>
      </BlogProvider>
    </BrowserRouter>
  );
}

export default App;
