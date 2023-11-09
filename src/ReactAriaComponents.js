import { useButton } from "@react-aria/button";
import { useDialog } from "@react-aria/dialog";
import { DismissButton, Overlay, usePopover } from "@react-aria/overlays";
import React, { useRef } from "react";

import "./date-picker.scss";
import "./react-aria-components.scss";

export const ReactAriaButton = (props) => {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);

  return (
    <button className="c-react-aria__button" {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
};

export const ReactAriaDialog = ({ children, ...props }) => {
  let ref = useRef();
  let { dialogProps } = useDialog(props, ref);

  return (
    <div className="c-react-aria__dialog" {...dialogProps} ref={ref}>
      {children}
    </div>
  );
};

export const ReactAriaPopover = ({ children, state, ...props }) => {
  let popoverRef = useRef();

  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef
    },
    state
  );

  return (
    <Overlay>
      <div className="c-react-aria__popover" {...underlayProps} />
      <div
        {...popoverProps}
        ref={popoverRef}
        style={{
          ...popoverProps.style,
          background: "var(--page-background)",
          boxShadow:
            "hsl(206deg 22% 7% / 35%) 0 10px 38px -10px, hsl(206deg 22% 7% / 20%) 0 10px 20px -15px"
        }}
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};
