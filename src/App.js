import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { BlogProvider } from './context/BlogContext';

function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/:id' element={<Detail />}></Route>
        </Routes>
      </BlogProvider>
    </BrowserRouter>
  );
}

export default App;
