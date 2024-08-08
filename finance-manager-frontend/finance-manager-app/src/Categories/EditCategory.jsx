import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8083';

    const onCancel = () => {
        navigate('/categories'); 
    };

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        fetch(`${apiUrl}/api/v1/finances/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCategory(data);
                setType(data.type || '');
                setDescription(data.description || '');
            })
            .catch(error => console.error('Error fetching category:', error));
    }, [id]);

    const [type, setType] = useState(category.type || '');
    const [description, setDescription] = useState(category.description || '');

    const handleUpdate = () => {
        const accessToken = Cookies.get('accessToken');
        const updatedCategory = {
            id: category.id,
            type,
            description
        };

        fetch(`${apiUrl}/api/v1/finances/${category.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(updatedCategory)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update the category');
            }
        })
        .catch(error => {
            console.error('Error updating category:', error);
        });
        onCancel();
    };

    return(
        <div className="container mt-5 d-flex justify-content-center">
            <div className="w-50">
                <h1 className="text-center">Edit category</h1>
                <form>
                <div className="mb-3">
                    <label className="form-label">Type:</label>
                    <input
                    type="text"
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
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
                <button type="button" className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
                <button type="button" className="btn btn-danger" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditCategory;
