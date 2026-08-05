import styles from "./Sentence.module.css";

export default function Sentence(props) {
  const { setNotification, children } = props;
  const TEXT_NOTIFICATION = children
    ? `"${children}" copied to clipboard!`
    : "Command copied to clipboard!";
  const POPUP_CATEGORY = "info";

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(children);

      setNotification({
        text: TEXT_NOTIFICATION,
        category: POPUP_CATEGORY,
        setNotification,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className={styles.sentence}>
      ${" "}
      <span className={styles.copytoclipboard} onClick={copyContent}>
        {children}
      </span>
    </div>
  );
}
