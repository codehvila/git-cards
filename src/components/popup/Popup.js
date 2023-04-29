import { useCallback, useEffect } from "react";
import styles from "./Popup.module.css";

export default function Popup(props) {
  const TIMEOUT = 3000;
  const {
    notification = {
      text: "Hello!",
      category: "info",
    },
  } = props;

  const hidePopup = useCallback(() => {
    setTimeout(() => {
      notification.setNotification(null);
    }, TIMEOUT);
  }, [notification]);

  useEffect(() => {
    hidePopup();

    return () => {
      hidePopup();
    };
  }, [hidePopup]);

  return (
    <div
      className={`${styles.alert} ${styles[notification.category]}`}
    >{`${notification.text}`}</div>
  );
}
