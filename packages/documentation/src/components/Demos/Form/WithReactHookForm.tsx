import React, { ReactElement, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@react-md/button";
import { DialogFooter } from "@react-md/dialog";
import {
  Checkbox,
  Fieldset,
  Form,
  FormMessage,
  Radio,
  Select,
  Switch,
  TextField,
} from "@react-md/form";
import { CircularProgress } from "@react-md/progress";
import { useTimeout } from "@react-md/utils";

import CodeBlock from "components/Code/CodeBlock";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  developer: "yes" | "no" | "";
  cool: "yes" | "";
  save: "yes" | "";
}

interface State {
  loading: boolean;
  data: FormData | null;
}

const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const titles = ["Mr", "Mrs", "Miss", "Dr", "Other"];

/**
 * The entire form is in this single file to keep the example simple, but it is
 * recommended to separate these components or other recommendations from the
 * main react-hook-form documentation: https://react-hook-form.com/
 *
 * Since all of the `react-md` components forward the `ref` prop automatically,
 * all that's required for most form components is using the `Controller`
 * component from `react-hook-form` and initializing the
 * `defaulValue`/`defaultChecked`. The only components that do not follow this
 * pattern are the `Radio` and `Select` components where you'll want to use the
 * `render` prop from the `Controller` instead.
 *
 * The `Radio` component uses the `render` prop since the `error` state doesn't
 * seem to work correctly (might just be because I haven't used this library
 * outside of this demo).
 *
 * The `Select` compoent uses the `render` prop just because of a `Typescript`
 * error that the `value` and `onChange` props are required. Both of those props
 * are injected by the `Controller` component, but using the `render` fixes this
 * compiler error.
 */
export default function WithReactHookForm(): ReactElement {
  const {
    control,
    reset,
    handleSubmit,
    errors: { firstName, lastName, email, phone, title, developer },
  } = useForm<FormData>({ mode: "onChange" });

  const [{ data, loading }, setState] = useState<State>({
    loading: false,
    data: null,
  });

  const [start] = useTimeout(() => {
    setState((prevState) => ({ loading: false, data: prevState.data }));
  }, 10000);
  useEffect(() => {
    if (loading) {
      start();
    }
  }, [loading, start]);

  return (
    <>
      <Form
        onReset={() => {
          setState({ loading: false, data: null });
          reset({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            title: "",
            developer: "",
            cool: "",
            save: "",
          });
        }}
        onSubmit={handleSubmit((data) => setState({ data, loading: true }))}
      >
        <Controller
          as={TextField}
          control={control}
          rules={{
            required: "Required",
            maxLength: {
              value: 10,
              message: "Max length is 10",
            },
          }}
          id="rhf-first-name"
          aria-describedby="rhf-first-name-error"
          name="firstName"
          label="First Name"
          placeholder="John"
          defaultValue=""
          error={!!firstName}
        />
        <FormMessage id="rh-first-name-error" error>
          {firstName?.message}
        </FormMessage>
        <Controller
          as={TextField}
          control={control}
          id="rhf-last-name"
          aria-describedby="rhf-last-name-error"
          name="lastName"
          label="Last Name"
          placeholder="Doe"
          defaultValue=""
          error={!!lastName}
          rules={{
            required: "Required",
            minLength: {
              value: 2,
              message: "Min length is 2",
            },
          }}
        />
        <FormMessage id="rh-last-name-error" error>
          {lastName?.message}
        </FormMessage>
        <Controller
          as={TextField}
          control={control}
          id="rhf-email"
          aria-describedby="rhf-email-error"
          name="email"
          type="email"
          label="Email"
          defaultValue=""
          placeholder="john.doe@email.com"
          error={!!email}
          rules={{
            required: "Required",
            pattern: {
              value: EMAIL_PATTERN,
              message: "Invalid email address",
            },
          }}
          pattern={EMAIL_PATTERN.source}
        />
        <FormMessage id="rh-email-error" error>
          {email?.message}
        </FormMessage>
        <Controller
          as={TextField}
          control={control}
          id="rhf-phone"
          aria-describedby="rhf-phone-error"
          name="phone"
          type="tel"
          label="Mobile Phone"
          defaultValue=""
          placeholder="123 4567"
          error={!!phone}
          rules={{
            required: "Required",
            minLength: {
              value: 7,
              message: "At least 7 characters",
            },
            maxLength: {
              value: 11,
              message: "No more than 11 characters",
            },
          }}
        />
        <FormMessage id="rh-phone-error" error>
          {phone?.message}
        </FormMessage>
        <Controller
          control={control}
          name="title"
          defaultValue=""
          rules={{ required: "Cannot be blank" }}
          render={(props) => (
            <Select
              id="rhf-title"
              aria-describedby="rhf-title-error"
              {...props}
              label="Title"
              placeholder="Title"
              options={titles}
              error={!!title}
            />
          )}
        />
        <FormMessage id="rh-title-error" error>
          {title?.message}
        </FormMessage>
        <Fieldset legend="Are you a developer?">
          <Controller
            control={control}
            name="developer"
            rules={{ required: "Required" }}
            defaultValue=""
            defaultChecked={false}
            render={(props) => (
              <Radio
                {...props}
                id="rhf-developer-yes"
                label="Yes"
                error={!!developer}
                value="yes"
              />
            )}
          />
          <Controller
            control={control}
            name="developer"
            rules={{ required: "Required" }}
            defaultValue=""
            defaultChecked={false}
            render={(props) => (
              <Radio
                {...props}
                id="rhf-developer-no"
                label="No"
                error={!!developer}
                value="no"
              />
            )}
          />
        </Fieldset>
        <Controller
          as={Checkbox}
          control={control}
          id="rhf-cool"
          name="cool"
          label="Are you cool?"
          defaultValue=""
          defaultChecked={false}
        />
        <Controller
          as={Switch}
          control={control}
          id="rhf-save"
          name="save"
          label="Save?"
          defaultValue=""
          defaultChecked
        />
        <DialogFooter align="end">
          <Button
            id="rhf-reset"
            type="reset"
            theme="secondary"
            themeType="outline"
          >
            Reset
          </Button>
          <Button
            id="rhf-submit"
            type={loading ? "button" : "submit"}
            theme={loading ? "disabled" : "primary"}
            themeType="outline"
            aria-label={loading ? "Submitting" : undefined}
          >
            {loading ? (
              <CircularProgress id="rhf-submit-progress" centered={false} />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </Form>
      {data && <CodeBlock>{JSON.stringify(data, null, 2)}</CodeBlock>}
    </>
  );
}
