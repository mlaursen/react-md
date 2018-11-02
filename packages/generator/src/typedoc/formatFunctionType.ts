import * as TypeDoc from "typedoc";

export default function formatFunctionType(functionType: TypeDoc.DeclarationReflection) {
  const parameters = functionType.signatures[0].parameters.map(param => {
    const { name, type } = param;

    return param;
  });
}
