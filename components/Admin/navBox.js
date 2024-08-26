import Link from "next/link";
import style from "./navBox.module.css";

import Image from "next/image";

export default function NavBox(props) {
  return (
    <Link className={style.link} href={props.link}>
      <div className={style.container}>
        <div className={style.glassEffect}>
          <div className={style.circle1}></div>
          <div className={style.circle2}></div>
          <div className={style.heading}>
            <h2>{props.heading}</h2>

            <Image
              src={props.img}
              alt="iconDescribingImage"
              height={30}
              width={30}
            />
          </div>
          <div className={style.gg}>
            <h3>{props.paragraph1}</h3>{" "}
          </div>
          <div className={style.gg}>
            <h4>{props.paragraph2}</h4>{" "}
          </div>
        </div>
      </div>
    </Link>
  );
}
