import React, { Component, useState } from 'react';
import './ExpenseTracker.css';
import AddNewTranstion from './AddNewTranstion';

const ExpenseTracker = () => {
    const [transactions, settransactions] = useState<any[]>([])
    const [title, settitle] = useState('')
    const [amount, setamount] = useState('')
    const AddTransaction = (e: any) => {
        e.preventDefault();
        const newTransaction = {
            id: new Date(), title: title, amount: amount
        }
        if (title.length > 0 && +amount != 0) {
            settransactions((prev): any => (
                [...prev, newTransaction]
            ))
        } else {
            alert("Your information is invalid")
        }
        settitle('')
        setamount('')
    }
    // end add transaction ffunction
    const deleteTransaction = (id: any) => {
        settransactions(prev => {
            return prev.filter(transaction => {
                return transaction.id != id;
            })
        })
    }
    // end of deleteTransaction function 
    const calculateBlance = () => {
        let sum = 0;
        for (let i = 0; i < transactions.length; i++) {
            sum += +transactions[i].amount;
        }
        return sum
    }
    const calculateIncome = () => {
        let income = 0;
        for (let i = 0; i < transactions.length; i++) {
            if (+transactions[i].amount < 0) {
                income += +transactions[i].amount
            }

        }
        return income;
    }
    const calculateExpense = () => {
        let expense = 0
        for (let i = 0; i < transactions.length; i++) {
            if (+transactions[i].amount < 0) {
                expense += +transactions[i].amount
            }
        }
        return expense;
    }

    return (
        <><h2>Expense Tracker</h2>

            <div className="container">
                <h4>Your Balance</h4>
                <h1 id="balance">${calculateBlance()}</h1>

                <div className="inc-exp-container">
                    <div>
                        <h4>Income</h4>
                        <p id="money-plus" className="money plus">+${calculateIncome()}</p>
                    </div>
                    <div>
                        <h4>Expense</h4>
                        <p id="money-minus" className="money minus">-${calculateExpense()}</p>
                    </div>
                </div>

                <h3>History</h3>
                <ul id="list" className="list">
                    {transactions.map((transaction, key) => {
                        return <li key={key} className={transaction.amount < 0 ? "minus" : "plus"}>{transaction.title}<span>{transaction.amount}</span><span className="delete-btn"
                            onClick={() => deleteTransaction(transaction.id)}
                        >x</span>
                        </li>
                    })}
                </ul>

                <h3>Add new transaction</h3>
                <form id="form" onSubmit={(e) => AddTransaction(e)}>
                    <div className="form-control">
                        <label htmlFor="text">Text</label>
                        <input type="text" id="text" value={title}
                            onChange={(e) => settitle(e.target.value)}
                            placeholder="Enter text..." />
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount"
                        >Amount <br />
                            (negative - expense, positive - income)</label
                        >
                        <input type="number" id="amount"
                            onChange={(e) => setamount(e.target.value)}
                            value={amount} placeholder="Enter amount..." />
                    </div>
                    <button className="btn">Add transaction</button>
                </form>
            </div></>
    );
}


export default ExpenseTracker