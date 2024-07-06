import React, { useEffect, useState } from 'react';

const Categories = ({onEditCategory, onAddCategory }) => {
    const [finances, setFinances] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/finances')
            .then(response => response.json())
            .then(data => setFinances(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/v1/finances/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setFinances(finances.filter(finance => finance.id !== id));
            } else {
                console.error('Failed to delete the item');
            }
        })
        .catch(error => console.error('Error deleting data:', error));
    };

    return (
        <div>
            <h1>Categories</h1>
            <table className="finance-table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {finances.map((finance, index) => (
                        <tr key={finance.id}>
                            <td>{index + 1}</td>
                            <td>{finance.type}</td>
                            <td>{finance.description}</td>
                            <td>
                                <button onClick={() => onEditCategory(finance)}>Edit</button>
                                <button onClick={() => handleDelete(finance.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={()=>onAddCategory()}> Add category</button>
        </div>
    );
};

export default Categories;