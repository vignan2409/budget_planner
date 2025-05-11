import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login logic (e.g., validate user)
    localStorage.setItem("userName", JSON.stringify("YourName")); // Replace with dynamic value

    // Redirect to dashboard
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
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

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
