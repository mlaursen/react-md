import React, { FC } from "react";
import { differenceInDays, parse, isAfter } from "date-fns";

export interface RelativeDateProps {
  date: string | Date;
}

const RelativeDate: FC<RelativeDateProps> = ({ date: propDate }) => {
  const date =
    typeof propDate === "string"
      ? parse(propDate, "MM/dd/yyyy", new Date())
      : propDate;
  if (!date) {
    return null;
  }

  const now = new Date();
  const diff = differenceInDays(now, date);
  let relative = "Today";
  if (isAfter(now, date) && diff > 0) {
    relative = `${diff} days ago`;
  }

  return (
    <>
      {date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}{" "}
      ({relative})
    </>
  );
};

export default RelativeDate;
