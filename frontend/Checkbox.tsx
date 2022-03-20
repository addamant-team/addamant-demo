import React from "react";
import styles from "./Checkbox.module.scss";
import classNames from "classnames/bind";
const cnb = classNames.bind(styles);

export interface RadioButtonProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<RadioButtonProps> = ({ label, id, ...props }) => (
  <div className={cnb("wrapper")}>
    <input id={id} type='checkbox' {...props} />
    <label htmlFor={id}>{label}</label>
  </div>
);

export default Checkbox;
