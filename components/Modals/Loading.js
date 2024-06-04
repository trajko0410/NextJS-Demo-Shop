import { createPortal } from "react-dom";

import style from "./Modal.module.css";

function Loading() {
  return (
    <>
      {createPortal(
        <div className={style.modalContainer} onClick={changeModalStateHandler}>
          <div className={style.loading}>
            <h3>Loading...</h3>
            <span className={style.loader}></span>
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
}

export default Loading;
