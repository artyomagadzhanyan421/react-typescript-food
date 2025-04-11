import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';

// Routes
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleTokenChange = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);
    };

    window.addEventListener('tokenChange', handleTokenChange);
    return () => window.removeEventListener('tokenChange', handleTokenChange);
  }, []);

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
