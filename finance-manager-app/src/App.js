import './App.css';
import React, {useContext} from 'react';
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
import EditAccount from './Account/EditAccount';



function App() {
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
                <Link to="/edit-account"><button className="btn btn-outline-light" >Edit account</button></Link>
                <button className="btn btn-outline-light" onClick={logout}>Logout</button>
                <span className="navbar-text text-white">Logged as {username}</span>
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

          <Route path="/edit-account" element={<ProtectedRoute element={<EditAccount/>}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
