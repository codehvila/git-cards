import styles from "./Card.module.css";
import gitIcon from "./git.svg";
import bashIcon from "./bash.svg";

export default function Card({ children, title, type }) {
  const iconByType = {
    git: { src: gitIcon, alt: "Git icon" },
    bash: { src: bashIcon, alt: "Bash icon" },
  };
  const icon = iconByType[type] ?? { src: undefined, alt: "Unknown icon" };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={`${styles.btn} ${styles.minimize}`}>&nbsp;</div>
          <div className={`${styles.btn} ${styles.maximize}`}>&nbsp;</div>
          <div className={`${styles.btn} ${styles.close}`}>&nbsp;</div>

          <div className={styles.title}>{title}</div>
          <div className={styles.icon}>
            <img src={icon.src} alt={`${icon.alt}`} />
          </div>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
