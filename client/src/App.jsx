import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "antd/dist/antd";
import Exercises from "./pages/Exercises";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home></Home>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/exercises" element={<Exercises />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Landing /> */}
    </div>
  );
}

export default App;
export function ProtectedRoute(props) {
  if (localStorage.getItem("workout-tracker-user")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
