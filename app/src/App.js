import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App" align="center">
        <nav>
          <Link to="/login">{<h1>Login</h1>}</Link>
          <Link to="/register">{<h1>Register</h1>}</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
