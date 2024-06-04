import RecomendedItemsComputer from "./RecomendedItemsComputer";
import RecomendedItemsPhone from "./RecomendedItemsPhone";

import errorFetchingImage from "../../public/images/icons/no-results.png";

import styles from "./RecomendedItemsSlider.module.css";

import Image from "next/image";

import useWindowSize from "../Hooks/useWindowSize";

export default function Slider(props) {
  //console.log(props.feturedItems, "fetured");
  const size = useWindowSize();
  //console.log(size.width);
  const feturedItems = props.feturedItems;

  //console.log(feturedItems);
  if (feturedItems.length <= 0) {
    return (
      <div className={styles.recomended}>
        <h2>We recomend</h2>
        <h4>Sory we dont have any recomended Items at this moment!</h4>
        <div className={styles.imgContainer}>
          <Image
            src={errorFetchingImage}
            alt="error"
            height={100}
            width={100}
          ></Image>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {feturedItems.length > 0 ? (
          <div>
            {size.width < 800 && (
              <RecomendedItemsPhone recomendedItems={feturedItems} />
            )}
            {size.width > 800 && (
              <RecomendedItemsComputer recomendedItems={feturedItems} />
            )}
          </div>
        ) : undefined}
      </>
    );
  }
}
