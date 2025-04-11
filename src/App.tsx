import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

// Routes
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          handleLogout(); // Token expired already
        } else {
          // Set timeout to auto-logout when it expires
          const timeout = (decoded.exp - now) * 1000;
          const logoutTimer = setTimeout(() => {
            handleLogout();
          }, timeout);

          return () => clearTimeout(logoutTimer); // cleanup
        }
      } catch (err) {
        console.error("Invalid token");
        handleLogout();
      }
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      await fetch("https://node-express-food.vercel.app/auth/signout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    localStorage.clear();
    setToken(null);
    navigate("/signin");
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/signin" replace />}
        />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App
