// rrd imports
import { Form, Link } from "react-router-dom";

// library imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

// helper functions
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);  // calculate the amount spent within the budget.

  return (
    <div className="budget">
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)}</p>
      </div>
      {/* display a progress bar (<progress>) with the max attribute set to the budget amount 
      and the value attribute set to the calculated spent amount.*/}
      <progress max={amount} value={spent}>
        {/* current progress as a percentage, using formatPercentage */}
        {formatPercentage(spent / amount)} 
      </progress>
      <div className="progress-text">
        {/* displays the amounts spent and remaining within the budget */}
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      <div className="progress-text">
        {/* display the spent and remaining % within budget, each formatted to 2 decimal places. */}
        <small>{((100 * spent) / amount).toFixed(2)}%</small>
        <small>{((100 * (amount - spent)) / amount).toFixed(2)}%</small>
      </div>
      {/* view budget details or delete the budget, depending on the showDelete prop value.  */}
      {showDelete ? (
        <div className="flex-sm">
          <Form method="post" action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default BudgetItem;