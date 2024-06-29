import SomeComponent from "./SomeComponent";
import styles from "./styles.module.scss";

export function Example() {
  const className4 = styles.example;

  return (<>
    <div />
    <div />
    <div />
    <div className={className4} />
    <SomeComponent
      className4={styles.example}
      objectExample={{
        className4: styles.example
      }} />
  </>);
}
