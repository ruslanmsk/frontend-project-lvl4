
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './components/Main';
import { LoginPage } from './components/Login';
import { NotFoundPage } from './components/NotFound';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
