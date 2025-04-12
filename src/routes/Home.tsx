import { useState } from "react";
import { useNavigate } from "react-router";

// Components
import Recipes from "../components/Recipes";

//.env
const apiUrl = import.meta.env.VITE_API_URL;

function Home() {
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleSignOut = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}auth/signout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setLoading(false);
        alert("Failed to sign out!");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      navigate("/signin");
    } catch (err) {
      setLoading(false);
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
            {loading ? "Loading..." : "Sign Out"}
          </button>
        </div>
      </nav>
      <Recipes />
    </div>
  )
}

export default Home