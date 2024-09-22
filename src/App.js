import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/expenses') // Replace with your backend URL
      .then(response => response.json())
      .then(data => setExpenses(data))
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Expense Tracker</p> 
        <ul>
          {expenses.map(expense => (
            <li key={expense.id}>
              {expense.date} - {expense.description} - {expense.amount}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;