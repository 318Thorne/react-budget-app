import React from 'react';
import {Link} from 'react-router-dom';


export const ExpenseListItem = ({id , description, amount, createdAt}) => (
    <div>
        <p>{description}</p>
        <p>{amount}</p>
        <p>{createdAt}</p>
        <Link to={`/edit/${id}`}>edit</Link>
        <hr/>
    </div>
);

// const mapStateToProps = (state) => {
//     return {
//         expenses: state.expenses
//     }
// }

export default ExpenseListItem