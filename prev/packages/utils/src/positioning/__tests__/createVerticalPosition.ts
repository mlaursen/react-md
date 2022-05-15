describe("createAnchoredAbove", () => {
  it.todo(
    "should return the calculated above coord and an actualY value of above when it fits within the viewport"
  );
  it.todo(
    "should return the calculated above (greater than 0) coord and an actualY value of above if the vh bounds are disabled"
  );
  it.todo(
    "should return the vhMargin value as the top value if swapping is disabled"
  );
  it.todo(
    "should return the vhMargin value as the top value if swapping below will force it out of the viewport bottom"
  );
  it.todo(
    "should return the bottom coord as the top value if the position can be swapped below"
  );
  it.todo(
    "should set the bottom value to the container's top minus the yMargin if overlap is prevented and it's still positioned above and would overlap"
  );
});

describe("createAnchoredTop", () => {
  it.todo(
    "should return the calculated top coord and an actualY value of top when it fits within the viewport"
  );
  it.todo(
    "should return the calculated top coord and an actualY value of top when the vh bounds are disabled"
  );
  it.todo(
    "should return the vhMargin as the top value if swapping is disabled"
  );
  it.todo(
    "should return the vhMargin as the top value if swapping to the bottom causes top viewport issues"
  );
  it.todo(
    "should return the bottom coord as the top value and an actualY of bottom if it can be swapped"
  );
});

describe("createAnchoredCenter", () => {
  it.todo(
    "should return the calculated center coord and an actualY value of center when it fits within the viewport"
  );
  it.todo(
    "should return the calculated top (greater than 0) coord and an actualY value of center if the vh bounds are disabled"
  );
  it.todo(
    "should ensure the top value is >= vhMargin when near the top of the viewport"
  );
  it.todo(
    "should return the top value as the screen bottom minus the element's height if it expands past the viewport bottom"
  );
});

describe("createAnchoredBottom", () => {
  it.todo(
    "should return the calculated bottom coord and an actualY value of bottom when it fits within the viewport"
  );
  it.todo(
    "should return the calculated bottom coord and an actualY value of bottom when the vh bounds are disabled"
  );
  it.todo(
    "should return the screen bottom minus the element height as the top value if swapping is disabled"
  );
  it.todo(
    "should return the screen bottom minus the element height as the top value if swapping to the top causes top viewport issues"
  );
  it.todo(
    "should return the top coord as the top value and an actualY of top if it can be swapped"
  );
});

describe("createAnchoredBelow", () => {
  it.todo(
    "should return the calculated below coord and an actualY value of below when it fits within the viewport"
  );
  it.todo(
    "should return the calculated below coord and an actualY value of below if the vh bounds are disabled"
  );
  it.todo(
    "should return the screen bottom minus the element's height as the top value if swapping is disabled"
  );
  it.todo(
    "should return the vhMargin value as the top value if swapping below will force it out of the viewport bottom"
  );
  it.todo(
    "should return the bottom coord as the top value if the position can be swapped below"
  );
  it.todo(
    "should set the bottom value to the container's top minus the yMargin if overlap is prevented and it's still positioned above and would overlap"
  );
});
