import React, { useState, useEffect } from "react";

const EditTransaction = ({transaction, onCancel}) => {
    const [categories, setCategories] = useState([]);

    const [financeCategory, setCategory] = useState(transaction.financeCategory ||'');
    const [transactionType, setType] = useState(transaction.transactionType ||'');
    const [transactionSum, setSum] = useState(transaction.transactionSum || 0);
    const [date, setDate] = useState(transaction.date || '');
    const [description, setDescription] = useState(transaction.description ||'');

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/finances')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    
    const handelUpdate =()=>{
        const updatedTransaction = {
            id: transaction.id,
            financeCategory: {
                id: financeCategory.id
            },
            transactionType,
            transactionSum,
            date,
            description
        };

        fetch(`http://localhost:8080/api/v1/transactions/${transaction.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTransaction)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update the transaction');
            }
        })
        .catch(error => {
            console.error('Error updating transaction:', error);
        });
        onCancel();
    };

    return(
        <div className="container mt-5 d-flex justify-content-center">
            <div className="w-50">
                <h1 className="text-center">Edit transaction</h1>
                <form>
                <div className="mb-3">
                    <label className="form-label">Category:</label>
                    <select className="form-select" onChange={(e) => setCategory(JSON.parse(e.target.value))}>
                    <option value="">{financeCategory.type}</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={JSON.stringify(cat)}>
                        {cat.type}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Type:</label>
                    <input
                    type="text"
                    className="form-control"
                    value={transactionType}
                    onChange={(e) => setType(e.target.value)}
                    />
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
                <button type="button" className="btn btn-primary me-2" onClick={handelUpdate}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditTransaction;