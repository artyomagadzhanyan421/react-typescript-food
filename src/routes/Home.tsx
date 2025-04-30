import Recommended from "../components/Recommended";
import Latest from "../components/Latest";
import Popular from "../components/Popular";
import Navbar from "../components/Navbar";

function Home() {
  const username = localStorage.getItem("username");

  document.title = `Welcome, ${username}`;

  return (
    <div className="Home">
      <Navbar />
      <Recommended />
      <Popular />
      <Latest />
    </div>
  )
}

export default Home