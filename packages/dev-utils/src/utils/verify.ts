import prompts from "prompts";

export async function verify(
  message: string,
  autoConfirm = false
): Promise<boolean> {
  if (autoConfirm) {
    return true;
  }

  const { complete } = await prompts({
    type: "confirm",
    name: "complete",
    message,
    initial: false,
  });

  return complete;
}
