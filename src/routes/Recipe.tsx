import { useParams } from "react-router";

//Hooks 
import useFetch from "../hooks/useFetch";

// Types
import TypeRecipe from "../types/TypeRecipe";

//.env
const apiUrl = import.meta.env.VITE_API_URL;

function Recipe() {
    const { id } = useParams();

    const { recipes: recipe, loading, error } = useFetch<TypeRecipe>(`${apiUrl}recipes/${id}`);

    return (
        <div>
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
    )
}

export default Recipe