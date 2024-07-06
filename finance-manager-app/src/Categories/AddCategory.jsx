import React, { useState } from "react";

const AddCategory = ({onCancel}) => {

    const [type, setType] = useState('');
    const [description, setDescription] = useState('');

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
        <body>
            <h1>Add category</h1>
            <form>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleAdding}>Add</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </body>
    );
}

export default AddCategory;