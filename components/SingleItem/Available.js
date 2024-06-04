//import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Image from "next/image";

import availablePhoto from "../../public/images/avaliableComponentImages/ready-stock.png";
import notAvailablePhoto from "../../public/images/avaliableComponentImages/out-of-stock.png";
import freeShippingPhoto from "../../public/images/avaliableComponentImages/shipping-cost.png";

import style from "./Available.module.css";

function Avaliable(props) {
  const loaderData = props.loaderData;
  const avaliable = loaderData.Available;
  //iy loadera dobijamo info da li je item  dostupan i na osnovu toga omogucujemo da dodamo item u korpu
  const [photo, setPhoto] = useState(availablePhoto);

  useEffect(() => {
    if (avaliable) {
      setPhoto(availablePhoto);
    } else setPhoto(notAvailablePhoto);
  }, [avaliable]);

  return (
    <div className={style.container}>
      <div className={style.available}>
        <div className={style.imageCont}>
          <Image src={photo} alt="available" height={50} width={50}></Image>
        </div>

        <div className={style.availableText}>
          {avaliable && (
            <div>
              <p className={style.green}>Available.</p>
              <p className={style.manjaP}>Item is availble.</p>
            </div>
          )}
          {!avaliable && (
            <div>
              <p className={style.red}>Not available.</p>
              <p className={style.manjaP}>Item is notavailble.</p>
            </div>
          )}
        </div>
      </div>
      <div className={style.shipping}>
        <div className={style.availableText}>
          <div className={style.imageCont}>
            <Image
              src={freeShippingPhoto}
              alt="free-shipping"
              height={50}
              width={50}
            ></Image>
          </div>
          <p className={style.shippingFree}>Free shipping.</p>
          <p className={style.manjaP}>We ship your items for free.</p>
        </div>
      </div>
    </div>
  );
}

export default Avaliable;
