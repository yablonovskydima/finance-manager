import React, { useEffect, useState } from "react";

const AddTransaction = ({onCancel}) => {
    const [categories, setCategories] = useState([]);

    const [financeCategory, setCategory] = useState('');
    const [transactionType, setType] = useState('');
    const [transactionSum, setSum] = useState(0);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/finances')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleAdding = () => {
        const newTransaction = {
            id: null,
            financeCategory: {
                id: financeCategory.id
            },
            transactionType,
            transactionSum: parseFloat(transactionSum),
            date,
            description
        };

        fetch(`http://localhost:8080/api/v1/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTransaction)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add new transaction');
            }
        })
        .catch(error => {
            console.error('Error adding new transaction:', error);
        });
        onCancel();
    }

    return(
        <body>
            <h1>Add transaction</h1>
            <form>
                <div>
                    <label>Category:</label>
                    <select onChange={(e) => setCategory(JSON.parse(e.target.value))}>
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={JSON.stringify(cat)}>
                                {cat.type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        value={transactionType}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div>
                    <label>Sum:</label>
                    <input
                       type="number"
                       value={transactionSum}
                       onChange={(e) => setSum(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                         type="date"
                         value={date}
                         onChange={(e) => setDate(e.target.value)}
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
                <button type="button" onClick={handleAdding}>Add</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </body>
    );
}

export default AddTransaction;