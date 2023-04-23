import { useCallback, useEffect } from "react";
import styles from "./Popup.module.css";

export default function Popup(props) {
  const {
    notification = {
      text: "Hello!",
      category: "info",
    },
  } = props;

  const hidePopup = useCallback(() => {
    setTimeout(() => {
      notification.setNotification(null);
    }, 3000);
  }, [notification]);

  // const hidePopuup = () => {
  //   setTimeout(() => {
  //     notification.setNotification(null);
  //   }, 3000);
  // };

  useEffect(() => {
    hidePopup();

    return () => {
      hidePopup();
      console.warn("Exit useEffect.");
    };
  }, [hidePopup]);

  return (
    <div
      className={`${styles.alert} ${styles[notification.category]}`}
    >{`${notification.text}`}</div>
  );
}
