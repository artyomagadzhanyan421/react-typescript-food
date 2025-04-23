import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import LoadingExplore from "../components/loading/LoadingExplore";
import TypeRecipe from "../types/TypeRecipe";
import useFetch from "../hooks/useFetch";

const apiUrl = import.meta.env.VITE_API_URL;
// const local = import.meta.env.VITE_LOCALHOST_API_URL;

function Explore() {
    const { recipes: initialRecipes, loading, error } = useFetch<TypeRecipe[]>(`${apiUrl}recipes?skip=0&limit=6`);

    const [allRecipes, setAllRecipes] = useState<TypeRecipe[]>([]);
    const [skip, setSkip] = useState(6);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [fetchMoreError, setFetchMoreError] = useState("");
    const [reachedEnd, setReachedEnd] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [toggle, setToggle] = useState(false);

    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [tags, setTags] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [searchError, setSearchError] = useState('');

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (initialRecipes) {
            setAllRecipes(initialRecipes);
        }
    }, [initialRecipes]);

    const loadMoreRecipes = useCallback(async () => {
        try {
            setIsFetchingMore(true);
            setFetchMoreError("");

            const token = localStorage.getItem("token");
            const res = await fetch(`${apiUrl}recipes?skip=${skip}&limit=6`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch recipes!");
            }

            const newRecipes: TypeRecipe[] = await res.json();

            if (newRecipes.length < 6) {
                setHasMore(false);
                setReachedEnd(true);
            }

            const newUnique = newRecipes.filter(r => !allRecipes.find(existing => existing._id === r._id));
            setAllRecipes(prev => [...prev, ...newUnique]);
            setSkip(prev => prev + 6);
        } catch (err: any) {
            setFetchMoreError(err.message || "Something went wrong");
            setHasMore(false);
        } finally {
            setIsFetchingMore(false);
        }
    }, [skip, allRecipes]);

    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetchingMore && !loading && !error) {
                loadMoreRecipes();
            }
        });

        const currentRef = observerRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [loadMoreRecipes, isFetchingMore, loading, error]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsFetchingMore(true);
        setSearchError("");
        setFetchMoreError("");
        setReachedEnd(false);

        const token = localStorage.getItem("token");

        const params = new URLSearchParams();
        if (title) params.append("title", title);
        if (time) params.append("time", time);
        if (ingredients) params.append("ingredients", ingredients);
        if (tags) params.append("tags", tags);
        if (cuisine) params.append("cuisine", cuisine);

        try {
            const res = await fetch(`${apiUrl}recipes?${params.toString()}&skip=0&limit=6`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setAllRecipes(data);
            setSkip(6);
            setHasMore(data.length === 6);
            setToggle(false);
        } catch (err: any) {
            setSearchError(err.message);
        } finally {
            setIsFetchingMore(false);
        }
    };

    document.title = "Food Recipes | Explore";

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
                ) : (
                    <div>
                        <div className="slider-arrows">
                            <h2>Explore recipes</h2>
                            <button className="username" onClick={(() => setToggle(!toggle))}>
                                <i className='bx bx-filter-alt' style={{ fontSize: 23 }}></i>
                                <span>Filter search</span>
                            </button>
                        </div>

                        <div className={toggle ? "overlay pop" : "overlay"}>
                            <form className="instructions search" onSubmit={handleSearch}>
                                <div className="slider-arrows" style={{ marginBottom: 22 }}>
                                    <h2 style={{ marginBottom: 0 }}>Let's search</h2>
                                    <i
                                        className='bx bx-x-circle'
                                        style={{ cursor: "pointer", fontSize: 23 }}
                                        onClick={(() => setToggle(!toggle))}
                                    ></i>
                                </div>
                                <div className="error" style={{ display: searchError ? "" : "none" }}>
                                    <i className='bx bx-error-circle'></i>
                                    <span>{searchError}</span>
                                </div>
                                <div className="inputBox">
                                    <i className='bx bx-bowl-rice'></i>
                                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <i className='bx bx-time-five'></i>
                                    <input type="number" placeholder="Time (in minutes)" value={time} onChange={e => setTime(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <i className='bx bx-food-menu'></i>
                                    <input type="text" placeholder="Ingredients (with a comma)" value={ingredients} onChange={e => setIngredients(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <i className='bx bx-hash'></i>
                                    <input type="text" placeholder="Tags (with a comma)" value={tags} onChange={e => setTags(e.target.value)} />
                                </div>
                                <div className="inputBox">
                                    <i className='bx bx-map'></i>
                                    <input type="text" placeholder="Cuisine" value={cuisine} onChange={e => setCuisine(e.target.value)} />
                                </div>
                                <div className="btnFlex">
                                    <button className="enterBtn">
                                        <i className={isFetchingMore ? "bx bx-refresh bx-spin" : "bx bx-search-alt-2"} style={{ color: "black" }}></i>
                                        <span>{isFetchingMore ? "Searching..." : "Search recipe"}</span>
                                    </button>
                                    <button
                                        className="enterBtn reset"
                                        type="button"
                                        onClick={() => {
                                            setTitle("");
                                            setTime("");
                                            setIngredients("");
                                            setTags("");
                                            setCuisine("");
                                            setSkip(6);
                                            setHasMore(true);
                                            setReachedEnd(false);
                                            setSearchError("");
                                            setAllRecipes(initialRecipes || []);
                                        }}
                                    >
                                        <i className="bx bx-reset" style={{ color: "white" }}></i>
                                        <span>Reset recipe</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="explore">
                            {allRecipes.map(recipe => (
                                <div className="recipe" key={recipe._id}>
                                    <div className="recipeTop">
                                        <p>{recipe.cuisine}</p>
                                        <button className="mark">
                                            <i className='bx bx-book-bookmark' style={{ fontSize: 20 }}></i>
                                        </button>
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

                        {isFetchingMore && (
                            <div style={{ marginTop: 40, fontWeight: "bold", textAlign: "center" }}>
                                <span>Loading...</span>
                            </div>
                        )}
                        {fetchMoreError && (
                            <center>
                                <div className="error" style={{ width: "fit-content", marginTop: 40 }}>
                                    <i className='bx bx-error-circle'></i>
                                    <span>{fetchMoreError}</span>
                                </div>
                            </center>
                        )}
                        {reachedEnd && !fetchMoreError && (
                            <center>
                                <div className="error done" style={{ width: "fit-content", marginTop: 40 }}>
                                    <i className='bx bx-check-circle'></i>
                                    <p>No more recipes to load!</p>
                                </div>
                            </center>
                        )}

                        <div ref={observerRef} style={{ height: 1 }}></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Explore;