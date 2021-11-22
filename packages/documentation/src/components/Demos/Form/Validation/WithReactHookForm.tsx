import { ReactElement, useEffect, useState } from "react";
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
} from "@react-md/form";
import { CircularProgress } from "@react-md/progress";
import { useTimeout } from "@react-md/utils";

import CodeBlock from "components/CodeBlock";
import ControllerTextField, { ExampleFormData } from "./ControllerTextField";

interface State {
  loading: boolean;
  data: ExampleFormData | null;
}

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
    formState: {
      errors: { firstName, lastName, email, phone, title, developer },
    },
  } = useForm<ExampleFormData>({ mode: "onChange" });

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
        <ControllerTextField
          id="rhf-first-name"
          name="firstName"
          label="First Name"
          placeholder="John"
          control={control}
          rules={{
            required: "Required",
            maxLength: {
              value: 10,
              message: "Max length is 10",
            },
          }}
          error={!!firstName}
          message={firstName?.message}
        />
        <ControllerTextField
          id="rhf-last-name"
          name="lastName"
          label="Last Name"
          placeholder="Doe"
          control={control}
          rules={{
            required: "Required",
            minLength: {
              value: 2,
              message: "Min length is 2",
            },
          }}
          error={!!lastName}
          message={lastName?.message}
        />
        <ControllerTextField
          id="rhf-email"
          name="email"
          type="email"
          label="Email"
          placeholder="john.doe@email.com"
          control={control}
          rules={{
            required: "Required",
            pattern: {
              value: EMAIL_PATTERN,
              message: "Invalid email address",
            },
          }}
          pattern={EMAIL_PATTERN.source}
          error={!!email}
          message={email?.message}
        />
        <ControllerTextField
          control={control}
          id="rhf-phone"
          name="phone"
          type="tel"
          label="Mobile Phone"
          placeholder="123 4567"
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
          error={!!phone}
          message={phone?.message}
        />
        <Controller
          control={control}
          name="title"
          defaultValue=""
          rules={{ required: "Cannot be blank" }}
          render={({ field }) => (
            <Select
              {...field}
              id="rhf-title"
              aria-describedby="rhf-title-error"
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
            render={({ field }) => (
              <Radio
                {...field}
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
            render={({ field }) => (
              <Radio
                {...field}
                id="rhf-developer-no"
                label="No"
                error={!!developer}
                value="no"
              />
            )}
          />
        </Fieldset>
        <Controller
          control={control}
          name="cool"
          render={({ field }) => (
            <Checkbox {...field} id="rhf-cool" label="Are you cool?" />
          )}
        />
        <Controller
          control={control}
          name="save"
          render={({ field }) => (
            <Switch {...field} id="rhf-save" label="Save?" defaultChecked />
          )}
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
