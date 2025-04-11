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
                        className="mySwiper"
                    >
                        {recipes.map((recipe) => (
                            <SwiperSlide>
                                <img src={recipe.picture} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    )
}

export default Recipes