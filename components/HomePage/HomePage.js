import Link from "next/link";
import styles from "../HomePage/HomePage.module.css";

import Banner from "./Banner";
import HomePageSlider from "../HomePage/Slider";
import RecomendedItemsSlider from "../RecomendedItemsSlider/RecomendedItemsSlider.js";

function HomePage(props) {
  return (
    <>
      <div className={styles.img_background}>
        <div className={styles.container}>
          <div className={styles.mainHeader}>
            <h1 className={styles.textFocusin}>
              Discover the elegance of technology!
            </h1>
            <Link href="/shop" className={styles.button}>
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <Banner />
      <HomePageSlider />
      <RecomendedItemsSlider feturedItems={props.feturedItems} />
    </>
  );
}

export default HomePage;
