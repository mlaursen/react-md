import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import type DateFnsUtils from "@date-io/date-fns";
import type MomentUtils from "@date-io/moment";

export type SupportedDateUtilsAdapter = DateFnsUtils | MomentUtils;

const context = createContext<SupportedDateUtilsAdapter | null>(null);
const { Provider } = context;

export function useDateUtils<D extends SupportedDateUtilsAdapter>(): D {
  const utils = useContext(context);
  if (!utils) {
    throw new Error();
  }

  return utils as D;
}

export interface DateUtilsProviderProps {
  children: ReactNode;
  adapter: SupportedDateUtilsAdapter;
}

export function DateUtilsProvider({
  children,
  adapter,
}: DateUtilsProviderProps): ReactElement {
  return <Provider value={adapter}>{children}</Provider>;
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  context.displayName = "DateUtils";
  try {
    const PropTypes = require("prop-types");

    DateUtilsProvider.propTypes = {
      adapter: PropTypes.shape({
        // it's complicated
        formats: PropTypes.object,
        locale: PropTypes.string,
        lib: PropTypes.string.isRequired,
        date: PropTypes.func.isRequired,
        toJsDate: PropTypes.func.isRequired,
        parse: PropTypes.func.isRequired,
        getCurrentLocaleCode: PropTypes.func.isRequired,
        is12HourCycleInCurrentLocale: PropTypes.func.isRequired,
        getFormatHelperText: PropTypes.func.isRequired,
        isNull: PropTypes.func.isRequired,
        isValid: PropTypes.func.isRequired,
        getDiff: PropTypes.func.isRequired,
        isEqual: PropTypes.func.isRequired,
        isSameDay: PropTypes.func.isRequired,
        isSameMonth: PropTypes.func.isRequired,
        isSameYear: PropTypes.func.isRequired,
        isSameHour: PropTypes.func.isRequired,
        isAfter: PropTypes.func.isRequired,
        isAfterDay: PropTypes.func.isRequired,
        isAfterYear: PropTypes.func.isRequired,
        isBeforeDay: PropTypes.func.isRequired,
        isBeforeYear: PropTypes.func.isRequired,
        isBefore: PropTypes.func.isRequired,
        isWithinRange: PropTypes.func.isRequired,
        startOfMonth: PropTypes.func.isRequired,
        endOfMonth: PropTypes.func.isRequired,
        startOfWeek: PropTypes.func.isRequired,
        endOfWeek: PropTypes.func.isRequired,
        addSeconds: PropTypes.func.isRequired,
        addMinutes: PropTypes.func.isRequired,
        addHours: PropTypes.func.isRequired,
        addDays: PropTypes.func.isRequired,
        addWeeks: PropTypes.func.isRequired,
        addMonths: PropTypes.func.isRequired,
        startOfDay: PropTypes.func.isRequired,
        endOfDay: PropTypes.func.isRequired,
        format: PropTypes.func.isRequired,
        formatByString: PropTypes.func.isRequired,
        formatNumber: PropTypes.func.isRequired,
        getHours: PropTypes.func.isRequired,
        setHours: PropTypes.func.isRequired,
        getMinutes: PropTypes.func.isRequired,
        setMinutes: PropTypes.func.isRequired,
        getSeconds: PropTypes.func.isRequired,
        setSeconds: PropTypes.func.isRequired,
        getMonth: PropTypes.func.isRequired,
        getDaysInMonth: PropTypes.func.isRequired,
        setMonth: PropTypes.func.isRequired,
        getNextMonth: PropTypes.func.isRequired,
        getPreviousMonth: PropTypes.func.isRequired,
        getMonthArray: PropTypes.func.isRequired,
        getYear: PropTypes.func.isRequired,
        setYear: PropTypes.func.isRequired,
        mergeDateAndTime: PropTypes.func.isRequired,
        getWeekdays: PropTypes.func.isRequired,
        getWeekArray: PropTypes.func.isRequired,
        getYearRange: PropTypes.func.isRequired,
        getMeridiemText: PropTypes.func.isRequired,
      }).isRequired,
      children: PropTypes.node.isRequired,
    };
  } catch (e) {}
}
