import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import BarChart from './components/BarChart';
import Stats from './components/Stats';
import PieChart from './components/PieChart';
import Table from './components/Table';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes, Route, Outlet, Link
} from "react-router-dom";

function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showDB" element={<Table />} />
          <Route path="/showStatistics" element={<Stats />} />
          <Route path="/showPieChart" element={<PieChart />} />
          <Route path="/showBarChart" element={<BarChart />} />
        </Routes>
      </BrowserRouter>

     
    </>
  );
}

export default App;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
