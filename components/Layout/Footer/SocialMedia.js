import Link from "next/link";
import Image from "next/image";

import facebook from "../../../public/images/socialMediaIcons/facebook.png";
import instagram from "../../../public/images/socialMediaIcons/instagram.png";
import linkedin from "../../../public/images/socialMediaIcons/linkedin.png";
import github from "../../../public/images/socialMediaIcons/github.png";

import style from "./SocialMedia.module.css";

function SocialMedia() {
  return (
    <div className={style.icons}>
      <ul>
        <li>
          <a href="https://www.facebook.com/filip.trajkovic.73">
            <Image
              src={facebook}
              alt="Facebook logo"
              width={20}
              height={20}
            ></Image>
            <h3>Facebook</h3>
          </a>
        </li>
        <li>
          <Link href="https://www.instagram.com/filip_trajkovic">
            <Image
              src={instagram}
              alt="Instagram logo"
              width={20}
              height={20}
            ></Image>

            <h3>Instagram</h3>
          </Link>
        </li>
        <li>
          <a href="https://github.com/trajko0410">
            <Image
              src={github}
              alt="GitHub logo"
              width={20}
              height={20}
            ></Image>
            <h3>GitHub</h3>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/filip-trajkovic-0089b9269">
            <Image
              src={linkedin}
              alt="Linkedin logo"
              width={20}
              height={20}
            ></Image>
            <h3>Linkedin</h3>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SocialMedia;
