type TypeRecipe = {
    _id: string;
    title: string;
    picture: string;
    time: number;
    likes: number;
    dislikes: number;
    cuisine: string;
    adds: number;
    description: string;
    ingredients: string[];
    tags: string[];
    instructions: string;
}

export default TypeRecipe;