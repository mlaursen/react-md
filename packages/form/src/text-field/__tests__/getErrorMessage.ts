import {
  defaultGetErrorMessage,
  ErrorMessageOptions,
} from "../getErrorMessage";

const createValidity = ({
  badInput = false,
  customError = false,
  patternMismatch = false,
  rangeOverflow = false,
  rangeUnderflow = false,
  stepMismatch = false,
  tooLong = false,
  tooShort = false,
  typeMismatch = false,
  valid,
  valueMissing = false,
}: Partial<ValidityState> = {}): ValidityState => ({
  badInput,
  customError,
  patternMismatch,
  rangeOverflow,
  rangeUnderflow,
  stepMismatch,
  tooLong,
  tooShort,
  typeMismatch,
  valid:
    valid ??
    !(
      badInput ||
      customError ||
      patternMismatch ||
      rangeOverflow ||
      rangeUnderflow ||
      stepMismatch ||
      tooLong ||
      tooShort ||
      typeMismatch ||
      valueMissing
    ),
  valueMissing,
});
const OPTIONS: ErrorMessageOptions = {
  value: "",
  validity: createValidity(),
  validationMessage: "This field is required.",
  isBlurEvent: true,
  validateOnChange: "recommended",
};
const { validationMessage } = OPTIONS;

describe("defaultGetErrorMessage", () => {
  it("should just return the validation message for blur events", () => {
    expect(defaultGetErrorMessage(OPTIONS)).toBe(OPTIONS.validationMessage);
    expect(
      defaultGetErrorMessage({
        ...OPTIONS,
        validationMessage: "",
      })
    ).toBe("");
    expect(
      defaultGetErrorMessage({
        ...OPTIONS,
        isBlurEvent: false,
        validationMessage: "",
      })
    ).toBe("");
  });

  it("should return an empty string if the validateOnChange is false or an empty list for change events", () => {
    const options = { ...OPTIONS, validateOnChange: false };

    expect(defaultGetErrorMessage(options)).toBe(OPTIONS.validationMessage);
    expect(
      defaultGetErrorMessage({
        ...options,
        isBlurEvent: false,
      })
    ).toBe("");
    expect(
      defaultGetErrorMessage({
        ...options,
        isBlurEvent: false,
        validateOnChange: [],
      })
    ).toBe("");
  });

  it("should only return the validity message when the validateOnChange is set to recommeded and one of the RECOMMENDED_STATE_KEYS are errored", () => {
    const validate = (key: keyof ValidityState, expected: string): void => {
      expect(
        defaultGetErrorMessage({
          ...OPTIONS,
          isBlurEvent: false,
          validity: createValidity({ [key]: true }),
        })
      ).toBe(expected);
    };

    validate("badInput", validationMessage);
    validate("customError", "");
    validate("patternMismatch", "");
    validate("rangeOverflow", "");
    validate("rangeUnderflow", "");
    validate("stepMismatch", "");
    validate("tooLong", validationMessage);
    validate("tooShort", "");
    validate("typeMismatch", "");
    validate("valueMissing", validationMessage);
  });

  it("should only return the validity message when the validateOnChange is set to recommeded and one of the RECOMMENDED_NUMBER_STATE_KEYS are errored", () => {
    const validate = (key: keyof ValidityState, expected: string): void => {
      expect(
        defaultGetErrorMessage({
          ...OPTIONS,
          validateOnChange: "number-recommended",
          isBlurEvent: false,
          validity: createValidity({ [key]: true }),
        })
      ).toBe(expected);
    };

    validate("badInput", validationMessage);
    validate("customError", "");
    validate("patternMismatch", "");
    validate("rangeOverflow", validationMessage);
    validate("rangeUnderflow", validationMessage);
    validate("stepMismatch", "");
    validate("tooLong", validationMessage);
    validate("tooShort", validationMessage);
    validate("typeMismatch", validationMessage);
    validate("valueMissing", validationMessage);
  });

  it("should only return the validation message for the provided validity state key", () => {
    const options: ErrorMessageOptions = {
      ...OPTIONS,
      validateOnChange: "badInput",
      isBlurEvent: false,
      validity: createValidity({ badInput: true }),
    };

    expect(defaultGetErrorMessage(options)).toBe(validationMessage);
    const others = Object.keys(options.validity).filter(
      (key) => key !== "badInput"
    ) as readonly (keyof ValidityState)[];

    others.forEach((key) => {
      expect(
        defaultGetErrorMessage({
          ...options,
          validity: createValidity({ [key]: true }),
        })
      ).toBe("");
    });
  });

  it("should only return the validation message when one of the provided validity state keys are errored", () => {
    const options: ErrorMessageOptions = {
      ...OPTIONS,
      validateOnChange: ["badInput", "tooShort"],
      isBlurEvent: false,
      validity: createValidity({ badInput: true }),
    };
    expect(defaultGetErrorMessage(options)).toBe(validationMessage);
    const others = Object.keys(options.validity).filter(
      (key) => key !== "badInput" && key !== "tooShort"
    ) as readonly (keyof ValidityState)[];

    others.forEach((key) => {
      expect(
        defaultGetErrorMessage({
          ...options,
          validity: createValidity({ [key]: true }),
        })
      ).toBe("");
    });
  });
});
