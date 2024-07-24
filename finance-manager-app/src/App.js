import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Categories from './Categories/Categories';
import EditCategory from './Categories/EditCategory';
import AddCategory from './Categories/AddCategory';
import Transactions from './Transactions/Transactions';
import EditTransaction from './Transactions/EditTransaction';
import AddTransaction from './Transactions/AddTransaction';
import ReportGenerator from './ReportGenerator/ReportGenerator';
import Report from './ReportGenerator/Report';
import Graph from './ReportGenerator/Graph';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-xl">
            <Link className="navbar-brand" to="/categories">Categories</Link>
            <Link className="navbar-brand" to="/transactions">Transactions</Link>
            <Link className="navbar-brand" to="/report-generator">Report Generator</Link>
          </div>
        </nav>
        
        <Routes>
        <Route path="/" element={<Categories />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />
          <Route path="/categories/add" element={<AddCategory />} />
          
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/edit/:id" element={<EditTransaction />} />
          <Route path="/transactions/add" element={<AddTransaction />} />
          
          <Route path="/report-generator" element={<ReportGenerator />} />
          <Route path="/report" element={<Report />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
