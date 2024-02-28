import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProfilePage from "./pages/ProfilePage";

function App() {

  return (
    <div>
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/signup" element={ <SignUp /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/users/:userId" element={ <ProfilePage /> } />
    </Routes>

    </div>
  )
}

export default App
