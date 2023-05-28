import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/MainPage/MainPage';
import Cart from './pages/Cart/Cart';
import FullDish from './pages/FullDish/FullDish';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="dish/:id" element={<FullDish />} />
      </Route>
    </Routes>
  );
}

export default App;
