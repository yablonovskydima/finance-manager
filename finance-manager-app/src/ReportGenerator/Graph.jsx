import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useLocation } from "react-router-dom";

const Graph = () => {

  const location = useLocation();
  const { report } = location.state || {};
  const sortedTransactions = report.transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  const data = sortedTransactions.map(transaction => ({
    date: transaction.date,
    sum: transaction.transactionSum
  }));

  const dateFormatter = (tick) => {
    const date = new Date(tick);
    const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    return formattedDate;
  };

  return (
    <body className="container mt-5">
      <h1 className="text-center">{sortedTransactions[0].transactionType} distribution from {report.from} to {report.to}</h1>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-center mb-4">
                <LineChart width={800} height={400} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={dateFormatter} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sum" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Graph;