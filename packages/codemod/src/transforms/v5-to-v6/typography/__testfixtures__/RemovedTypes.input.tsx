import {
  TextContainerSize,
  TextContainerRenderFunction,
  TypographyRenderFunction,
} from "react-md";

const x: TextContainerRenderFunction = ({ className }) => <>{className}</>;
const y: TypographyRenderFunction = ({ className }) => <>{className}</>;

type S = TextContainerSize;
