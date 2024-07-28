import React, { useState } from "react";
import {useNavigate } from 'react-router-dom';

const AddCategory = () => {

    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8083';
    const onCancel = () => {
        navigate('/categories'); 
    };

    const handleAdding = () => {
        const username = localStorage.getItem('username');
        const newCategory = {
            id: null,
            type,
            description,
            owner :{
                id: null,
                username
            }
        };
    
        fetch(`${apiUrl}/api/v1/finances`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add new category');
            }
        })
        .then(data => {
            onCancel();
        })
        .catch(error => {
            console.error('Error adding new category:', error);
        });
    };

    return(
        <div className="container mt-5 d-flex justify-content-center">
            <div className="w-50">
                <h1 className="text-center">Add category</h1>
                <form>
                <div className="mb-3">
                    <label className="form-label">Type:</label>
                    <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <input
                    type="text"
                    className="form-control"
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

export default AddCategory;