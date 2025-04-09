import './App.css';
import { Routes, Route } from 'react-router';

// Routes
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App
