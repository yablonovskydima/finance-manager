import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';

const AddTransaction = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [financeCategory, setCategory] = useState('');
    const [transactionType, setType] = useState('');
    const [transactionSum, setSum] = useState(0);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const onCancel = () => {
        navigate('/transactions'); 
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/finances')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleAdding = () => {
        const newTransaction = {
            id: null,
            financeCategory: {
                id: financeCategory.id
            },
            transactionType,
            transactionSum: parseFloat(transactionSum),
            date,
            description
        };

        fetch(`http://localhost:8080/api/v1/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTransaction)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add new transaction');
            }
        })
        .catch(error => {
            console.error('Error adding new transaction:', error);
        });
        onCancel();
    }

    return(
        <div className="container mt-5 d-flex justify-content-center">
            <div className="w-50">
                <h1 className="text-center">Add transaction</h1>
                <form>
                <div className="mb-3">
                    <label className="form-label">Category:</label>
                    <select className="form-select" onChange={(e) => setCategory(JSON.parse(e.target.value))}>
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={JSON.stringify(cat)}>
                        {cat.type}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Type:</label>
                    <select className="form-select" value={transactionType} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select transaction type</option>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Sum:</label>
                    <input
                    type="number"
                    className="form-control"
                    value={transactionSum}
                    onChange={(e) => setSum(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date:</label>
                    <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary me-2" onClick={handleAdding}>Add</button>
                <button type="button" className="btn btn-danger" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AddTransaction;