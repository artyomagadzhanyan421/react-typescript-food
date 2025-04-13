import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Link } from 'react-router';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Components
import LoadingSlider from './loading/LoadingSlider';

// CSS
import "../styles/Recipes.css";

// Hooks
import useFetch from '../hooks/useFetch';

// Types
import TypeRecipe from "../types/TypeRecipe";

//.env
const apiUrl = import.meta.env.VITE_API_URL;

function Recipes() {
    const { recipes, loading, error } = useFetch<TypeRecipe[]>(`${apiUrl}recipes/random?limit=10`);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="Recipes">
            {loading ? (
                <LoadingSlider />
            ) : error ? (
                <p>{error}</p>
            ) : recipes?.length === 0 ? (
                <p>No recipes found!</p>
            ) : (
                <div>
                    <div className="slider-arrows">
                        <h2>Recommended</h2>
                        <div className="arrows">
                            <button ref={prevRef}>
                                <i className='bx bx-chevron-left' style={{ fontSize: 22 }}></i>
                            </button>
                            <button ref={nextRef}>
                                <i className='bx bx-chevron-right' style={{ fontSize: 22 }}></i>
                            </button>
                        </div>
                    </div>
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        slidesPerView={'auto'}
                        spaceBetween={20}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 0,
                            modifier: 0,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Navigation]}
                        onInit={(swiper) => {
                            // @ts-ignore
                            swiper.params.navigation.prevEl = prevRef.current;
                            // @ts-ignore
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                        className="recommend"
                    >
                        {recipes?.map((recipe) => (
                            <SwiperSlide key={recipe._id}>
                                <div className="recipeTop">
                                    <p>{recipe.cuisine}</p>
                                    <button className="mark">
                                        <i className='bx bx-bookmark' style={{ fontSize: 20 }}></i>
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
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    )
}

export default Recipes