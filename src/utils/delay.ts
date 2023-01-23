export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, ms);
  });
}
