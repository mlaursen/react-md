import {
  CircularProgress,
  LinearProgress,
  loop,
  TextContainer,
  Typography,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

export default function Progress(): ReactElement {
  const [value, setValue] = useState(2);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((prev) =>
        loop({ min: 0, max: 100, value: prev, increment: true })
      );
    }, 500);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <TextContainer>
      <Typography>Linear Horizontal</Typography>
      <LinearProgress />
      <Typography>Linear Horizontal Reverse</Typography>
      <LinearProgress reverse />
      <Typography>Linear Horizontal Determinate</Typography>
      <LinearProgress value={value} />
      <Typography>Linear Horizontal Determinate Reverse</Typography>
      <LinearProgress reverse value={value} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        <Typography>Linear Vertical</Typography>
        <Typography>Linear Vertical Reverse</Typography>
        <Typography>Linear Vertical Determinate</Typography>
        <Typography>Linear Vertical Determinate Reverse</Typography>
        <LinearProgress vertical />
        <LinearProgress vertical reverse />
        <LinearProgress vertical value={value} />
        <LinearProgress vertical reverse value={value} />
      </div>
      <Typography>Circular</Typography>
      <CircularProgress />
      <Typography>Circular Small</Typography>
      <CircularProgress small />
      <Typography>Circular No Centered</Typography>
      <CircularProgress disableCentered />
      <Typography>Circular No Transition</Typography>
      <CircularProgress disableTransition />
      <Typography>Circular Determinate</Typography>
      <CircularProgress value={value} />
      <Typography>Circular Determinate Small</Typography>
      <CircularProgress small value={value} />
      <Typography>Circular Determinate No Centered</Typography>
      <CircularProgress disableCentered value={value} />
      <Typography>Circular Determinate No Transition</Typography>
      <CircularProgress disableTransition value={value} />
    </TextContainer>
  );
}
