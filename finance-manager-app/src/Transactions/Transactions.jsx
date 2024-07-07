import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const Transactions = ({onEditTransaction, onAddTransaction }) => {
    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8080/api/v1/transactions')
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/v1/transactions/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setTransactions(transactions.filter(transaction => transactions.id !== id));
            } else {
                console.error('Failed to delete the item');
            }
        })
        .catch(error => console.error('Error deleting data:', error));
    };

    return(
        <div className="container-fluid vh-100">
            <h1>Transactions</h1>
            <table className="table table-bordered table-striped table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>№</th>
                    <th>Category</th>
                    <th>Transaction type</th>
                    <th>Sum</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Manage</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                    <td>{index + 1}</td>
                    <td>{transaction.financeCategory.type}</td>
                    <td>{transaction.transactionType}</td>
                    <td>{transaction.transactionSum}</td>
                    <td>{transaction.date ? format(new Date(transaction.date), 'yyyy-MM-dd') : ''}</td>
                    <td>{transaction.description}</td>
                    <td>
                        <button className="btn btn-sm btn-warning m-2" onClick={() => onEditTransaction(transaction)}>Edit</button>
                        <button className="btn btn-sm btn-danger m-2" onClick={() => handleDelete(transaction.id)}>Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="btn btn-primary mt-3" onClick={() => onAddTransaction()}>Add transaction</button>
        </div>
    );
}

export default Transactions;