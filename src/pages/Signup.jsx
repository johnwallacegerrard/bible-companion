import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
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
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      console.log("Registered:", data);
      // later: redirect or auto-login
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="signup">
      <div className="signup__card">
        <h1 className="signup__title">Create Your Account</h1>
        <p className="signup__subtitle">
          Join your church community and start reading together
        </p>

        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="signup__field">
            <label className="signup__label">Name</label>
            <input
              className="signup__input"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup__field">
            <label className="signup__label">Email</label>
            <input
              className="signup__input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup__field">
            <label className="signup__label">Password</label>
            <input
              className="signup__input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="signup__error">{error}</p>}

          <button className="signup__button" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="signup__footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Log in</span>
        </p>
      </div>
    </div>
  );
}
