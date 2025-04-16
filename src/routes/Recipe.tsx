import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Component
import Navbar from "../components/Navbar";
import LoadingRecipe from "../components/loading/LoadingRecipe";

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
    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    const [copied, setCopied] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [loadingImg, setLoadingImg] = useState(true);

    const [ingredientImages, setIngredientImages] = useState<Record<string, string>>({});

    const { recipes: recipe, loading, error } = useFetch<TypeRecipe>(`${apiUrl}recipes/${id}`);

    {
        loading ? (
            document.title = "Loading..."
        ) : error ? (
            document.title = `${error}`
        ) : !recipe ? (
            document.title = "Not Found!"
        ) : (
            document.title = `Food Recipes | ${recipe.title}`
        )
    }

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

    const handleDelete = async () => {
        if (!token || !id) return;
        setDeleting(true);
        try {
            const res = await fetch(`${apiUrl}recipes/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                navigate("/");
            } else {
                console.error(data.message);
                alert(data.message);
                setDeleting(false);
            }
        } catch (err) {
            console.error("Error deleting recipe:", err);
            setDeleting(false);
        }
    };

    return (
        <div className="Home">
            <Navbar />
            <div className="Recipe">
                {loading ? (
                    <LoadingRecipe />
                ) : error ? (
                    <p>{error}</p>
                ) : !recipe ? (
                    <p>Recipe not found!</p>
                ) : (
                    <div className="recipe-data">
                        <div className="recipe-picture">
                            {role === "admin" && (
                                <div className="recipeTop adminTop">
                                    <button className="mark trash" onClick={handleDelete} disabled={deleting}>
                                        <i className={deleting ? "bx bx-refresh bx-spin" : "bx bx-trash"} style={{ fontSize: 20 }}></i>
                                    </button>
                                </div>
                            )}
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

                            {/* dangerouslySetInnerHTML={{ __html: recipe.instructions }} */}
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
                        <div className="details">
                            <h2>Rating Details</h2>
                            <div className="rate-flex">
                                <div>
                                    <i className='bx bxs-like' style={{ background: "#16A34A" }}></i>
                                    <span>{recipe.likes} liked</span>
                                </div>
                                <div>
                                    <i className='bx bxs-dislike' style={{ background: "#DC2626" }}></i>
                                    <span>{recipe.dislikes} disliked</span>
                                </div>
                            </div>
                            <div className="tags">
                                {recipe.tags.map((tag) => (
                                    <p className="tag" key={tag}>{tag}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Recipe