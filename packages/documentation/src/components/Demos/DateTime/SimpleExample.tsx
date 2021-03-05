import { Button } from "@react-md/button";
import { Time, TimeFormat } from "@react-md/datetime";
import { Form, FormThemeProvider, TextField } from "@react-md/form";
import { Grid } from "@react-md/utils";
import React, { ReactElement, useState } from "react";

export default function SimpleExample(): ReactElement | null {
  const [time1, setTime1] = useState("--:--");
  const [time2, setTime2] = useState("--:--:--");
  const [time3, setTime3] = useState("--:--:--:---");
  return (
    <FormThemeProvider>
      <Form>
        <Grid columns={1}>
          <Time id="time-1" value={time1} onChange={setTime1} />
          <Time
            id="time-2"
            format={TimeFormat.MilitaryHoursMinutes}
            value={time2}
            onChange={setTime2}
          />
          <Time
            id="time-2"
            format={TimeFormat.StandardHoursMilliseconds}
            value={time3}
            onChange={setTime3}
          />
          <TextField id="native-time" type="time" label="Native Time" />
        </Grid>
        <Button type="submit" theme="primary">
          Submit
        </Button>
      </Form>
    </FormThemeProvider>
  );
}
