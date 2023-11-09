import { useRef } from "react";
import { useCalendarCell } from "@react-aria/calendar";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import * as styles from "./styles.module.css";
import clsx from "clsx";

export function CalendarCell(props) {
  let ref = useRef();
  let {
    cellProps,
    buttonProps,
    formattedDate,
    isSelected,
    isDisabled,
    isOutsideVisibleRange
  } = useCalendarCell(props, props.state, ref);

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td {...cellProps}>
      <div
        ref={ref}
        hidden={isOutsideVisibleRange}
        {...mergeProps(buttonProps, focusProps)}
        className={clsx(styles.cell, {
          [styles.selected]: isSelected,
          [styles.focusRing]: isFocusVisible,
          [styles.disabled]: isDisabled
        })}
      >
        {formattedDate}
      </div>
    </td>
  );
}
