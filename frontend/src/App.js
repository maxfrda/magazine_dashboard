import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header'
import './App.css';
import { MagazineList } from './components/MagazineList';


function App() {
  return (
    <Router>
      <div className='bg-[#1F2420] min-h-screen'>
        <Header/>
        <Routes>
          <Route path="/" element={<MagazineList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;