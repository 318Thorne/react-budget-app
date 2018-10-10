import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, startRemoveExpense} from '../actions/expenses';


export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
            this.props.onSubmit(this.props.expense.id, expense);
            this.props.history.push('/');
        };
    onClick = () => {
            const id = this.props.expense.id
            this.props.onClick(id);
            this.props.history.push('/');
        };

    render(){
        return (
            <div>
                <ExpenseForm 
                    expense = {this.props.expense}
                    onSubmit={this.onSubmit}                  
                />
                <button onClick={this.onClick}>Remove item</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (id, expense) => dispatch(editExpense(id, expense)),
        onClick: (id) => dispatch(startRemoveExpense({id}))       
    }
}

const mapStateToProps = (state, props) => {
    return{
        expense: state.expenses.find((expense) => (expense.id === props.match.params.id) )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);