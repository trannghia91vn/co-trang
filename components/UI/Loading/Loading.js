import classes from "./Loading.module.css";
import Image from "next/image";

const Loading = (props) => {
  return (
    <div className={classes.blur}>
      <div className={classes.loading}>
        <Image
          src="/images/loading/loading.svg"
          alt="loading"
          width={300}
          height={150}
        />
        <h3>Loading...</h3>
      </div>
    </div>
  );
};
export default Loading;
