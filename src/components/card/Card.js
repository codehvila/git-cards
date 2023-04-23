import styles from "./Card.module.css";

export default function Card(props) {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={`${styles.btn} ${styles.minimize}`}>&nbsp;</div>
          <div className={`${styles.btn} ${styles.maximize}`}>&nbsp;</div>
          <div className={`${styles.btn} ${styles.close}`}>&nbsp;</div>

          <div className={styles.title}>Rewrite history</div>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
