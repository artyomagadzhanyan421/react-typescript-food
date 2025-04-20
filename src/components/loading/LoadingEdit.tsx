import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingEdit() {
  return (
    <div>
      <center>
        <Skeleton
          height={36.8}
          width={128.94}
          style={{ borderRadius: 8, marginBottom: 22.5 }}
          baseColor="#44403C"
          highlightColor='#78716C'
        />
      </center>
      <Skeleton
        baseColor="#44403C"
        highlightColor='#78716C'
        height={56.6}
        count={7}
        style={{ borderRadius: 10, marginBottom: 12.5 }}
      />
      <div className="btnFlex">
        <Skeleton
          baseColor="#44403C"
          highlightColor='#78716C'
          height={56.4}
          width={151.79}
          style={{ borderRadius: 10 }}
        />
        <Skeleton
          baseColor="#44403C"
          highlightColor='#78716C'
          height={56.4}
          width={151.79}
          style={{ borderRadius: 10 }}
        />
      </div>
    </div>
  )
}

export default LoadingEdit