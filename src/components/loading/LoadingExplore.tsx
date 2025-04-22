import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function LoadingExplore() {
    return (
        <div className="LoadingExplore">
            <div className="slider-arrows">
                <Skeleton
                    height={36.8}
                    width={189.41}
                    style={{ borderRadius: 8 }}
                    baseColor="#292524"
                    highlightColor='#57534E'
                />
            </div>
            <div className="explore">
                {[...Array(6)].map((_, index) => (
                    <div className="recipe" style={{
                        background: "#292524",
                        borderRadius: 12.5,
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LoadingExplore