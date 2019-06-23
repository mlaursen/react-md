import React, { FC, Fragment, useState, useCallback } from "react";
import { Form, Radio, TextField, TextArea } from "@react-md/form";
import { Button } from "@react-md/button";
import Container from "./Container";
import { DialogFooter } from "@react-md/dialog";
import { useRefCache } from "@react-md/utils";

// function useValidity(
//   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// ) {
//   const el = event.currentTarget;
//   const { value, validity } = el;
//   console.log("validity:", validity);
// }

const Test: FC = () => {
  const [error, setError] = useState(false);
  const prevError = useRefCache(error);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { validity } = event.currentTarget;

      let error = false;
      if (validity.tooLong) {
        error = true;
      }

      if (prevError.current !== error) {
        setError(error);
      }
    },
    [error]
  );
  return (
    <TextField
      id="type-field-1"
      type="tel"
      label="Phone"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      maxLength={12}
      placeholder="123-456-7890"
      required
      error={error}
      onChange={handleChange}
      onInvalid={event => {
        console.log("event:", event);
      }}
    />
  );
};

const SimpleValidation: FC = () => (
  <Fragment>
    <Form id="form-2" name="form-2">
      <Container>
        <Test />
      </Container>
      <DialogFooter>
        <Button id="submit-form-2" type="submit" theme="primary">
          Submit
        </Button>
      </DialogFooter>
    </Form>
    <Form>
      <fieldset>
        <legend>Title</legend>
        <Radio id="title-1" name="title" required value="Mr" label="Mr." />
        <Radio id="title-2" name="title" required value="Mrs" label="Mrs." />
      </fieldset>
      <TextField
        id="age-field"
        name="age"
        required
        min={12}
        max={120}
        step={1}
        type="number"
        pattern="\d+"
        label="How old are you?"
      />
      <TextField
        id="email-field"
        name="email"
        type="email"
        label="What is your e-mail?"
      />
      <TextArea
        id="message-field"
        name="message"
        label="Leave a short message."
        maxLength={140}
      />
      <Button id="simple-validation-form-submit" type="submit">
        Submit
      </Button>
    </Form>
  </Fragment>
);

export default SimpleValidation;
