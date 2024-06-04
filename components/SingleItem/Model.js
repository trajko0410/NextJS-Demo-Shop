//import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import ModelEach from "./ModelEach";

function Model(props) {
  const loaderData = props.loaderData;
  //console.log(loaderData);
  const modelData = loaderData.Memory;
  //const keys = Object.keys(memory);

  const [loadedModelInfo, setLoadedModelInfo] = useState([]);

  useEffect(() => {
    const loadedItems = [];
    for (const key in modelData) {
      loadedItems.push({
        id: key,
        memory: modelData[key].Memory,
        price: modelData[key].Price,
      });
    }
    setLoadedModelInfo(loadedItems);
  }, [modelData]);

  const loadedModelInfoLength = loadedModelInfo.length;

  const choseItemPrice = (price) => {
    props.choseItemPrice(price);
  };

  const chosenItemMemory = (memory) => {
    props.chosenItemMemory(memory);
  };
  //dole u model eache smo primili chose item PRICE I njega dalje saljemo u aboutItem
  //console.log(items);

  if (loadedModelInfoLength === 0) {
    //console.log("nemamemorije");
    return <p>nema memorije</p>;
  } else {
    return (
      <>
        <h3>Model:</h3>

        <ModelEach
          loaderData={loaderData}
          modelInfo={loadedModelInfo}
          choseItemPrice={choseItemPrice}
          chosenItemMemory={chosenItemMemory}
        ></ModelEach>
      </>
    );
  }
}

export default Model;

//1. Uz useLoader dobijamo data iz firebasa i pristupamo memory delu date
//2. Pretvaramo dobijen data object u array posto firebase tako cuva stvari
//3. Proveravamo duzinu i ako je 0 vracamo nema memorije sada pa cu to promeniti   ///moyes napraviti ako imas samo jedan da ga odma selektuje
//4. Saljemo items koji predstavljalju modelData u aray obliku dole do modelEach
