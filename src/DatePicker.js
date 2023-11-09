import { useDatePicker } from "@react-aria/datepicker";
import { useDatePickerState } from "@react-stately/datepicker";
import { useCalendarState } from "@react-stately/calendar";
import { useCalendar } from "@react-aria/calendar";
import { useDateFormatter, useLocale } from "@react-aria/i18n";
import { createCalendar } from "@internationalized/date";
import React, { useRef, useState } from "react";

import "./date-picker.scss";
import { DateField } from "./DateField";

import {
  ReactAriaButton,
  ReactAriaDialog,
  ReactAriaPopover
} from "./ReactAriaComponents";

export const DatePicker = (props) => {
  let state = useDatePickerState({ ...props, shouldCloseOnSelect: false });
  let ref = useRef();
  let {
    buttonProps,
    calendarProps,
    dialogProps,
    fieldProps,
    groupProps,
    labelProps
  } = useDatePicker(props, state, ref);
  console.log("CAL PROPS", calendarProps);
  return (
    <div className="c-datepicker">
      <div {...labelProps} className="c-datepicker__label">
        {props.label}
      </div>
      <div
        className="c-datepicker__date-field-container"
        {...groupProps}
        ref={ref}
      >
        <DateField {...fieldProps} granularity="month" />
        <ReactAriaButton {...buttonProps}>Cal</ReactAriaButton>
      </div>
      {state.isOpen && (
        <ReactAriaPopover
          state={state}
          popoverRef={ref}
          triggerRef={ref}
          placement="bottom start"
        >
          <ReactAriaDialog {...dialogProps}>
            <YearCalendar {...calendarProps} />
          </ReactAriaDialog>
        </ReactAriaPopover>
      )}
    </div>
  );
};

const YearCalendar = (props) => {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar
  });
  console.log("STATE", state);

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
      className="year-calendar"
    >
      <div className="year-calendar__header">
        <PreviousButton state={state} />
        <YearDropdown state={state} />
        <NextButton state={state} />
      </div>
      <div className="year-calendar__dropdowns">
        <MonthSelector state={state} />
      </div>
    </div>
  );
};

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

function MonthSelector({ state }) {
  const [chosenDate, setChosenDate] = useState(null);

  let onClick = (e) => {
    const value = Number(e.target.getAttribute("value"));
    let date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
    state.setValue(date);
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

  const calendar = [...new Array(4).keys()].map((res, i) => {
    return (
      <div key={i} style={{ display: "flex" }}>
        {monthsObj[i].map((mon, i) => {
          return (
            <button
              key={i}
              onClick={(e) => {
                onClick(e);
              }}
              className="year-calendar__month"
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
      <div>{calendar}</div>
    </>
  );
}
