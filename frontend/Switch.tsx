import classNames from "classnames/bind";
import React from "react";
import styles from "./Switch.module.scss";
const cnb = classNames.bind(styles);

export interface RadioButtonProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

const Switch: React.FC<RadioButtonProps> = ({ label, id, ...props }) => (
  <div className={cnb("switchWrapper")}>
    <label className={cnb("switch")}>
      <input type='checkbox' {...props} id={id} />
      <span className={cnb("slider", "round")} />
    </label>
    <label htmlFor={id} className={cnb("desc")}>
      {label}
    </label>
  </div>
);

export default Switch;
