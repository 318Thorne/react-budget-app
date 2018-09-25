import React from 'react';
import { connect } from 'react-redux';
import ExpenseTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'

export const ExpenseSummary = ({expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
    return (
        <div>            
            <p>Viewing {expensesCount} {expenseWord} totalling {numeral(expensesTotal / 100).format('$0,0.00')} </p>
        </div>
    )
}

const mapStateToProps = (state) => {
    const expenses = selectExpenses(state.expenses, state.filters)
    return {
        expensesCount: expenses.length,
        expensesTotal: ExpenseTotal(expenses)
    }
}

export default connect(mapStateToProps)(ExpenseSummary);