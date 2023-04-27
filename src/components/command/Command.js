import styles from "./Command.module.css";

export default function Command({ children }) {
  return (
    <>
      <div className="commands">{children}</div>
    </>
  );
}
