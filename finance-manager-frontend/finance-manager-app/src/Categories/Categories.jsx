import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const [finances, setFinances] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8083';

    useEffect(() => {
        const username = localStorage.getItem('username');
        const url = `${apiUrl}/api/v1/finances/users?username=${username}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setFinances(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`${apiUrl}/api/v1/finances/${id}`, {
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

    const onEditCategory = (finance) => () => {
        navigate(`/categories/edit/${finance.id}`);
    };

    const onAddCategory = () => {
        navigate(`/categories/add`);
    };

    return (
        <div className="container-fluid vh-100 mt-5">
            <h1>Categories expenses/income</h1>
            <table className="table table-bordered table-striped table-hover bg-light">
                <thead className="thead-dark">
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
                                <button className="btn btn-sm btn-warning m-2" onClick={onEditCategory(finance)}>Edit</button>
                                <button className="btn btn-sm btn-danger m-2" onClick={() => handleDelete(finance.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={onAddCategory}>Add category</button>
        </div>
    );
};

export default Categories;