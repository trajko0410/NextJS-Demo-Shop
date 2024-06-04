import styles from "./HeroSection.module.css";

function HeroSection() {
  return (
    <div className={styles.img_background}>
      <div className={styles.back_drop}>
        <h1>Shop our items</h1>
      </div>
    </div>
  );
}

export default HeroSection;
