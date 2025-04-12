import { useState } from "react";
import { useNavigate } from "react-router";

// Components
import Recommended from "../components/Recommended";

// Hooks
import useFetch from "../hooks/useFetch";

//.env
const apiUrl = import.meta.env.VITE_API_URL;

function Home() {
  const { recipes, loading, error } = useFetch(`${apiUrl}recipes`);
  const [signout, setSignout] = useState(false);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleSignOut = async () => {
    setSignout(true);

    try {
      const response = await fetch(`${apiUrl}auth/signout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setSignout(false);
        alert("Failed to sign out!");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      navigate("/signin");
    } catch (err) {
      setSignout(false);
      console.error(err);
    }
  };

  document.title = `Welcome, ${username}`;

  return (
    <div className="Home">
      <nav>
        <div className="flex">
          <div className="username">
            <i className='bx bx-at' style={{ fontSize: 24 }}></i>
            <p>Hi, {username}!</p>
          </div>
          <button className="enterBtn" onClick={handleSignOut}>
            {signout ? "Loading..." : "Sign Out"}
          </button>
        </div>
      </nav>
      <Recommended recipes={recipes} loading={loading} error={error} />
    </div>
  )
}

export default Home