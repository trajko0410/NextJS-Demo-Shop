import ContactUs from "./ContactUs";
import style from "./Footer.module.css";
import Image from "next/image";

//import NewsletterForm from "./NewsLetterForm";
import SocialMedia from "./SocialMedia";

import logo from "../../../public/images/icons/logoFIRWL.png";
import NewsletterForm from "./NewsLetterForm";

function Footer() {
  return (
    <div className={style.mainContainer}>
      <div className={style.footer}>
        <div className={style.container}>
          <ContactUs />
          <div className={style.smnwContainer}>
            <SocialMedia />
            <NewsletterForm />
          </div>
          <div className={style.logo}>
            <Image src={logo} alt="logo" fill objectFit="contain"></Image>
          </div>
        </div>
      </div>
      <div className={style.credential}>
        <p>
          This is just an Demo WebSite, created by
          <a href="mailto:filiptrajkovic@gmail.com"> Filip Trajkovic</a>.
        </p>
      </div>
    </div>
  );
}

export default Footer;
