import useFetch from "../hooks/useFetch";

// CSS
import "../styles/Recipes.css";

function Recipes() {
    const { recipes, loading, error } = useFetch("https://node-express-food.vercel.app/recipes");

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