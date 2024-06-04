import { useEffect } from "react";
import style from "./OrientalSlider.module.css";

import { useState } from "react";

function OrientalSlider(props) {
  const [indexValue, setIndexValue] = useState(1);

  //function goToSlide(event) {
  // const indexValue = parseInt(event.target.value); dibijamo intiger od valu atributa
  // setIndexValue(indexValue);
  // }
  // console.log("Orient", indexValue);
  const activeIndex = props.activeIndex;
  useEffect(() => {
    setIndexValue(activeIndex);
  }, [activeIndex]);

  return (
    <div className={style.container}>
      <div className={style.backgroundCircle}>
        <button
          className={indexValue >= 1 ? style.active : style.notactive}
          value="1"
        >
          1
        </button>
      </div>
      <div className={style.line}></div>
      <div className={style.backgroundCircle}>
        <button
          value="2"
          className={indexValue >= 2 ? style.active : style.notactive}
        >
          2
        </button>
      </div>
      <div className={style.line}></div>

      <div className={style.backgroundCircle}>
        <button
          value="3"
          className={indexValue >= 3 ? style.active : style.notactive}
        >
          3
        </button>
      </div>
      <div className={style.line}></div>

      <div className={style.backgroundCircle}>
        <button
          value="4"
          className={indexValue >= 4 ? style.active : style.notactive}
        >
          4
        </button>
      </div>
    </div>
  );
}

export default OrientalSlider;
