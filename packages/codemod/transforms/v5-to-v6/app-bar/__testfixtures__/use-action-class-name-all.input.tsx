import { useActionClassName } from "react-md";
import SomeComponent from "./SomeComponent";
import styles from "./styles.module.scss";

export function Example() {
  const className1 = useActionClassName();
  const className2 = useActionClassName({ first: true });
  const className3 = useActionClassName({ last: true });
  const className4 = useActionClassName({ className: styles.example });

  return (
    <>
      <div className={className1} />
      <div className={className2} />
      <div className={className3} />
      <div className={className4} />
      <SomeComponent
        className1={useActionClassName()}
        className2={useActionClassName({ first: true })}
        className3={useActionClassName({ last: true })}
        className4={useActionClassName({ className: styles.example })}
        objectExample={{
          className1: useActionClassName(),
          className2: useActionClassName({ first: true }),
          className3: useActionClassName({ last: true }),
          className4: useActionClassName({ className: styles.example }),
        }}
      />
    </>
  );
}
