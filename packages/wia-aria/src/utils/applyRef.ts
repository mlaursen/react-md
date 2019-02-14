import { Ref } from "react";

export default function applyRef<E>(instance: E | null, ref?: Ref<E>) {
  if (typeof ref === "function") {
    ref(instance);
  } else if (typeof ref === "object") {
    (ref as { current: E | null }).current = instance;
  }
}
