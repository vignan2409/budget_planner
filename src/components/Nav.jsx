// rrd imports
import { Form, NavLink } from "react-router-dom";

// library
import { TrashIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

// assets
import logomark from "../assets/rupee.svg";

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="" height={30} />
        <span>Budget Buddy</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="logout"
          onSubmit={(event) => {
            if (!confirm("Delete user and all data?")) {
              event.preventDefault();
            }
          }}
        >
          <div className="Navud">
            <a type="" className="btn btn--warning">
              <UserIcon width={20} />
              <span>{userName}</span>
            </a>
            <button type="submit" className="btn btn--warning">
              <span>Delete Account</span>
              <TrashIcon width={20} />
            </button>
          </div>
        </Form>
      )}
    </nav>
  );
};
export default Nav;
