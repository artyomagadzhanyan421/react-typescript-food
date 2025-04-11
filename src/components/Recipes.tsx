import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

// Hooks
import useFetch from "../hooks/useFetch";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

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
                    <h2>Recommended</h2>
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 0,
                            modifier: 0,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow]}
                        className="recommend"
                    >
                        {recipes.map((recipe) => (
                            <SwiperSlide>
                                <button className="mark">
                                    <i className='bx bxs-book-bookmark' style={{ fontSize: 20 }}></i>
                                </button>
                                <img src={recipe.picture} />
                                <div className="recipe-text">
                                    <p style={{ fontWeight: "bold" }}>{recipe.title}</p>
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
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    )
}

export default Recipes