// TOOD: Update `GetPasswordVisibilityIcon` references since it provides the `type === "password"` flag instead of the `type` now
import { type ReactElement } from "react";
import { GetPasswordVisibilityIcon, Password } from "react-md";

const getVisibilityIcon: GetPasswordVisibilityIcon = (type) =>
  type === "password" ? <span id="password-icon" /> : <span id="text-icon" />;

export default function PasswordExample(): ReactElement {
  return (
    <>
      <Password
        id="example-password-field"
        label="Password"
        placeholder="Super secret password"
      />
      <Password
        id="example-password-field-2"
        label="Password"
        placeholder="Super secret password"
        visibilityProps={{
          style: { opacity: 0.5 },
          className: "visibility-class-name",

          onClick: (event) => {
            // do something
          }
        }} />
      <Password
        id="example-password-field-2"
        label="Password"
        placeholder="Super secret password"
        visibilityIcon={getVisibilityIcon}
      />
    </>
  );
}
