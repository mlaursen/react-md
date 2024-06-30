// TODO: Remove the `TypographyRenderFunction` usage since it no longer exists.
// TODO: Remove the `TextContainerRenderFunction` usage since it no longer exists.
// TODO: Remove the `TextContainerSize` usage since it no longer exists.
const x: TextContainerRenderFunction = ({ className }) => <>{className}</>;
const y: TypographyRenderFunction = ({ className }) => <>{className}</>;

type S = TextContainerSize;
