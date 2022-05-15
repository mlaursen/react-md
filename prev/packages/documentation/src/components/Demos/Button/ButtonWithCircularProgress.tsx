import type { ReactElement } from "react";
import { useEffect } from "react";
import { TextIconSpacing } from "@react-md/icon";
import { Button } from "@react-md/button";
import { CircularProgress, getProgressA11y } from "@react-md/progress";
import { useTimeout, useToggle } from "@react-md/utils";
import { StarSVGIcon } from "@react-md/material-icons";

export default function ButtonWithCircularProgress(): ReactElement | null {
  const [loading, enable, disable] = useToggle(false);
  const [start] = useTimeout(disable, 5000);
  useEffect(() => {
    if (loading) {
      start();
    }
  }, [loading, start]);

  const id = "button-with-progress";
  const progressId = `${id}-loading`;
  return (
    <Button
      id={id}
      {...getProgressA11y(progressId, loading)}
      onClick={enable}
      theme={loading ? "disabled" : "primary"}
      themeType="outline"
    >
      <TextIconSpacing
        icon={
          loading ? (
            <CircularProgress id={progressId} centered={false} />
          ) : (
            <StarSVGIcon />
          )
        }
      >
        Button
      </TextIconSpacing>
    </Button>
  );
}
