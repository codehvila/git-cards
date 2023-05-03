import { useEffect, useCallback, useRef } from "react";
import styles from "./Popup.module.css";

export default function Popup(props) {
  const TIMEOUT = 4000;
  const timeoutID = useRef(null);

  const {
    notification = {
      text: "Hello!",
      category: "info",
    },
  } = props;

  const hidePopup = useCallback(() => {
    timeoutID.current = setTimeout(() => {
      notification.setNotification(null);
    }, TIMEOUT);
  }, [notification]);

  useEffect(() => {
    hidePopup();

    return () => {
      clearTimeout(timeoutID.current);
    };
  }, [hidePopup]);

  return (
    <div
      className={`${styles.alert} ${styles[notification.category]}`}
    >{`${notification.text}`}</div>
  );
}
