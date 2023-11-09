import { useRef, useState } from "react";
import { useCalendarState } from "@react-stately/calendar";
import { useCalendar } from "@react-aria/calendar";
import { useDateFormatter, useLocale } from "@react-aria/i18n";
import { createCalendar } from "@internationalized/date";
import * as styles from "./styles.module.css";

export function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar
  });

  let ref = useRef();
  let { calendarProps } = useCalendar(props, state, ref);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
      {...calendarProps}
      ref={ref}
      className={styles.calendar}
    >
      <div className={styles.header}>
        <PreviousButton state={state} />
        <YearDropdown state={state} />
        <NextButton state={state} />
      </div>
      <div className={styles.dropdowns}>
        <MonthSelector state={state} />
      </div>
    </div>
  );
}

function MonthSelector({ state }) {
  const [chosenDate, setChosenDate] = useState(null);

  let onClick = (e) => {
    const value = Number(e.target.getAttribute("value"));
    let date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
    setChosenDate({ month: date.month, year: date.year });
  };

  const monthsObj = {
    0: [
      { month: "Jan", value: 1 },
      { month: "Feb", value: 2 },
      { month: "Mar", value: 3 }
    ],
    1: [
      { month: "Apr", value: 4 },
      { month: "May", value: 5 },
      { month: "Jun", value: 6 }
    ],
    2: [
      { month: "Jul", value: 7 },
      { month: "Aug", value: 8 },
      { month: "Sep", value: 9 }
    ],
    3: [
      { month: "Oct", value: 10 },
      { month: "Nov", value: 11 },
      { month: "Dec", value: 12 }
    ]
  };

  const result = [...new Array(4).keys()].map((res, i) => {
    return (
      <div key={i} style={{ display: "flex" }}>
        {monthsObj[i].map((mon, i) => {
          return (
            <button
              key={i}
              onClick={(e) => {
                onClick(e);
              }}
              className={styles.month}
              value={mon.value}
            >
              {mon.month}
            </button>
          );
        })}
      </div>
    );
  });
  return (
    <>
      <div>{result}</div>
      <div>Chosen Month : {chosenDate?.month}</div>
      <div>Chosen Year : {chosenDate?.year}</div>
    </>
  );
}

function YearDropdown({ state }) {
  let formatter = useDateFormatter({
    year: "numeric",
    timeZone: state.timeZone
  });
  let date = state.focusedDate;

  return <div>{formatter.format(date.toDate(state.timeZone))}</div>;
}

const PreviousButton = ({ state }) => {
  let onChange = (e) => {
    state.setFocusedDate(state.focusedDate.subtract({ years: 1 }));
  };
  return <button onClick={onChange}>Prev</button>;
};
const NextButton = ({ state }) => {
  let onChange = (e) => {
    state.setFocusedDate(state.focusedDate.add({ years: 1 }));
  };
  return <button onClick={onChange}>Next</button>;
};
