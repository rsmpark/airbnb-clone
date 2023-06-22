import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Layout from "./layouts/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
