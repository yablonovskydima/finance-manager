import './App.css';
import React, { useState } from 'react';
import Categories from './Categories/Categories';
import EditCategory from './Categories/EditCategory';
import AddCategory from './Categories/AddCategory';
import Transactions from './Transactions/Transactions';
import EditTransaction from './Transactions/EditTransaction';
import AddTransaction from './Transactions/AddTransaction';

function App() {
  const [view, setView] = useState('categories');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);

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

  return (
    <body>
     <nav>
        <p onClick={() => setView('categories')}>Categories</p>
        <p onClick={() => setView('transactions')}>Transactions</p>
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
    </body>
  );
}

export default App;
