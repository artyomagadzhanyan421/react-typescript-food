import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

// CSS
import "../styles/Navbar.css";

//.env
const apiUrl = import.meta.env.VITE_API_URL;
// const local = import.meta.env.VITE_LOCALHOST_API_URL;

function Navbar() {
    const [signout, setSignout] = useState(false);
    const [drop, setDrop] = useState(false);

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

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

    const [toggle, setToggle] = useState(false);

    return (
        <div className="Navbar">
            <nav>
                <div className="drop-down">
                    <div className="username" onClick={() => setDrop(!drop)}>
                        <i className='bx bx-at' style={{ fontSize: 23 }}></i>
                        <p>Hi, {username}</p>
                        <i className='bx bx-chevron-down' id={drop ? "rotate" : ""} style={{ fontSize: 20 }}></i>
                    </div>
                    <button className={drop ? "drop show" : "drop"} onClick={handleSignOut}>
                        <i className={signout ? "bx bx-refresh bx-spin" : "bx bx-log-out-circle"} style={{ fontSize: 23 }}></i>
                        {signout ? "Loading..." : "Sign Out"}
                    </button>
                </div>
                <aside className={toggle ? "asidePop" : ""}>
                    <ul>
                        <li>
                            <Link to="/" onClick={() => setToggle(!toggle)}>
                                <i className="bx bx-home-alt" id="nav-i"></i>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/explore" onClick={() => setToggle(!toggle)}>
                                <i className="bx bx-compass" id="nav-i"></i>
                                <span>Explore</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/saved" onClick={() => setToggle(!toggle)}>
                                <i className="bx bx-book-bookmark" id="nav-i"></i>
                                <span>Saved</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/favourites" onClick={() => setToggle(!toggle)}>
                                <i className="bx bx-like" id="nav-i"></i>
                                <span>Favourites</span>
                            </Link>
                        </li>
                    </ul>
                    {role === "admin" ? (
                        <Link to="/create" className="enterBtn navBtn">
                            <i className="bx bx-plus-circle"></i>
                            <span>Let's cook...</span>
                        </Link>
                    ) : (
                        <div />
                    )}
                </aside>
                <i
                    className='bx bx-grid-alt'
                    style={{
                        color: "white",
                        cursor: "pointer",
                        fontSize: 23
                    }}
                    onClick={() => setToggle(!toggle)}
                ></i>
            </nav>
            <div onClick={() => setToggle(!toggle)} className={toggle ? "overlay pop" : "overlay"}></div>
        </div>
    )
}

export default Navbar