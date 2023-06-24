import { Route, Routes } from "react-router-dom";
import axios from "axios";

import { UserContextProvider } from "./context/UserContext";
import Layout from "./layouts/Layout";
import Account from "./pages/Account";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account/:subpage?" element={<Account />} />
          <Route path="account/:subpage/:action" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
