import { useParams } from "react-router";

// Component
import Navbar from "../components/Navbar";

//Hooks 
import useFetch from "../hooks/useFetch";

// Types
import TypeRecipe from "../types/TypeRecipe";

// CSS
import "../styles/Recipe.css";

//.env
const apiUrl = import.meta.env.VITE_API_URL;

function Recipe() {
    const { id } = useParams();

    const { recipes: recipe, loading, error } = useFetch<TypeRecipe>(`${apiUrl}recipes/${id}`);

    return (
        <div className="Home">
            <Navbar />
            <div className="Recipe">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : !recipe ? (
                    <p>Recipe not found!</p>
                ) : (
                    <div className="recipe-data">
                        <div className="recipe-picture">
                            <div className="recipeTop">
                                <p>{recipe.cuisine}</p>
                                <button className="mark">
                                    <i className='bx bx-bookmark' style={{ fontSize: 20 }}></i>
                                </button>
                            </div>
                            <img src={recipe.picture} alt={recipe.picture} />
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Recipe