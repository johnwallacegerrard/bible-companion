import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
export default function Login() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/app");
    }
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      console.log("Logged in:", data);
      localStorage.setItem("token", data.token);
      navigate("/app");
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="login__card">
        <h1 className="login__title">Welcome Back</h1>
        <p className="login__subtitle">
          Sign in to continue your reading journey
        </p>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <label className="login__label">Email</label>
            <input
              className="login__input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login__field">
            <label className="login__label">Password</label>
            <input
              className="login__input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="login__error">{error}</p>}

          <button className="login__button" disabled={loading}>
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="login__footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
