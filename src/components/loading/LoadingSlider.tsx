import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

function LoadingSlider() {
    return (
        <div className="LoadingSlider">
            <div className="slider-arrows">
                <Skeleton
                    height={36.8}
                    width={189.41}
                    style={{ borderRadius: 8 }}
                    baseColor="#292524"
                    highlightColor='#57534E'
                />
                <div className="arrows">
                    <Skeleton
                        height={38}
                        width={38}
                        baseColor="#292524"
                        highlightColor='#57534E'
                        circle
                    />
                    <Skeleton
                        height={38}
                        width={38}
                        baseColor="#292524"
                        highlightColor='#57534E'
                        circle
                    />
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
                    slideShadows: true,
                }}
                modules={[EffectCoverflow]}
                className="mySwiper"
            >
                {[...Array(4)].map((_, index) => (
                    <SwiperSlide style={{
                        background: "#292524",
                        borderRadius: 12.5,
                        height: 350,
                        width: 297.5
                    }} key={index}>
                        <div className="recipeTop">
                            <Skeleton
                                baseColor="#44403C"
                                highlightColor='#78716C'
                                height={36.8}
                                width={75}
                                style={{ borderRadius: 20 }}
                            />
                            <Skeleton
                                baseColor="#44403C"
                                highlightColor='#78716C'
                                height={46}
                                width={46}
                                circle
                            />
                        </div>
                        <div className="recipe-text loading">
                            <Skeleton
                                count={2}
                                height={22}
                                baseColor="#44403C"
                                highlightColor='#78716C'
                                style={{ marginBottom: 2, borderRadius: 4 }}
                            />
                            <div className="recipe-time">
                                <Skeleton
                                    style={{ borderRadius: 4 }}
                                    height={22}
                                    width={150.06}
                                    baseColor="#44403C"
                                    highlightColor='#78716C'
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default LoadingSlider