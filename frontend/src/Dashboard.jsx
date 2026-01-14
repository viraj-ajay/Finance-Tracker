// src/Dashboard.jsx
import { useEffect, useState } from "react";
import { getSummary } from "./api";

export default function Dashboard({ token, onLogout }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hardcoded Portfolio ID 1 for now
    getSummary(1, token)
      .then((data) => {
        // Safety check: if backend returns an error/empty object
        if (!data || !data.portfolio) {
            throw new Error("Portfolio not found. Did you reset the database?");
        }
        setSummary(data);
        setLoading(false);
      })
      .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
      });
  }, [token]);

  if (loading) return <h2>Loading Market Data...</h2>;
  if (error) return <h2 style={{color: 'red'}}>Error: {error}</h2>;

  return (
    <div className="dashboard">
      <header>
        {/* FIXED: Name is inside portfolio object */}
        <h1>{summary.portfolio.name}</h1>
        <button onClick={onLogout}>Logout</button>
      </header>

      <div className="summary-card">
        <h3>Total Value</h3>
        {/* FIXED: totalValue is inside portfolio object */}
        <p className="big-number">${summary.portfolio.totalValue.toFixed(2)}</p>
        
        {/* profitLoss is at the root level (calculated by Java Service) */}
        <p className={summary.profitLoss >= 0 ? "profit" : "loss"}>
          {summary.profitLoss >= 0 ? "▲" : "▼"} ${summary.profitLoss.toFixed(2)} ({summary.profitLossPercentage.toFixed(2)}%)
        </p>
      </div>

      <h3>Your Holdings</h3>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {summary.positions.map((pos) => (
            <tr key={pos.symbol}>
              <td>{pos.symbol}</td>
              <td>{pos.quantity}</td>
              <td>${pos.currentPrice.toFixed(2)}</td>
              <td>${pos.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}