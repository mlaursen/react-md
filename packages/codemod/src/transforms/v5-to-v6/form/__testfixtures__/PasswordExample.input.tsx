import { type ReactElement } from "react";
import { GetVisibilityIcon, Password } from "react-md";

const getVisibilityIcon: GetVisibilityIcon = (type) =>
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
        visibilityStyle={{ opacity: 0.5 }}
        visibilityClassName="visibility-class-name"
        onVisibilityClick={(event) => {
          // do something
        }}
      />
      <Password
        id="example-password-field-2"
        label="Password"
        placeholder="Super secret password"
        getVisibilityIcon={getVisibilityIcon}
      />
    </>
  );
}
