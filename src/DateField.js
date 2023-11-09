import { GregorianCalendar } from "@internationalized/date";
import { useDateField, useDateSegment } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import { useDateFieldState } from "@react-stately/datepicker";
import React, { useRef } from "react";
import "./date-field.scss";

// Ensure that we just use the Gregorian Calendar to limit package size.
// If needed more can be added in at a later point. See below link for example:
// https://react-spectrum.adobe.com/react-aria/useDateField.html#reducing-bundle-size
const createCalendar = (identifier) => {
  switch (identifier) {
    case "gregory":
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
};

export const DateField = (props) => {
  let { locale } = useLocale();

  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar
  });

  let ref = useRef();
  let { labelProps, fieldProps } = useDateField(props, state, ref);

  return (
    <div
      className={
        state.validationState === "invalid"
          ? `c-date-field__wrapper c-date-field__wrapper--error`
          : `c-date-field__wrapper`
      }
    >
      <span {...labelProps} className="c-date-field__label">
        {props.label}
      </span>
      <div {...fieldProps} ref={ref} className="c-date-field">
        {state.segments.map((segment, i) => (
          <DateSegment
            key={i}
            segment={segment}
            state={state}
            name="datepicker"
          />
        ))}
      </div>
      {state.validationState === "invalid" ? (
        <div className="c-date-field__error--text">Invalid Date</div>
      ) : null}
    </div>
  );
};

const DateSegment = ({ segment, state }) => {
  let ref = useRef();
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={`c-date-field__segment ${
        segment.isPlaceholder ? "c-date-field__placeholder" : ""
      }`}
    >
      {segment.text}
    </div>
  );
};
