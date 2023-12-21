import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogDetail from './components/Blog/Detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:id' element={<BlogDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
