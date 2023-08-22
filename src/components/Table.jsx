// component import
import ExpenseItem from "./ExpenseItem";

// expenses - an array of expense objects
// showBudget - a boolean to determine whether to show the budget column
const Table = ({ expenses, showBudget = true }) => {
  return (
    <div className="table">
      <table>
        {/* table header */}
        <thead>
          <tr>
            {["Name", "Amount", "Date", showBudget ? "" : "", ""].map(
              (i, index) => (
                <th key={index}>{i}</th>
              )
            )}
          </tr>
        </thead>
        {/* table body */}
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
