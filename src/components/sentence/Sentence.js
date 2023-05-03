import styles from "./Sentence.module.css";

export default function Sentence(props) {
  const { setNotification, children } = props;
  const TEXT_NOTIFICACION = "Command copied to clipboard!";
  const POPUP_CATEGORY = "info";

  const copyContent = async (event) => {
    const textContent = event.target.textContent;
    try {
      await navigator.clipboard.writeText(textContent);

      setNotification({
        text: TEXT_NOTIFICACION,
        category: POPUP_CATEGORY,
        setNotification,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div className={styles.sentence}>
        ${" "}
        <span className={styles.copytoclipboard} onClick={copyContent}>
          {children}
        </span>
      </div>
    </>
  );
}
