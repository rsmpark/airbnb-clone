import { Route, Routes } from "react-router-dom";
import axios from "axios";

import { UserContextProvider } from "./context/UserContext";
import Layout from "./layouts/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Places from "./pages/Places";
import PlacesForm from "./pages/PlacesForm";
import Profile from "./pages/Profile";
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
          <Route path="account" element={<Profile />} />
          <Route path="account/places" element={<Places />} />
          <Route path="account/places/new" element={<PlacesForm />} />
          <Route path="account/places/:id" element={<PlacesForm />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
