import './App.css';
import React, {useEffect, useContext} from 'react';
import axios from 'axios';
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
import LoginForm from './Auth/LoginForm';
import RegisterForm from './Auth/RegisterForm';
import ProtectedRoute from './Auth/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from './Auth/AuthContext';

const validateToken = async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      await axios.post('http://localhost:8080/api/v1/auth/validate', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
    }
  }
};

function App() {

  useEffect(() => {
    validateToken();
  }, []);

  const { username, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-xl">
            <Link className="navbar-brand" to="/categories">Categories</Link>
            <Link className="navbar-brand" to="/transactions">Transactions</Link>
            <Link className="navbar-brand" to="/report-generator">Report Generator</Link>
            { !username ? (
              <>
                <Link className="navbar-brand" to="/login">Login</Link>
                <Link className="navbar-brand" to="/register">Register</Link>
              </>
            ) : (
              <>
                <span className="navbar-text text-white">Logged as {username}</span>
                <button className="btn btn-outline-light" onClick={logout}>Logout</button>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ProtectedRoute element={<LoginForm />} />} />
          <Route path="/categories" element={<ProtectedRoute element={<Categories />} />} />
          <Route path="/categories/edit/:id" element={<ProtectedRoute element={<EditCategory />} />} />
          <Route path="/categories/add" element={<ProtectedRoute element={<AddCategory />} />} />
          
          <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
          <Route path="/transactions/edit/:id" element={<ProtectedRoute element={<EditTransaction />} />} />
          <Route path="/transactions/add" element={<ProtectedRoute element={<AddTransaction />} />} />
          
          <Route path="/report-generator" element={<ProtectedRoute element={<ReportGenerator />} />} />
          <Route path="/report" element={<ProtectedRoute element={<Report />} />} />
          <Route path="/graph" element={<ProtectedRoute element={<Graph />} />} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
