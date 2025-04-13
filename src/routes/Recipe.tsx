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
                    <div>
                        <p>{recipe.title}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Recipe