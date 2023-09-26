import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {  Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);

  const { user, ready, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }

  if (!ready) {
    return <h1>Loading ..........</h1>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      {/* <h1>Account page for {user.name}</h1> */}

      <AccountNav />

      {subpage === "profile" && (
        <div className="text-center max-w-xl mx-auto my-8 border-2 p-10 rounded-lg border-primary">
          <p>
            Logged in as : <b>{user.name}</b>
          </p>
          <p>Email id : {user.email} </p>
          <button
            className="bg-primary px-5 py-2 rounded-full w-1/4 my-8 text-white"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
