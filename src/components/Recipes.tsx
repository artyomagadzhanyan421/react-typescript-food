import useFetch from "../hooks/useFetch";

// CSS
import "../styles/Recipes.css";

//.env
const apiUrl = import.meta.env.VITE_API_URL;

function Recipes() {
    const { recipes, loading, error } = useFetch(`${apiUrl}recipes`);

    return (
        <div className="Recipes">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : recipes.length === 0 ? (
                <p>No recipes found!</p>
            ) : (
                <div className="recipes-slider">
                    {recipes.map((recipe) => (
                        <div key={recipe._id}>
                            <p>{recipe.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Recipes