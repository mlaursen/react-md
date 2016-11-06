export default function flatten(arr) {
  return arr.reduce((flattened, toFlatten) =>
    flattened.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  );
}

