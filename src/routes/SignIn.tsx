import { useState } from "react";
import { Link, useNavigate } from "react-router";

// CSS
import "../styles/Auth.css";

// .env
const apiUrl = import.meta.env.VITE_API_URL;
// const local = import.meta.env.VITE_LOCALHOST_API_URL;

function SignIn() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        window.dispatchEvent(new Event("tokenChange"));
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        setError(data.message)
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError("Something went wrong!");
    }
  };

  document.title = "Food Recipes | Sign In";

  return (
    <div className="Auth">
      <div className="authGrid">
        <img src="https://www.onceuponachef.com/images/2019/07/Big-Italian-Salad-1200x1553.jpg" alt="image" />
        <form onSubmit={handleSubmit}>
          <div className="formBlock">
            <h1>Enter an account</h1>
            <div className="error" style={{ display: error ? "" : "none" }}>
              <i className='bx bx-error-circle'></i>
              <p>{error}</p>
            </div>
            <div className="inputBox">
              <i className='bx bx-user-circle'></i>
              <input type="text" placeholder="Enter username*" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="inputBox">
              <i className='bx bx-lock-alt'></i>
              <input type={show ? "text" : "password"} placeholder="Enter password*" value={password} onChange={e => setPassword(e.target.value)} required />
              <i className={show ? "bx bx-hide" : "bx bx-show"} onClick={() => setShow(!show)} style={{ cursor: "pointer" }}></i>
            </div>
            <button className="enterBtn" disabled={loading}>
              <i className={loading ? "bx bx-refresh bx-spin" : "bx bx-log-in-circle"} style={{ color: "black" }}></i>
              <span>{loading ? "Loading..." : "Enter an account"}</span>
            </button>
            <center>
              <span className="authLink">Don't have an account? <Link to="/signup" style={{ color: "#A3E635" }}>Sign Up</Link></span>
            </center>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
