import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditTransaction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [categories, setCategories] = useState([]);
    const [financeCategory, setCategory] = useState('');
    const [transactionType, setType] = useState('');
    const [transactionSum, setSum] = useState(0);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8083';

    useEffect(() => {
        fetch(`${apiUrl}/api/v1/finances`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        })
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error('Error fetching categories:', error));
    }, [apiUrl]);

    useEffect(() => {
        fetch(`${apiUrl}/api/v1/transactions/${id}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setTransaction(data);
            setCategory(data.financeCategory);
            setType(data.transactionType);
            setSum(data.transactionSum);
            setDate(data.date);
            setDescription(data.description);
        })
        .catch(error => console.error('Error fetching transaction:', error));
    }, [id, apiUrl]);

    const onCancel = () => {
        navigate('/transactions'); 
    };

    const handleUpdate = () => {
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

        fetch(`${apiUrl}/api/v1/transactions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('accessToken')}` // Use Cookies.get here
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

    return (
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
                    <button type="button" className="btn btn-primary me-2" onClick={handleUpdate}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditTransaction;
