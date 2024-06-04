import Image from "next/image";

import style from "../HomePage/Banner.module.css";

import shipping from "../../public/images/homePageBannerImages/shipping.png";
import pricing from "../../public/images/homePageBannerImages/pricing.png";
import reliability from "../../public/images/homePageBannerImages/reliability.png";

function Banner() {
  return (
    <>
      <div className={style.container}>
        <h2 className={style.maintitle}>Our servieces</h2>
        <div className={style.row}>
          <div className={style.icons}>
            <div className={style.iconInfo}>
              <div className={style.image}>
                <Image src={shipping} alt="shipping" fill></Image>{" "}
              </div>

              <h2>Fast delivery</h2>
              <p>We ship our orders in two to tree working days!</p>
            </div>
            <div className={style.iconInfo}>
              <div className={style.image}>
                <Image src={pricing} alt="Low prices" fill></Image>
              </div>
              <h2>Lowest prices</h2>
              <p>We have the lowest prices compering to the our competiton!</p>
            </div>
            <div className={style.iconInfo}>
              <div className={style.image}>
                <Image src={reliability} alt="Reliability" fill></Image>{" "}
              </div>

              <h2>Reliability</h2>
              <p>Reliability and custumer suport is our main foucuse!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
