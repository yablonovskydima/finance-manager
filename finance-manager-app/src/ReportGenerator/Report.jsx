import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useLocation } from "react-router-dom";

const Report = () => 
{   
    const location = useLocation();
    const { report } = location.state || {};

    if (!report) {
        return <div>No report data available</div>;
    }

    const { from, to, transactions } = report;

    const data = transactions.reduce((acc, transaction) => {
        const category = transaction.financeCategory.type;
        const sum = transaction.transactionSum;
        const existingCategory = acc.find(item => item.name === category);

        if (existingCategory) {
            existingCategory.value += sum;
        } else {
            acc.push({ name: category, value: sum });
        }
        return acc;
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444', '#AAEE00'];

    const totalIncome = transactions
        .filter(transaction => transaction.transactionType === "income")
        .reduce((acc, transaction) => acc + transaction.transactionSum, 0);

    const totalExpense = transactions
        .filter(transaction => transaction.transactionType === "expense")
        .reduce((acc, transaction) => acc + transaction.transactionSum, 0);
    
    const profitLoss = totalIncome - totalExpense;

    return(
        <div className="container mt-5">
            <h1 className="text-center">Report from {from} to {to}</h1>
            <div className="row">
                <div className="col-md-6">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Sum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                        <td>{transaction.financeCategory.type}</td>
                        <td>{transaction.transactionType}</td>
                        <td>{transaction.transactionSum}</td>
                        </tr>
                    ))}
                    <tr className="table-success">
                        <td colSpan="2">Total Income</td>
                        <td>{totalIncome}</td>
                    </tr>
                    <tr className="table-danger">
                        <td colSpan="2">Total Expense</td>
                        <td>{totalExpense}</td>
                    </tr>
                    <tr className="table-info">
                        <td colSpan="2">Profit/Loss</td>
                        <td>{profitLoss}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                <div>
                    <h4 className="text-center">Transaction Sum Distribution by Category</h4>
                    <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    </PieChart>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Report;