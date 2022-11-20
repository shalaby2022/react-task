import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import ModalPopUp from "./components/modal/Modal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/react-task/" element={<Users />} />
        <Route path="/react-task/login" element={<Login />} />
        <Route path="/react-task/popup" element={<ModalPopUp />} />
      </Routes>
    </Router>
  );
}

export default App;
