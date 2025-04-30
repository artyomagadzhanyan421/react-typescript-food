import { Link } from "react-router";

// Components
import LoadingExplore from "./loading/LoadingExplore";

// Hooks
import useFetch from '../hooks/useFetch';

// Types
import TypeRecipe from "../types/TypeRecipe";

//.env
const apiUrl = import.meta.env.VITE_API_URL;
// const local = import.meta.env.VITE_LOCALHOST_API_URL;

function Popular() {
    const { recipes, loading, error } = useFetch<TypeRecipe[]>(`${apiUrl}recipes/popular`);

    return (
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
                    <span>No recipes found, please try again later!</span>
                </div>
            ) : (
                <div>
                    <div className="slider-arrows">
                        <h2>Most Popular</h2>
                    </div>
                    <div className="explore popular">
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
    )
}

export default Popular