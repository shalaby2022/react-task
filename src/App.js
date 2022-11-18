import NavBar from "./components/NavBar";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
