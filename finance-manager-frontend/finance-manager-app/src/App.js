import './App.css';
import React, { useState } from 'react';
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
  const [view, setView] = useState('categories');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [reportData, setReportData] = useState([]);

  const handleAddCategory = () => {
    setView('addCategory');
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setView('editCategory');
  };

  const handleCancelCategory = () => {
    setView('categories');
    setEditingCategory(null);
    window.location.reload();
  };



  const handleAddTransaction = () => {
    setView('addTransaction');
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setView('editTransaction');
  };

  const handleCancelTransaction = () => {
    setView('transactions');
    setEditingTransaction(null);
    window.location.reload();
  };

  const handleGenerateReport = (reportObject) => {
    setReportData(reportObject);
    setView('report');
  };

  const handelGenerateGraph = (reportObject) => {
    setReportData(reportObject);
    setView('graph');
  };

  return (
    <body сlassName="App">

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-xl">
          <p className="navbar-brand" onClick={() => setView('categories')}>Categories</p>
          <p className="navbar-brand" onClick={() => setView('transactions')}>Transactions</p>
          <p className="navbar-brand" onClick={() => setView('reportGenerator')}>Report generator</p>
        </div>
      </nav>
      
      {view === 'categories' && (
        <Categories onEditCategory={handleEditCategory} onAddCategory={handleAddCategory}/>
      )}
      {view === 'editCategory' && editingCategory && (
        <EditCategory category={editingCategory} onCancel={handleCancelCategory}/>
      )}
      {view === 'addCategory' && (
        <AddCategory onCancel={handleCancelCategory}/>
      )}

      {view === 'transactions' && (
        <Transactions onEditTransaction={handleEditTransaction} onAddTransaction={handleAddTransaction}/>
      )}  
      {view === 'editTransaction' && (
        <EditTransaction transaction={editingTransaction} onCancel={handleCancelTransaction} 
        />
        )}
      {view === 'addTransaction' && (
        <AddTransaction onCancel={handleCancelTransaction}/>
        )}


      {view === 'reportGenerator' && (
        <ReportGenerator onGenerateReport={handleGenerateReport} onGenerateGraph={handelGenerateGraph}/>
        )}
      {view === 'report' && (
        <Report report={reportData}/>
      )}
      {view === 'graph' && (
        <Graph report={reportData}/>
      )}
    </body>
  );
}

export default App;
