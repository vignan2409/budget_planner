// rrd imports
import { Link, useFetcher } from "react-router-dom";

import { useState } from 'react';
import { toast } from "react-toastify";

// library import
import { TrashIcon, PencilIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

// helper imports
import {
  formatCurrency,
  formatDateToLocaleString,
  updateExpense,
  getAllMatchingItems,
} from "../helpers";

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();
  const [editing, setEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({ ...expense });

  // fetche a budget that matches the budgetId of the expense.
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  const handleEditClick = () => {
    setEditing(true);
  };
  
  const handleEditCancel = () => {
    setEditing(false);
  };

  const handleEditSubmit = async () => {
    try {
      updateExpense(expense.id, editedExpense);
      toast.success('Expense updated successfully');
      toast.success('Please Refresh the Page');
      setEditing(false);
    } catch (error) {
      toast.error('Error updating expense');
    }
  };

  return (
    <>
      <td>
        {editing ? (
          <input
            type="text"
            value={editedExpense.name}
            onChange={(e) =>
              setEditedExpense((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          expense.name
        )}
      </td>
      <td>
        {editing ? (
          <input
            type="number"
            step="1"
            value={editedExpense.amount}
            onChange={(e) =>
              setEditedExpense((prev) => ({ ...prev, amount: +e.target.value }))
            }
          />
        ) : (
          formatCurrency(expense.amount)
        )}
      </td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link to={`/budget/${budget.id}`}>{budget.name}</Link>
        </td>
      )}
      <td>
        {editing ? (
          <div className="edit-form-buttons">
            <button onClick={handleEditSubmit} className="btn btn--dark">
              <CheckCircleIcon width={20} />
            </button>
            <button onClick={handleEditCancel} className="btn btn--light">
              <XCircleIcon width={20} />
            </button>
          </div>
        ) : (
          <div className="edit-buttons">
            <button onClick={handleEditClick} className="btn btn--dark">
              Edit <PencilIcon width={20} />
            </button>
          </div>
        )}
      </td>
      {/* <td>{expense.name}</td> <td> - table cells */}
      {/* <td>{formatCurrency(expense.amount)}</td> */}
      
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};
export default ExpenseItem;
