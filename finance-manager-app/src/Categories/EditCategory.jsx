import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const EditCategory = () => 
{
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState('');


    const onCancel = () => {
        navigate('/categories'); 
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/categories/${id}`)
            .then(response => response.json())
            .then(data => {
                setCategory(data);
            })
            .catch(error => console.error('Error fetching category:', error));
    }, [id]);

    const [type, setType] = useState(category.type || '');
    const [description, setDescription] = useState(category.description || '');

    const handleUpdate = () => {
        const updatedCategory = {
            id: category.id,
            type,
            description
        };

        fetch(`http://localhost:8080/api/v1/finances/${category.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
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