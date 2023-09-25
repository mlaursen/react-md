"use client";
import Logo from "@/components/Logo.jsx";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Form,
  FormMessage,
  Password,
  Slider,
  TextField,
  Typography,
  cardContent,
  cssUtils,
  useAsyncAction,
  useSlider,
  useTextField,
  wait,
} from "@react-md/core";
import { useId, useState, type ReactElement } from "react";
import styles from "./ExampleSignInForm.module.scss";

export function ExampleSignInForm(): ReactElement {
  const { handleAsync, pending } = useAsyncAction();
  const { value: _email, fieldProps: emailProps } = useTextField({
    name: "email",
    required: true,
    helpText: "username@example.com",
  });
  const { value: _password, fieldProps: passwordProps } = useTextField({
    name: "password",
    required: true,
    // This was https://stackoverflow.com/a/23711754
    pattern: "^(?=.*\\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,32})$",
  });
  const [error, setError] = useState(false);
  const errorId = useId();
  const [staySignedIn, setStaySignedIn] = useState(false);

  return (
    <Card className={styles.container}>
      <Form
        className={cardContent({ disableSecondaryColor: true })}
        onSubmit={handleAsync(async () => {
          setError(false);
          // pretend API call
          await wait(4000);

          if (Math.random() < 0.5) {
            // pretend error
            setError(true);
          } else {
            // pretend success
          }
        })}
      >
        <Typography type="headline-3" textAlign="center">
          Sign In
        </Typography>
        <Box stacked align="stretch">
          <Logo className={styles.logo} configurable />
          {error && (
            <FormMessage
              id={errorId}
              role="alert"
              error
              messageClassName={cssUtils({ textAlign: "center" })}
            >
              Sign in failed. Please try again.
            </FormMessage>
          )}
          <TextField
            {...emailProps}
            label="Email Address"
            placeholder="username@example.com"
            type="email"
            disabled={pending}
          />
          <TextField label="Disabled" disabled labelProps={{ active: true }} />
          <Password {...passwordProps} label="Password" disabled={pending} />
          <Checkbox
            label="Stay signed in?"
            name="staySignedIn"
            checked={staySignedIn}
            disabled={pending}
            onChange={(event) => setStaySignedIn(event.currentTarget.checked)}
          />
          <Slider {...useSlider()} aria-label="Example" />
          <Box justify="space-between" disablePadding>
            <Button
              type="submit"
              theme="primary"
              themeType="contained"
              disabled={pending}
            >
              Sign In
            </Button>
            <Button theme="secondary" themeType="outline" disabled={pending}>
              Forgot Password
            </Button>
          </Box>
        </Box>
      </Form>
    </Card>
  );
}
