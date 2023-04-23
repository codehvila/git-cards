import styles from "./Command.module.css";

export default function Command(props) {
  const TEXT_NOTIFICACION = "Command copied to clipboard!";
  const POPUP_CATEGORY = "info";
  const { setNotification } = props;

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
      ${" "}
      <span
        id="command"
        className={styles.copytoclipboard}
        onClick={copyContent}
      >
        <span>git</span> rebase -i HEAD~
        <span style={{ color: "rgb(50, 240, 50)" }}>n</span>
      </span>
    </>
  );
}
