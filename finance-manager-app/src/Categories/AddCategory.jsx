import React, { useState } from "react";
import {useNavigate } from 'react-router-dom';

const AddCategory = () => {

    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const onCancel = () => {
        navigate('/categories'); 
    };

    const handleAdding = () => {
        const newCategory = {
            id: null,
            type,
            description
        };

        fetch(`http://localhost:8080/api/v1/finances`, {
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
        .catch(error => {
            console.error('Error adding new category:', error);
        });
        onCancel();
    }

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