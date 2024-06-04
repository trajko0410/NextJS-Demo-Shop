import { useEffect, useState } from "react";
import styles from "./SortItems.module.css";

function ItemsNavigation(props) {
  const [itemMenuNavigationValue, setMenuNavigationValue] = useState("");
  const [activeButton, setActiveButton] = useState(false);

  const buttons = [
    {
      id: 1,
      value: "iPhones",
    },
    {
      id: 2,
      value: "Mac",
    },
    {
      id: 3,
      value: "iPad",
    },
    {
      id: 4,
      value: "Accesesorise",
    },
  ];
  //console.log(buttons);
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    //console.log(buttonId);
  };

  function itemMenuNavigationValueHandler(buttonValue) {
    setMenuNavigationValue(buttonValue);
    //console.log(buttonValue);
  }

  useEffect(() => {
    props.itemValueSort(itemMenuNavigationValue);
  }, [props, itemMenuNavigationValue]);
  //console.log(itemMenuNavigationValue);
  //saljemo gore

  return (
    <div className={styles.container}>
      <div className={styles.bacgroundColor}>
        <ul>
          {buttons.map((button) => (
            <li
              key={button.id}
              onClick={() => {
                handleButtonClick(button.id); //ovo prosledjujem gore u button id yato ga prepoznaje
                itemMenuNavigationValueHandler(button.value);
              }}
              className={activeButton === button.id ? styles.active : undefined}
            >
              {button.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemsNavigation;
