import { useState } from "react";

// Types
import TypeRecipe from "../types/TypeRecipe";

// .env
const apiUrl = import.meta.env.VITE_API_URL;

function useSearch() {
    const [recipesState, setRecipes] = useState<TypeRecipe[] | null>(null);

    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [tags, setTags] = useState("");
    const [cuisine, setCuisine] = useState("");

    const [toggle, setToggle] = useState(false);
    const [searching, setSearching] = useState(false);
    const [errorSearch, setErrorSearch] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearching(true);

        try {
            const params = new URLSearchParams();
            if (title) params.append("title", title);
            if (time) params.append("time", time);
            if (ingredients) params.append("ingredients", ingredients);
            if (tags) params.append("tags", tags);
            if (cuisine) params.append("cuisine", cuisine);

            const response = await fetch(`${apiUrl}recipes/search?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorSearch(data.message);
                return;
            }

            const data = await response.json();
            setRecipes(data);
            setToggle(false);
            setErrorSearch("");
        } catch (error) {
            setErrorSearch("Something went wrong, try again!");
        } finally {
            setSearching(false);
        }
    };

    const handleReset = () => {
        setTitle("");
        setTime("");
        setIngredients("");
        setTags("");
        setCuisine("");
        setRecipes(null);
    };

    return {
        title,
        time,
        ingredients,
        tags,
        cuisine,
        setTitle,
        setTime,
        setIngredients,
        setTags,
        setCuisine,
        toggle,
        setToggle,
        recipesState,
        searching,
        errorSearch,
        handleSearch,
        handleReset,
    };
}

export default useSearch