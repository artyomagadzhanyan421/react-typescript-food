import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";
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
const imgUrl = import.meta.env.VITE_PEXELS_API_KEY;
// const local = import.meta.env.VITE_LOCALHOST_API_URL;

function Recipe() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { recipes: recipe, loading, error } = useFetch<TypeRecipe>(`${apiUrl}recipes/${id}`);

    const [ingredientImages, setIngredientImages] = useState<Record<string, string>>({});

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    const [copied, setCopied] = useState(false);
    const [save, setSave] = useState(false);

    const [deleting, setDeleting] = useState(false);
    const [saving, setSaving] = useState(false);

    const [loadingImg, setLoadingImg] = useState(true);
    const [toggle, setToggle] = useState(false);

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

    useEffect(() => {
        if (recipe) {
            setSave(recipe.isSaved); 
        }
    }, [recipe]);

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

    const handleSave = async () => {
        try {
            setSaving(true);
            const res = await fetch(`${apiUrl}recipes/${id}/${save ? 'unsave' : 'save'}`, {
                method: save ? "DELETE" : "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                setSave(!save);
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error("Connection error:", err);
            alert("Connection error!");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="Home">
            <Navbar />
            <div className="Recipe">
                {loading && loadingImg ? (
                    <LoadingRecipe />
                ) : error ? (
                    <div className="error" style={{ width: "fit-content" }}>
                        <i className='bx bx-error-circle'></i>
                        <span>Failde to fetch a recipe, please refresh the page!</span>
                    </div>
                ) : !recipe ? (
                    <div className="error" style={{ width: "fit-content" }}>
                        <i className='bx bx-error-circle'></i>
                        <span>No recipe found, please try again later!</span>
                    </div>
                ) : (
                    <div className="recipe-data">
                        <div className="recipe-picture">
                            <div className="recipeTop adminTop">
                                <p>{recipe.cuisine}</p>
                                {role === "admin" && (
                                    <div className="adminFuncs">
                                        <button className="mark trash" onClick={handleDelete} disabled={deleting}>
                                            <i className={deleting ? "bx bx-refresh bx-spin" : "bx bx-trash"} style={{ fontSize: 20 }}></i>
                                        </button>
                                        <Link to={`/edit/${recipe._id}`} className="mark edit">
                                            <i className='bx bx-edit' style={{ fontSize: 20 }}></i>
                                        </Link>
                                    </div>
                                )}
                            </div>
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
                                <button style={{ cursor: "pointer" }} onClick={handleSave}>
                                    <i className={saving ? "bx bx-refresh bx-spin" : save ? "bx bx-bookmark-alt-minus" : "bx bx-book-bookmark"} style={{ fontSize: 22.5 }}></i>
                                    <p>{saving ? "Saving..." : save ? "Unsave" : "Save"}</p>
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
                            <button className="enterBtn instBtn" onClick={(() => setToggle(!toggle))}>
                                <i className='bx bx-bowl-rice' style={{ color: "black" }}></i>
                                <span>Instructions</span>
                            </button>
                            <div className={toggle ? "overlay pop" : "overlay"}>
                                <div className="instructions">
                                    <div className="slider-arrows">
                                        <h2>Instructions</h2>
                                        <i
                                            className='bx bx-x-circle'
                                            style={{ cursor: "pointer", fontSize: 23 }}
                                            onClick={(() => setToggle(!toggle))}
                                        ></i>
                                    </div>
                                    <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                                </div>
                            </div>
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