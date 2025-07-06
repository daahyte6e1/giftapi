import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';
import MainPage from './pages/MainPage';
import StreamingPage from './pages/StreamingPage';
import Header from './components/Header';
import './App.css';

function App() {
  // Настройка Modal для доступности
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/streaming" element={<StreamingPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
