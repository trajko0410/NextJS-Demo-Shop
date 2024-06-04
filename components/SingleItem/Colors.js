//import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import ColorEach from "./ColorsEach";

function Colors(props) {
  const loaderData = props.loaderData;
  const colors = loaderData.Color;
  // console.log(colors);

  const [itemColors, setItemColors] = useState([]);

  useEffect(() => {
    const loadedItemColors = [];
    for (const key in colors) {
      loadedItemColors.push({
        id: key,
        color: colors[key].Color,
        code: colors[key].ColorCode,
      });
    }
    setItemColors(loadedItemColors);
  }, [colors]);

  //console.log(items);

  const itemsLength = itemColors.length;

  //

  const chosenItemColor = (color) => {
    props.chosenItemColor(color);
    //console.log(`color ${color}`);
  };

  if (itemsLength === 0) {
    //console.log("nemaboja");
    return;
  } else {
    return (
      <>
        {
          <ColorEach
            colors={itemColors}
            chosenItemColor={chosenItemColor}
          ></ColorEach>
        }
      </>
    );
  }
}

export default Colors;

//1. Pristupamo loaderData.colors i njega pretvaramo u array posto ga dobijamo u obliku objecta
//2. Ako je colors array prayan ne prikazujemo nista
//3. itemColors je array colors i njega saljemo dole do colorEach.
