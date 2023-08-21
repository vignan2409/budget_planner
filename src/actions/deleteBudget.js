//* rrd import
// This function is likely used to navigate the user to a different route after the budget is 
// successfully deleted.
import { redirect } from "react-router-dom";

//* library
// The toast object is used to display notifications or toasts to the user.
import { toast } from "react-toastify";

//* helpers
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({ params }) {
  try {
    // call the deleteItem function with an object as an argument
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    // iterate through the array associatedExpenses and for each expense, call the deleteItem 
    // function to delete the expense.
    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    // use the toast object to display a success notification 
    toast.success("Budget deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }

  // direct the user to the root route ("/") after the budget and its associated expenses 
  // have been successfully deleted.
  return redirect("/");
}
