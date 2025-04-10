import { useState } from "react";
import { Link } from "react-router";
import "../styles/Auth.css";

function SignIn() {
  const [show, setShow] = useState(false);

  document.title = "Food Recipes | Sign In";

  return (
    <div className="SignIn">
      <div className="authGrid">
        <img src="https://www.onceuponachef.com/images/2019/07/Big-Italian-Salad-1200x1553.jpg" alt="image" />
        <form>
          <div className="formBlock">
            <h1>Enter an account</h1>
            <div className="inputBox">
              <i className='bx bx-user-circle'></i>
              <input type="text" placeholder="Enter username*" required />
            </div>
            <div className="inputBox">
              <i className='bx bx-lock-alt'></i>
              <input type={show ? "text" : "password"} placeholder="Enter password*" required />
              <i className={show ? "bx bx-hide" : "bx bx-show"} onClick={() => setShow(!show)} style={{ cursor: "pointer" }}></i>
            </div>
            <button className="enterBtn">
              <i className='bx bx-log-in' style={{ color: "black" }}></i>
              <span>Enter an account</span>
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