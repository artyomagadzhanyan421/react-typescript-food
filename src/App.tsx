import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

// Routes
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import Recipe from './routes/Recipe';
import Create from './routes/Create';
import Edit from './routes/Edit';

//.env
const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenUpdate = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);

      if (newToken) {
        try {
          const decoded: any = jwtDecode(newToken);
          const now = Date.now() / 1000;

          if (decoded.exp < now) {
            handleLogout(); // Token expired
          } else {
            const timeout = (decoded.exp - now) * 1000;
            const logoutTimer = setTimeout(() => {
              handleLogout();
            }, timeout);

            return () => clearTimeout(logoutTimer);
          }
        } catch (err) {
          console.error("Invalid token");
          handleLogout();
        }
      }
    };

    handleTokenUpdate(); // Run once on mount

    window.addEventListener('tokenChange', handleTokenUpdate);
    return () => window.removeEventListener('tokenChange', handleTokenUpdate);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      await fetch(`${apiUrl}auth/signout`, {
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
        <Route
          path='/recipe/:id'
          element={token ? <Recipe /> : <Navigate to="/signin" replace />}
        />
        <Route
          path='/create'
          element={
            token ? (() => {
              const decoded: any = jwtDecode(token);
              return decoded.role === 'admin'
                ? <Create />
                : <Navigate to="/" replace />;
            })() : <Navigate to="/signin" replace />
          }
        />
        <Route
          path='/edit/:id'
          element={
            token ? (() => {
              const decoded: any = jwtDecode(token);
              return decoded.role === 'admin'
                ? <Edit />
                : <Navigate to="/" replace />;
            })() : <Navigate to="/signin" replace />
          }
        />
      </Routes>
    </div>
  )
}

export default App
