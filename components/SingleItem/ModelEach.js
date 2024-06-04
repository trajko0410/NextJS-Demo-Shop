//import { useLoaderData } from "react-router-dom";
import style from "./ModelEach.module.css";
import { useState, useEffect } from "react";

function MemoryEach(props) {
  const loaderData = props.loaderData;

  const nameOfItem = loaderData.Name;
  const modelsInfo = props.modelInfo;

  const [price, setPrice] = useState(modelsInfo[0].price);
  const [activeId, setActiveId] = useState(modelsInfo[0].id); //ovde stavljam da je privi element iyabran uvek
  const [memory, setActiveMemory] = useState(modelsInfo[0].memory);

  function priceHandler(priceItem) {
    setPrice(priceItem);
  }
  //console.log(price);

  function memoryHandler(memoryItem) {
    setActiveMemory(memoryItem);
  }
  //console.log(memory);

  const activeIdHandler = (itemId) => {
    setActiveId(itemId);
  };

  useEffect(() => {
    props.chosenItemMemory(memory);
    props.choseItemPrice(price);
  }, [props, price, memory]);
  //idemo gore do model
  //console.log(activeId);

  return (
    <div className={style.memory}>
      {modelsInfo.map((modelInfo) => (
        <div
          key={modelInfo.id}
          onClick={() => {
            memoryHandler(modelInfo.memory);
            priceHandler(modelInfo.price);
            activeIdHandler(modelInfo.id);
          }}
          className={`${style.modelEach} ${
            activeId === modelInfo.id ? style.active : undefined
          }`}
        >
          {modelInfo.memory === "" ? (
            <div className={style.memory}>{nameOfItem}</div>
          ) : (
            <div className={style.memory}>{modelInfo.memory}</div>
          )}

          <div className={style.price}>{modelInfo.price} $</div>
        </div>
      ))}
    </div>
  );
}

export default MemoryEach;

//1. praviomo price i active id use statove i njihove handlere
//2. mapiramo modelsInfo koj smo dobili iz model a on predstavlja array modelInofoa
//3. Na click aktiviramo i upisujemo stanje u price i id
//4. proveravamo dole u class name i dodajemo klasu yavisnosti da li je kluknuto na item ili ne
//? handlere moyemo u useefect da stavimo moyda ili tek posle kada ga podignemo da bi ispisali cenu proizvoda.
//5. U divovima ispisujemo cenu i memoriju itema kojoj pristupamo preko modelInfo. to jest mapiranog arraya
//6. Kada je model.memory === "" onda ispisujem nayiv itema umesto memoruije to ce sluyiti kod slusalica
