import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
const imgUrl = import.meta.env.VITE_UNSPLASH_API_KEY;

function Recipe() {
    const { id } = useParams();
    const [copied, setCopied] = useState(false);
    const [ingredientImages, setIngredientImages] = useState<Record<string, string>>({});
    const [loadingImg, setLoadingImg] = useState(true);

    const { recipes: recipe, loading, error } = useFetch<TypeRecipe>(`${apiUrl}recipes/${id}`);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link: ', err);
        }
    };

    useEffect(() => {
        const fetchIngredientImages = async () => {
            if (!recipe || !recipe.ingredients) return;

            const imageResults: Record<string, string> = {};

            await Promise.all(
                recipe.ingredients.map(async (ingredient) => {
                    const query = encodeURIComponent(ingredient);
                    try {
                        const res = await fetch(
                            `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
                            {
                                headers: {
                                    Authorization: imgUrl
                                }
                            }
                        );
                        const data = await res.json();
                        if (data?.photos?.[0]?.src?.medium) {
                            imageResults[ingredient] = data.photos[0].src.medium;
                        }
                    } catch (err) {
                        console.error(`Error fetching image for "${ingredient}"`, err);
                    }
                })
            );

            setIngredientImages(imageResults);
            setLoadingImg(false);
        };

        fetchIngredientImages();
    }, [recipe]);

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
                            <img src={recipe.picture} alt={recipe.picture} />
                            <div className="recipe-text">
                                <div className="recipe-time recipeObj">
                                    <div style={{ color: "black", fontWeight: "bold" }}>
                                        <i className='bx bx-time-five' style={{ fontSize: 19 }}></i>
                                        <p>{recipe.time} min</p>
                                    </div>
                                    <div style={{ color: "black", fontWeight: "bold" }}>
                                        <i className='bx bx-like' style={{ fontSize: 19 }}></i>
                                        <p>
                                            {recipe.likes + recipe.dislikes === 0
                                                ? "0%"
                                                : `${Math.round((recipe.likes / (recipe.likes + recipe.dislikes)) * 100)}%`}
                                        </p>
                                    </div>
                                    <div style={{ color: "black", fontWeight: "bold" }}>
                                        <i className='bx bx-book-bookmark' style={{ fontSize: 19 }}></i>
                                        <p>{recipe.adds}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="recipe-block">
                            <p className="recipe-name">{recipe.title}</p>
                            <div className="recipe-flex">
                                <div>
                                    <i className='bx bx-food-menu' style={{ fontSize: 22.5 }}></i>
                                    <p>{recipe.cuisine}</p>
                                </div>
                                <button style={{ cursor: "pointer" }}>
                                    <i className='bx bx-book-bookmark' style={{ fontSize: 22.5 }}></i>
                                    <p>Add</p>
                                </button>
                                <button style={{ cursor: "pointer" }}>
                                    <i className='bx bx-like' style={{ fontSize: 22.5 }}></i>
                                    <p>Like</p>
                                </button>
                                <button style={{ cursor: "pointer" }} onClick={handleCopy}>
                                    <i className={copied ? "bx bx-check-circle" : "bx bx-share-alt"} style={{ fontSize: 22.5 }}></i>
                                    <p>{copied ? 'Copied!' : 'Share'}</p>
                                </button>
                            </div>
                            <p className="reipe-desc">{recipe.description}</p>
                        </div>
                        <div className="ingredients">
                            <h2>Ingredients</h2>
                            <ul>
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient}>
                                        {loadingImg ? (
                                            <Skeleton
                                                width={40}
                                                height={40}
                                                baseColor="#44403C"
                                                highlightColor='#78716C'
                                                circle
                                            />
                                        ) : (
                                            <img src={ingredientImages[ingredient]} alt={ingredient} />
                                        )}
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Recipe