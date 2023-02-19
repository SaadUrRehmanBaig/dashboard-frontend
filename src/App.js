import Login from './components/Login';
import Register from './components/Register.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './components/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Auth />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
