import style from "./CartIcon.module.css";
import NumberOfItemsInCart from "./NumberOfItems";

export default function CartIcon(props) {
  function totalCartItems(totalCartItems) {
    props.totalCartItems(totalCartItems);
  }

  return (
    <div className={style.cartContainer}>
      <div
        // whileHover={{ scale: 1.1 }}
        // transition={{ type: "spring", stiffness: 500 }}
        onClick={() => {
          props.cartHandler();
          props.closeMenuHandler();
        }}
        className={`${style.cartIcon} ${
          props.cartOpen ? style.svgActive : style.svgNotActive
        }`}
        //className={({ isActive }) =>
        // isActive ? styles.svgActive : styles.svgNotActive
        //}
      >
        <div className={style.svgContainer}>
          <svg
            height="25px"
            width="25px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 279 279"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M262.421,270.339L246.466,72.896C246.151,69.001,242.898,66,238.99,66h-42.833v-9.495C196.157,25.348,171.143,0,139.985,0 h-0.99c-31.157,0-56.838,25.348-56.838,56.505V66H39.99c-3.908,0-7.161,3.001-7.476,6.896l-16,198 c-0.169,2.088,0.543,4.15,1.963,5.689S21.897,279,23.99,279h231c0.006,0,0.014,0,0.02,0c4.143,0,7.5-3.357,7.5-7.5 C262.51,271.105,262.48,270.717,262.421,270.339z M97.157,56.505C97.157,33.619,116.109,15,138.995,15h0.99 c22.886,0,41.172,18.619,41.172,41.505V66h-84V56.505z"></path>
            </g>
          </svg>
        </div>
        <div className={style.numberCart}>
          <NumberOfItemsInCart totalCartItems={totalCartItems} />
        </div>
      </div>
    </div>
  );
}
