import { Link } from "react-router";

// Components
import Navbar from "../components/Navbar";
import LoadingExplore from "../components/loading/LoadingExplore";

// Hooks 
import useFetch from "../hooks/useFetch";

// Types
import TypeRecipe from "../types/TypeRecipe";

// .env
const apiUrl = import.meta.env.VITE_API_URL;
// const local = import.meta.env.VITE_LOCALHOST_API_URL;

function Saved() {
    const { recipes, loading, error } = useFetch<TypeRecipe[]>(`${apiUrl}recipes/saved`);

    document.title = "Food Recipes | Saved recipes";

    return (
        <div className="Home">
            <Navbar />
            <div className="Recipes">
                {loading ? (
                    <LoadingExplore />
                ) : error ? (
                    <div className="error" style={{ width: "fit-content" }}>
                        <i className='bx bx-error-circle'></i>
                        <span>{error}, please refresh the page!</span>
                    </div>
                ) : recipes?.length === 0 ? (
                    <div className="error" style={{ width: "fit-content" }}>
                        <i className='bx bx-error-circle'></i>
                        <span>No recipes saved!</span>
                    </div>
                ) : (
                    <div>
                        <div className="slider-arrows">
                            <h2>Saved recipes</h2>
                            <button className="username">
                                <i className='bx bx-filter-alt' style={{ fontSize: 23 }}></i>
                                <span>Let's search...</span>
                            </button>
                        </div>
                        <div className="explore">
                            {recipes?.map((recipe) => (
                                <div className="recipe" key={recipe._id}>
                                    <div className="recipeTop">
                                        <p>{recipe.cuisine}</p>
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

export default Saved