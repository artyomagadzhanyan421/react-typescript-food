import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

// CSS
import "../styles/Navbar.css";

//.env
const apiUrl = import.meta.env.VITE_API_URL;

function Navbar() {
    const [signout, setSignout] = useState(false);
    const [drop, setDrop] = useState(false);

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

    return (
        <div className="Navbar">
            <nav>
                <div className="drop-down">
                    <div className="username" onClick={() => setDrop(!drop)}>
                        <i className='bx bx-at' style={{ fontSize: 23 }}></i>
                        <p>Hi, {username}</p>
                        <i className='bx bx-chevron-down' style={{ fontSize: 20 }}></i>
                    </div>
                    <button className={drop ? "drop show" : "drop"} onClick={handleSignOut}>
                        <i className={signout ? "bx bx-refresh bx-spin" : "bx bx-log-out-circle"} style={{ fontSize: 23 }}></i>
                        {signout ? "Loading..." : "Sign Out"}
                    </button>
                </div>
                <aside>
                    <ul>
                        <li>
                            <Link to="/">
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <a href="#">
                                <span>Explore</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>Saved</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>Favourites</span>
                            </a>
                        </li>
                    </ul>
                    <button className="enterBtn navBtn">
                        <i className="bx bx-plus-circle" style={{ color: "black" }}></i>
                        <span>Let's cook...</span>
                    </button>
                </aside>
                <i
                    className='bx bx-grid-alt'
                    style={{
                        color: "white",
                        cursor: "pointer",
                        fontSize: 23
                    }}
                ></i>
            </nav>
        </div>
    )
}

export default Navbar