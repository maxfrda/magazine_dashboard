import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header'
import './App.css';
import { MagazineList } from './components/MagazineList';

// import IssueForm from './components/IssueForm';

function App() {
  return (
    <Router>
      <div className='bg-[#1F2420] min-h-screen'>
        <Header/>
        <Routes>
          <Route path="/" element={<MagazineList />} />
          {/* <Route path="/add" element={<IssueForm />} /> */}
          {/* <Route path="/edit/:id" element={<IssueForm />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;