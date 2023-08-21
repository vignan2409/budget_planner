// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction() {
  // delete the user
  // delete data associated with the user's account upon logging out
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });
  // uses the toast object to display a success notification
  toast.success("You’ve deleted your account!");
  // return redirect
  // navigate the user to the root route ("/") after the logout actions are completed.
  return redirect("/");
}