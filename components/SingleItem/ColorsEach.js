import style from "./ColorsEach.module.css";

import { useState, useEffect } from "react";

function ColorEach(props) {
  const modelColors = props.colors;

  const [color, setColor] = useState(modelColors[0].color);
  const [activeId, setActiveId] = useState(modelColors[0].id); //ovdeStavljam da je privi el iyabran aktivan

  //console.log(color);

  //console.log(modelColors);

  function colorHandler(colorItem) {
    setColor(colorItem);
  }
  //console.log(color);

  const activeIdHandler = (itemId) => {
    setActiveId(itemId);
  };
  //console.log(activeId);

  useEffect(() => {
    props.chosenItemColor(color);
  }, [props, color]); //saljem gore

  //console.log(color, "Each");

  //const colorOfItem = {
  // backgroundColor: `${color.code}`,
  // }; //ovo je boja u kruzicima
  //console.log(color);

  //prvi uslov stavljam jer moyda neki item nema boju
  if (color === "") {
    return;
  } else {
    return (
      <>
        <h3>Color:</h3>
        <div className={style.colors}>
          {modelColors.map((color) => (
            <div
              className={`${style.color} ${
                activeId === color.id ? style.active : undefined
              }`}
              key={color.id}
            >
              <div
                className={style.innercolor}
                onClick={() => {
                  colorHandler(color.color);
                  activeIdHandler(color.id);
                }}
              >
                <div
                  className={style.boja}
                  style={{ backgroundColor: color.code }}
                ></div>
                <p className={style.imeboje}>{color.color}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default ColorEach;

//1.Pravimo useState ya colorid i color kako bi na klik mogli da promenimo pozadinu
//2. Model colors mapiramo kako bi ya svaku boju dobili poseban div
//3 bagroundColor: color.code sluzi da bi menjao poyadinu kruga i namestio hash boju koju cuvamo u firebasu.
