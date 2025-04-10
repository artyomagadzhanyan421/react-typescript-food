import { useState } from "react";
import { useNavigate } from "react-router";

function Home() {
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleSignOut = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://node-express-food.vercel.app/auth/signout", {
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
    <div>
      <p>Welcome, {username}!</p>
      <button onClick={handleSignOut}>{loading ? "Loading..." : "Sign Out"}</button>
    </div>
  )
}

export default Home