import { useState } from 'react';

// rrd imports
import { useParams , useLoaderData } from "react-router-dom";

import { PencilIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

// library
import { toast } from "react-toastify";

// components
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helpers
import { createExpense, deleteItem, updateBudget, formatCurrency, getAllMatchingItems } from "../helpers";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const BudgetPage = () => {
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [editedBudget, setEditedBudget] = useState({});
  const { budget, expenses } = useLoaderData();

  // Function to handle saving the edited budget
  const handleSave = async () => {
    try {
      await updateBudget(id, editedBudget); // Update the budget in your helpers.js
      toast.success('Budget updated successfully');
      setEditing(false);
      // Update the budget in the state
      const updatedBudgets = budget.map(b => (b.id === id ? editedBudget : b));
      setBudgets(updatedBudgets);
    } catch (error) {
      toast.error('Error updating budget');
    }
  };

  const handleEditClick = () => {
    setEditing(true);
    setEditedBudget({ ...budget }); // Create a copy of the budget for editing
  };

  const handleEditCancel = () => {
    setEditing(false);
  };

  const handleEditSubmit = () => {
    try {
      updateBudget(editedBudget); // Update the budget in local storage
      setEditing(false);
      toast.success('Budget updated successfully!');
      toast.success('Please, Refresh the Page');
    } catch (error) {
      toast.error('Failed to update budget. Please try again.');
    }
  };


  return (
    <div className="grid-lg">
      {editing ? (
        // Edit Form
        <div className="form-wrapper edit-budget-form">
          <h2 className="h3">Edit Budget: {budget.name}</h2>
          <div className="grid-xs">
            <label htmlFor="editBudgetName">Budget Name</label>
            <input
              type="text"
              id="editBudgetName"
              value={editedBudget.name}
              onChange={(e) =>
                setEditedBudget({ ...editedBudget, name: e.target.value })
              }
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="editBudgetAmount">Amount</label>
            <input
              type="number"
              step="1"
              id="editBudgetAmount"
              value={editedBudget.amount}
              onChange={(e) =>
                setEditedBudget({ ...editedBudget, amount: +e.target.value })
              }
            />
          </div>
          <div className="edit-form-buttons">
            <button onClick={handleEditSubmit} className="btn btn--dark">
              Save <CheckCircleIcon width={20} />
            </button>
            <button onClick={handleEditCancel} className="btn btn--light">
              Cancel <XCircleIcon width={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="budget-details"></div>
      )}

      <h1 className="existbud existflex">
        <span className="accent">{budget.name}</span>
        <span>
          <button onClick={handleEditClick} className="btn btn--dark">
            Edit Budget <PencilIcon width={20} />
          </button>
        </span>
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2 className="existbud">
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};
export default BudgetPage;
