/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { KeyboardEventHandler, ReactElement, useRef } from "react";
import { TimeFormat, AmPmRadioGroup } from "@react-md/datetime";
import { TextField } from "@react-md/form";
import { SpinValueCompletedCallback, useSpinValue } from "@react-md/utils";

import { createSuggestion } from "./createSuggestion";
import styles from "./SimpleExample.module.scss";

const handleHours = createSuggestion(TimeFormat.STANDARD_HOURS);
const handleMinutes = createSuggestion(TimeFormat.MINUTES);

export default function SimpleExample(): ReactElement | null {
  /* const ref1 = useRef<HTMLInputElement>(null); */
  /* const ref2 = useRef<HTMLInputElement>(null); */
  /* const onCompleted: SpinValueCompletedCallback<HTMLInputElement> = ({ */
  /*   target, */
  /* }) => { */
  /*   let nextTarget: HTMLInputElement | null = null; */
  /*   if (target === ref1.current) { */
  /*     nextTarget = ref2.current; */
  /*   } else if (target === ref2.current) { */
  /*     nextTarget = ref1.current; */
  /*   } */

  /*   nextTarget?.focus(); */
  /* }; */
  /* const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => { */
  /*   if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") { */
  /*     return; */
  /*   } */

  /*   event.preventDefault(); */
  /*   event.stopPropagation(); */
  /*   const target = event.currentTarget; */
  /*   let nextTarget: HTMLInputElement | null = null; */
  /*   if (target === ref1.current) { */
  /*     nextTarget = ref2.current; */
  /*   } else if (target === ref2.current) { */
  /*     nextTarget = ref1.current; */
  /*   } */

  /*   nextTarget?.focus(); */
  /* }; */
  /* const [value1, props1, stringValue1] = useSpinValue({ */
  /*   ref: ref1, */
  /*   min: 1, */
  /*   max: 12, */
  /*   isInput: true, */
  /*   onSuggest: handleHours, */
  /*   onCompleted, */
  /*   onKeyDown, */
  /* }); */
  /* const [value2, props2, stringValue2] = useSpinValue({ */
  /*   ref: ref2, */
  /*   min: 0, */
  /*   max: 59, */
  /*   isInput: true, */
  /*   onSuggest: handleMinutes, */
  /*   onCompleted, */
  /*   onKeyDown, */
  /* }); */
  /* const time = `${stringValue1}:${stringValue2}`; */
  /* console.log("time:", time); */
  const [timePeriod, setTimePeriod] = useState<TimePeriodValue>("");
  return (
    <>
      <div className={styles.container} role="group">
        <AmPmRadioGroup id="datetime-time-period-1" value={timePeriod} onChange={setTimePeriod} />
      </div>
      {/* <div className={styles.container} role="group"> */}
      {/*   <TextField id="datetime-hours" {...props1} /> */}
      {/*   <TextField id="datetime-minutes" {...props2} /> */}
      {/* </div> */}
    </>
  );
}
