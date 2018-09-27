import isFocusable from "../isFocusable";

describe("isFocusable", () => {
  it("should return false if no element is provided or el.getAttribute is not a function", () => {
    // I don't remember why this case came up
    expect(isFocusable({} as HTMLElement)).toBe(false);
    expect(isFocusable(null)).toBe(false);
  });

  it("should return true for the native HTMLElements that support focus", () => {
    const button = document.createElement("button");
    const select = document.createElement("select");
    const textarea = document.createElement("textarea");
    const link = document.createElement("a");
    link.href = "#test";
    const area = document.createElement("area");
    area.href = "#test";

    const [
      color,
      date,
      datetime,
      datetimeLocal,
      email,
      month,
      numberInput,
      range,
      search,
      tel,
      time,
      url,
      week,
      text,
      password,
    ] = [
      "color",
      "date",
      "datetime",
      "datetime-local",
      "email",
      "month",
      "number",
      "range",
      "search",
      "tel",
      "time",
      "url",
      "week",
      "text",
      "password",
    ].map(type => {
      const input = document.createElement("input");
      input.type = type;
      return input;
    });
    const [checkbox, radio, submit, buttonInput] = ["checkbox", "radio", "submit", "button"].map(
      type => {
        const input = document.createElement("input");
        input.type = type;
        input.value = type;
        return input;
      }
    );
    const reset = document.createElement("input");
    reset.type = "reset";
    const file = document.createElement("input");
    file.type = "file";

    expect(isFocusable(button)).toBe(true);
    expect(isFocusable(select)).toBe(true);
    expect(isFocusable(textarea)).toBe(true);
    expect(isFocusable(link)).toBe(true);
    expect(isFocusable(area)).toBe(true);
    expect(isFocusable(color)).toBe(true);
    expect(isFocusable(date)).toBe(true);
    expect(isFocusable(datetime)).toBe(true);
    expect(isFocusable(datetimeLocal)).toBe(true);
    expect(isFocusable(email)).toBe(true);
    expect(isFocusable(month)).toBe(true);
    expect(isFocusable(numberInput)).toBe(true);
    expect(isFocusable(range)).toBe(true);
    expect(isFocusable(search)).toBe(true);
    expect(isFocusable(tel)).toBe(true);
    expect(isFocusable(time)).toBe(true);
    expect(isFocusable(url)).toBe(true);
    expect(isFocusable(week)).toBe(true);
    expect(isFocusable(text)).toBe(true);
    expect(isFocusable(password)).toBe(true);

    expect(isFocusable(checkbox)).toBe(true);
    expect(isFocusable(radio)).toBe(true);
    expect(isFocusable(submit)).toBe(true);
    expect(isFocusable(buttonInput)).toBe(true);
    expect(isFocusable(reset)).toBe(true);
    expect(isFocusable(file)).toBe(true);
  });

  it(
    "should return false for the native HTMLElements that support focus and are disabled " +
      "when allowDisabled is omitted or false",
    () => {
      const button = document.createElement("button");
      button.disabled = true;
      const select = document.createElement("select");
      select.disabled = true;
      const textarea = document.createElement("textarea");
      textarea.disabled = true;

      // link and area are "disabled" when they have no href
      const link = document.createElement("a");
      const area = document.createElement("area");

      const [
        color,
        date,
        datetime,
        datetimeLocal,
        email,
        month,
        numberInput,
        range,
        search,
        tel,
        time,
        url,
        week,
        text,
        password,
      ] = [
        "color",
        "date",
        "datetime",
        "datetime-local",
        "email",
        "month",
        "number",
        "range",
        "search",
        "tel",
        "time",
        "url",
        "week",
        "text",
        "password",
      ].map(type => {
        const input = document.createElement("input");
        input.type = type;
        input.disabled = true;
        return input;
      });
      const [checkbox, radio, submit, buttonInput] = ["checkbox", "radio", "submit", "button"].map(
        type => {
          const input = document.createElement("input");
          input.type = type;
          input.value = type;
          input.disabled = true;
          return input;
        }
      );
      const reset = document.createElement("input");
      reset.type = "reset";
      reset.disabled = true;
      const file = document.createElement("input");
      file.type = "file";
      file.disabled = true;

      expect(isFocusable(button)).toBe(false);
      expect(isFocusable(select)).toBe(false);
      expect(isFocusable(textarea)).toBe(false);
      expect(isFocusable(link)).toBe(false);
      expect(isFocusable(area)).toBe(false);
      expect(isFocusable(color)).toBe(false);
      expect(isFocusable(date)).toBe(false);
      expect(isFocusable(datetime)).toBe(false);
      expect(isFocusable(datetimeLocal)).toBe(false);
      expect(isFocusable(email)).toBe(false);
      expect(isFocusable(month)).toBe(false);
      expect(isFocusable(numberInput)).toBe(false);
      expect(isFocusable(range)).toBe(false);
      expect(isFocusable(search)).toBe(false);
      expect(isFocusable(tel)).toBe(false);
      expect(isFocusable(time)).toBe(false);
      expect(isFocusable(url)).toBe(false);
      expect(isFocusable(week)).toBe(false);
      expect(isFocusable(text)).toBe(false);
      expect(isFocusable(password)).toBe(false);

      expect(isFocusable(checkbox)).toBe(false);
      expect(isFocusable(radio)).toBe(false);
      expect(isFocusable(submit)).toBe(false);
      expect(isFocusable(buttonInput)).toBe(false);
      expect(isFocusable(reset)).toBe(false);
      expect(isFocusable(file)).toBe(false);

      expect(isFocusable(button, false)).toBe(false);
      expect(isFocusable(select, false)).toBe(false);
      expect(isFocusable(textarea, false)).toBe(false);
      expect(isFocusable(link, false)).toBe(false);
      expect(isFocusable(area, false)).toBe(false);
      expect(isFocusable(color, false)).toBe(false);
      expect(isFocusable(date, false)).toBe(false);
      expect(isFocusable(datetime, false)).toBe(false);
      expect(isFocusable(datetimeLocal, false)).toBe(false);
      expect(isFocusable(email, false)).toBe(false);
      expect(isFocusable(month, false)).toBe(false);
      expect(isFocusable(numberInput, false)).toBe(false);
      expect(isFocusable(range, false)).toBe(false);
      expect(isFocusable(search, false)).toBe(false);
      expect(isFocusable(tel, false)).toBe(false);
      expect(isFocusable(time, false)).toBe(false);
      expect(isFocusable(url, false)).toBe(false);
      expect(isFocusable(week, false)).toBe(false);
      expect(isFocusable(text, false)).toBe(false);
      expect(isFocusable(password, false)).toBe(false);

      expect(isFocusable(checkbox, false)).toBe(false);
      expect(isFocusable(radio, false)).toBe(false);
      expect(isFocusable(submit, false)).toBe(false);
      expect(isFocusable(buttonInput, false)).toBe(false);
      expect(isFocusable(reset, false)).toBe(false);
      expect(isFocusable(file, false)).toBe(false);
    }
  );

  // this use-case is for the StatesConsumer initializing elements that should have focus states, but start out disabled
  // on first render
  it(
    "should return true for the native HTMLElements that support focus and are disabled " +
      "when allowDisabled is true",
    () => {
      const button = document.createElement("button");
      button.disabled = true;
      const select = document.createElement("select");
      select.disabled = true;
      const textarea = document.createElement("textarea");
      textarea.disabled = true;

      // link and area are "disabled" when they have no href
      const link = document.createElement("a");
      const area = document.createElement("area");

      const [
        color,
        date,
        datetime,
        datetimeLocal,
        email,
        month,
        numberInput,
        range,
        search,
        tel,
        time,
        url,
        week,
        text,
        password,
      ] = [
        "color",
        "date",
        "datetime",
        "datetime-local",
        "email",
        "month",
        "number",
        "range",
        "search",
        "tel",
        "time",
        "url",
        "week",
        "text",
        "password",
      ].map(type => {
        const input = document.createElement("input");
        input.type = type;
        input.disabled = true;
        return input;
      });
      const [checkbox, radio, submit, buttonInput] = ["checkbox", "radio", "submit", "button"].map(
        type => {
          const input = document.createElement("input");
          input.type = type;
          input.value = type;
          input.disabled = true;
          return input;
        }
      );
      const reset = document.createElement("input");
      reset.type = "reset";
      reset.disabled = true;
      const file = document.createElement("input");
      file.type = "file";
      file.disabled = true;

      expect(isFocusable(button, true)).toBe(true);
      expect(isFocusable(select, true)).toBe(true);
      expect(isFocusable(textarea, true)).toBe(true);
      expect(isFocusable(link, true)).toBe(true);
      expect(isFocusable(area, true)).toBe(true);
      expect(isFocusable(color, true)).toBe(true);
      expect(isFocusable(date, true)).toBe(true);
      expect(isFocusable(datetime, true)).toBe(true);
      expect(isFocusable(datetimeLocal, true)).toBe(true);
      expect(isFocusable(email, true)).toBe(true);
      expect(isFocusable(month, true)).toBe(true);
      expect(isFocusable(numberInput, true)).toBe(true);
      expect(isFocusable(range, true)).toBe(true);
      expect(isFocusable(search, true)).toBe(true);
      expect(isFocusable(tel, true)).toBe(true);
      expect(isFocusable(time, true)).toBe(true);
      expect(isFocusable(url, true)).toBe(true);
      expect(isFocusable(week, true)).toBe(true);
      expect(isFocusable(text, true)).toBe(true);
      expect(isFocusable(password, true)).toBe(true);

      expect(isFocusable(checkbox, true)).toBe(true);
      expect(isFocusable(radio, true)).toBe(true);
      expect(isFocusable(submit, true)).toBe(true);
      expect(isFocusable(buttonInput, true)).toBe(true);
      expect(isFocusable(reset, true)).toBe(true);
      expect(isFocusable(file, true)).toBe(true);
    }
  );

  it("should return true only if the element has a tabindex", () => {
    const buttonRole = document.createElement("div");
    buttonRole.tabIndex = -1;
    buttonRole.setAttribute("role", "button");

    const menuitemRole = document.createElement("li");
    menuitemRole.tabIndex = -1;
    menuitemRole.setAttribute("role", "menuitem");

    expect(isFocusable(buttonRole)).toBe(true);
    expect(isFocusable(menuitemRole)).toBe(true);

    const buttonNoIndex = document.createElement("div");
    buttonRole.setAttribute("role", "button");
    const menuitemNoIndex = document.createElement("div");
    menuitemNoIndex.setAttribute("role", "menuitem");

    expect(isFocusable(buttonNoIndex)).toBe(false);
    expect(isFocusable(menuitemNoIndex)).toBe(false);
  });
});
