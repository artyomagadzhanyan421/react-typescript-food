import { useState, useEffect } from "react";

function useFetch<T>(url: string) {
    const [recipes, setRecipes] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const handleData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch recipes!");
                }

                const data = await res.json();
                setRecipes(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        handleData();
    }, []);

    return { recipes, loading, error }
}

export default useFetch;