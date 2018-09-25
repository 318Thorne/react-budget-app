 export default (expenses) => {
    return expenses
        .map((x) => x.amount)
        .reduce((sum, cur) => (sum + cur), 0);
 }