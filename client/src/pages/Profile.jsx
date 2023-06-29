import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/UserContext";

import AccountNav from "../layouts/AccountNav";
import Places from "./Places";

export default function Profile() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} {user.email}
          <button onClick={logout} className="primary max-w-sm mt-2" type="button">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <Places />}
    </div>
  );
}
