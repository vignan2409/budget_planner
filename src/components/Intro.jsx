// import the Form component
import { Form } from "react-router-dom";

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/il1.jpg";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h2 className="personalized">
          Your <span className="accentper">Personalized</span> Budget Planner
        </h2>
        <p className="descrip">
          Easily track your expenses and savings to make informed financial
          decisions and achieve your money goals.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="Name"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img
        className="ilimg"
        src={illustration}
        alt="Person with money"
        width={600}
      />
    </div>
  );
};
export default Intro;
