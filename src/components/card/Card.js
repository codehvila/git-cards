import styles from "./Card.module.css";
import gitIcon from "./git.svg";
import bashIcon from "./bash.svg";

export default function Card(props) {
  const { children, title, type } = props;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={`${styles.btn} ${styles.minimize}`}>&nbsp;</div>
          <div className={`${styles.btn} ${styles.maximize}`}>&nbsp;</div>
          <div className={`${styles.btn} ${styles.close}`}>&nbsp;</div>

          <div className={styles.title}>{title}</div>
          <div className={styles.icon}>
            {type && type === "git" ? (
              <img src={gitIcon} alt="Git icon" />
            ) : (
              <img src={bashIcon} alt="Bash icon" />
            )}
          </div>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
