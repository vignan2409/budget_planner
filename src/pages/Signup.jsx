import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const name = e.target.name.value; // Get the name from the form
    localStorage.setItem("userName", JSON.stringify(name)); // Store the name dynamically

    // Redirect to dashboard
    navigate("/");
  };

  return (
    <form onSubmit={handleSignup}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        required
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
