import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingRecipe() {
    return (
        <div className="LoadingRecipe">
            <div className="recipe-data">
                <div className="recipe-picture">
                    <div className="recipe-text loading">
                        <Skeleton
                            width={219.36}
                            height={53.2}
                            borderRadius={50}
                            baseColor="#44403C"
                            highlightColor='#78716C'
                        />
                    </div>
                </div>
                <div className="recipe-block">
                    <Skeleton
                        width="100%"
                        height={43.75}
                        borderRadius={8}
                        style={{ marginBottom: 2.5 }}
                        baseColor="#44403C"
                        highlightColor='#78716C'
                    />
                    <Skeleton
                        width="100%"
                        height={43.75}
                        borderRadius={8}
                        baseColor="#44403C"
                        highlightColor='#78716C'
                    />
                    <div className="recipe-flex">
                        <Skeleton
                            width={105}
                            height={47.2}
                            borderRadius={10}
                            baseColor="#44403C"
                            highlightColor='#78716C'
                        />
                        <Skeleton
                            width={105}
                            height={47.2}
                            borderRadius={10}
                            baseColor="#44403C"
                            highlightColor='#78716C'
                        />
                        <Skeleton
                            width={105}
                            height={47.2}
                            borderRadius={10}
                            baseColor="#44403C"
                            highlightColor='#78716C'
                        />
                        <Skeleton
                            width={105}
                            height={47.2}
                            borderRadius={10}
                            baseColor="#44403C"
                            highlightColor='#78716C'
                        />
                    </div>
                    <Skeleton
                        count={2}
                        height={22}
                        baseColor="#44403C"
                        highlightColor='#78716C'
                        style={{ borderRadius: 4 }}
                    />
                    <Skeleton
                        height={22}
                        width="55%"
                        baseColor="#44403C"
                        highlightColor='#78716C'
                        style={{ borderRadius: 4 }}
                    />
                </div>
            </div>
        </div>
    )
}

export default LoadingRecipe