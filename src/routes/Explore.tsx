import { Link } from "react-router";
import { useState } from "react";

// Components
import Navbar from "../components/Navbar";
import LoadingExplore from "../components/loading/LoadingExplore";

// Hooks
import useFetch from '../hooks/useFetch';

// Types
import TypeRecipe from "../types/TypeRecipe";

//.env
const apiUrl = import.meta.env.VITE_API_URL;
// const local = import.meta.env.VITE_LOCALHOST_API_URL;

function Explore() {
    const { recipes, loading, error } = useFetch<TypeRecipe[]>(`${apiUrl}recipes/`);
    const [recipesState, setRecipes] = useState<TypeRecipe[] | null>(null);

    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [tags, setTags] = useState("");
    const [cuisine, setCuisine] = useState('');

    const [toggle, setToggle] = useState(false);
    const [search, setSearch] = useState(false);
    const [errorSearch, setErrorSearch] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(true);

        try {
            const params = new URLSearchParams();
            if (title) params.append("title", title);
            if (time) params.append("time", time);
            if (ingredients) params.append("ingredients", ingredients);
            if (tags) params.append("tags", tags);
            if (cuisine) params.append("cuisine", cuisine);

            const response = await fetch(`${apiUrl}recipes/search?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // if your auth system uses Bearer token
                },
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorSearch(data.message);
                return;
            }

            const data = await response.json();
            setRecipes(data); // <-- Add this state below
            setToggle(false); // Close modal after success
            setErrorSearch("");
        } catch (error) {
            setErrorSearch("Something went wrong, try again!");
        } finally {
            setSearch(false);
        }
    };

    document.title = "Food Recipes | Explore";

    return (
        <div className="Home">
            <Navbar />
            <div className="Recipes">
                {loading ? (
                    <LoadingExplore />
                ) : error ? (
                    <div className='error' style={{ width: "fit-content" }}>
                        <i className='bx bx-error-circle'></i>
                        <span>{error}, please refresh the page!</span>
                    </div>
                ) : (
                    <div>
                        <div className="slider-arrows">
                            <h2>Explore recipes</h2>
                            <button className="username" onClick={(() => setToggle(!toggle))}>
                                <i className='bx bx-filter-alt' style={{ fontSize: 23 }}></i>
                                <span>Let's search...</span>
                            </button>
                        </div>

                        <div className={toggle ? "overlay pop" : "overlay"}>
                            <form className="instructions search" onSubmit={handleSearch}>
                                <div className="slider-arrows" style={{ marginBottom: 22 }}>
                                    <h2 style={{ marginBottom: 0 }}>Let's search...</h2>
                                    <i
                                        className='bx bx-x-circle'
                                        style={{ cursor: "pointer", fontSize: 23 }}
                                        onClick={(() => setToggle(!toggle))}
                                    ></i>
                                </div>
                                <div className="error" style={{ display: errorSearch ? "" : "none" }}>
                                    <i className='bx bx-error-circle'></i>
                                    <span>{errorSearch}</span>
                                </div>
                                <div className="inputBox">
                                    <i className='bx bx-bowl-rice'></i>
                                    <input type="text" placeholder="Title*" value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <i className='bx bx-time-five'></i>
                                    <input type="number" placeholder="Time (in minutes)*" value={time} onChange={e => setTime(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <i className='bx bx-food-menu'></i>
                                    <input type="text" placeholder="Ingredients (with a comma)*" value={ingredients} onChange={e => setIngredients(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <i className='bx bx-hash'></i>
                                    <input type="text" placeholder="Tags (with a comma)*" value={tags} onChange={e => setTags(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <i className='bx bx-map'></i>
                                    <input type="text" placeholder="Cuisine*" value={cuisine} onChange={e => setCuisine(e.target.value)} />
                                </div>

                                <div className="btnFlex">
                                    <button className="enterBtn" disabled={search}>
                                        <i className={search ? "bx bx-refresh bx-spin" : "bx bx-filter-alt"} style={{ color: "black" }}></i>
                                        <span>{search ? "Loading..." : "Search recipes"}</span>
                                    </button>
                                    <button
                                        className="enterBtn reset"
                                        type="reset"
                                        disabled={search}
                                        onClick={() => {
                                            setTitle("");
                                            setTime("");
                                            setIngredients("");
                                            setTags("");
                                            setCuisine("");
                                            setRecipes(null);
                                        }}
                                    >
                                        <i className="bx bx-reset" style={{ color: "white" }}></i>
                                        <span>Reset data</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="explore">
                            {(recipesState || recipes)?.map((recipe) => (
                                <div className="recipe" key={recipe._id}>
                                    <div className="recipeTop">
                                        <p>{recipe.cuisine}</p>
                                        <button className="mark">
                                            <i className='bx bx-book-bookmark' style={{ fontSize: 20 }}></i>
                                        </button>
                                    </div>
                                    <Link to={`/recipe/${recipe._id}`} style={{ color: 'white' }}>
                                        <img src={recipe.picture} alt={recipe.title} />
                                        <div className="recipe-text">
                                            <p className='recipe-title'>{recipe.title}</p>
                                            <div className="recipe-time">
                                                <div>
                                                    <i className='bx bx-time-five' style={{ fontSize: 19 }}></i>
                                                    <p>{recipe.time} min</p>
                                                </div>
                                                <div>
                                                    <i className='bx bx-like' style={{ fontSize: 19 }}></i>
                                                    <p>
                                                        {recipe.likes + recipe.dislikes === 0
                                                            ? "0%"
                                                            : `${Math.round((recipe.likes / (recipe.likes + recipe.dislikes)) * 100)}%`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Explore