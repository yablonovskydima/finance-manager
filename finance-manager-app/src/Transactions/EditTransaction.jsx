import React, { useState, useEffect } from "react";

const EditTransaction = ({transaction, onCancel}) => {
    const [categories, setCategories] = useState([]);

    const [financeCategory, setCategory] = useState(transaction.financeCategory ||'');
    const [transactionType, setType] = useState(transaction.transactionType ||'');
    const [transactionSum, setSum] = useState(transaction.transactionSum || 0);
    const [date, setDate] = useState(transaction.date || '');
    const [description, setDescription] = useState(transaction.description ||'');

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/finances')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    
    const handelUpdate =()=>{
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

        fetch(`http://localhost:8080/api/v1/transactions/${transaction.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
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

    return(
        <body>
            <h1>Edit transaction</h1>
            <form>
                <div>
                    <label>Category:</label>
                    <select onChange={(e) => setCategory(JSON.parse(e.target.value))}>
                        <option value="">{financeCategory.type}</option>
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
                <button type="button" onClick={handelUpdate}>Edit</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </body>
    );
}

export default EditTransaction;