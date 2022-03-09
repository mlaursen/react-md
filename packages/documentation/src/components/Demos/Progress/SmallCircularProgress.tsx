import type { ReactElement } from "react";
import { useEffect } from "react";
import { useTimeout, useToggle } from "@react-md/utils";
import { Button } from "@react-md/button";
import { CircularProgress } from "@react-md/progress";

export default function SmallCircularProgress(): ReactElement | null {
  const [loading, enable, disable] = useToggle(false);
  const [start] = useTimeout(disable, 10000);
  useEffect(() => {
    if (loading) {
      start();
    }
  }, [loading, start]);

  return (
    <>
      <Button onClick={enable}>Show</Button>
      {loading && <CircularProgress id="small-circular-progress" small />}
    </>
  );
}
