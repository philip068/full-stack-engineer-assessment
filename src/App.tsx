// src/App.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

interface Investment {
  id: number;
  name: string;
  amount: number;
  date: string;
}

export default function App() {
  const [items, setItems] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    axios
      .get<Investment[]>("/api/investments")
      .then((res) => setItems(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post<Investment>("/api/investments", { name, amount, date })
      .then((res) => setItems((prev) => [...prev, res.data]))
      .catch((err) => setError(err.message));
  };

  if (loading) return <p>Loading investments…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="App">
      <h1>Investment Tracker</h1>

      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.name}: ${i.amount} on {new Date(i.date).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <h2>Add New Investment</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
