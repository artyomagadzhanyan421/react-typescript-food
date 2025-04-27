import { useState } from "react";
import { Link, useNavigate } from "react-router";

// .env
const apiUrl = import.meta.env.VITE_API_URL;
// const local = import.meta.env.VITE_LOCALHOST_API_URL;

function SignUp() {
  const [show, setShow] = useState(false);
  const [reshow, setReshow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("")
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (password !== retype) {
      setError("Passwords do not match!");
      setLoading(false);
    } else {
      try {
        const response = await fetch(`${apiUrl}auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
        } else {
          alert(data.message);
          navigate("/signin");
        }
      } catch (err) {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  };

  document.title = "Food Recipes | Sign Up";

  return (
    <div className="Auth">
      <div className="authGrid">
        <img src="https://www.onceuponachef.com/images/2019/07/Big-Italian-Salad-1200x1553.jpg" alt="image" />
        <form onSubmit={handleSubmit}>
          <div className="formBlock">
            <h1>Create an account</h1>
            <div className="error" style={{ display: error ? "" : "none" }}>
              <i className='bx bx-error-circle'></i>
              <p>{error}</p>
            </div>
            <div className="inputBox">
              <i className='bx bx-user-circle'></i>
              <input type="text" placeholder="Create username*" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="inputBox">
              <i className='bx bx-lock-alt'></i>
              <input type={show ? "text" : "password"} placeholder="Create password*" value={password} onChange={e => setPassword(e.target.value)} required />
              <i className={show ? "bx bx-hide" : "bx bx-show"} onClick={() => setShow(!show)} style={{ cursor: "pointer" }}></i>
            </div>
            <div className="inputBox">
              <i className='bx bx-lock-alt'></i>
              <input type={reshow ? "text" : "password"} placeholder="Re-enter password*" value={retype} onChange={e => setRetype(e.target.value)} required />
              <i className={reshow ? "bx bx-hide" : "bx bx-show"} onClick={() => setReshow(!reshow)} style={{ cursor: "pointer" }}></i>
            </div>
            <button className="enterBtn" disabled={loading}>
              <i className={loading ? "bx bx-refresh bx-spin" : "bx bx-plus-circle"} style={{ color: "black" }}></i>
              <span>{loading ? "Loading..." : "Create an account"}</span>
            </button>
            <center>
              <span className="authLink">Already have an account? <Link to="/signin" style={{ color: "#A3E635" }}>Sign In</Link></span>
            </center>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp