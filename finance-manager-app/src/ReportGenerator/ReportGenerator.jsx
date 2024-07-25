import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReportGenerator = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [from, setDateFrom] = useState('');
    const [to, setDateTo] = useState('');
    const [transactionType, setTransactionType] = useState(null);
    const [financeCategoryName, setFinanceCategoryName] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/finances')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryChange = (e) => {
        const selectedCategory = JSON.parse(e.target.value);
        setFinanceCategoryName(selectedCategory.type);
    };

    const validateDates = () => {
        if (from && to && new Date(from) > new Date(to)) {
            setError('The start date cannot be later than the end date.');
            return false;
        }
        setError('');
        return true;
    };

    const handleGenerate = () => {
        if (!validateDates()) return;

        const reportRequest = {
            from,
            to,
            transactionType,
            financeCategoryName
        };

        fetch('http://localhost:8080/api/v1/transactions/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportRequest)
        })
        .then(response => response.json())
        .then(data => {
            const reportObject = {
                transactions: data,
                from,
                to
            };
            navigate('/report', { state: { report: reportObject } });
        })
        .catch(error => console.error('Error generating report:', error));
    };

    const hangelGenerateGraph = () => {
        if (!validateDates()) return;

        const reportRequest = {
            from,
            to,
            transactionType,
            financeCategoryName
        };

        fetch('http://localhost:8080/api/v1/transactions/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportRequest)
        })
        .then(response => response.json())
        .then(data => {
            const reportObject = {
                transactions: data,
                from,
                to
            };
            navigate('/graph', { state: { report: reportObject } });
        })
        .catch(error => console.error('Error generating report:', error));
    };

    const onCancel = () => {
        navigate(`/categories`);
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="w-50">
                <h1 className="text-center">Reports generator</h1>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Date from:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={from}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date to:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={to}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Transaction type:</label>
                        <select
                            className="form-select"
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                        >
                            <option value="">Select transaction type</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category:</label>
                        <select className="form-select" onChange={handleCategoryChange}>
                            <option value="">{financeCategoryName || "Select a category"}</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={JSON.stringify(cat)}>
                                    {cat.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="button" className="btn btn-primary me-2" disabled={!from || !to} onClick={handleGenerate}>Generate</button>
                    <button type="button" className="btn btn-success me-2" disabled={!transactionType || !from || !to} onClick={hangelGenerateGraph}>Graph</button>
                    <button type="button" className="btn btn-danger" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default ReportGenerator;