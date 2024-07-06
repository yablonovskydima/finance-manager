import React, { useState } from "react";

const EditCategory = ({ category, onCancel  }) => 
{
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
        <body>
            <h1>Edit category</h1>
            <form>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleUpdate}>Update</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </body>
    );
}

export default EditCategory;