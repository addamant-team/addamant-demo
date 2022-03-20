import classNames from "classnames/bind";
import React from "react";
import Loader from "../Loader/Loader";
import Styles from "./Button.module.scss";
const cnb = classNames.bind(Styles);

interface ButtonProps {
  title: string;
  onClick: () => void;
  name?: string;
  className?: string;
  theme?: ButtonThemes;
  small?: boolean;
  loading?: boolean;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export enum ButtonThemes {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  TERTIARY = "TERTIARY",
  BORDERED = "BORDERED",
  DARK = "DARK",
  TRANSPARENT = "TRANSPARENT"
}

const Button: React.FC<ButtonProps> = ({
  title,
  className,
  name,
  small,
  theme = ButtonThemes.PRIMARY,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  onClick,
  type = "button"
}) => {
  return (
    <button
      className={cnb(
        className,
        "button",
        { small },
        { secondary: theme === ButtonThemes.SECONDARY },
        { tertiary: theme === ButtonThemes.TERTIARY },
        { bordered: theme === ButtonThemes.BORDERED },
        { dark: theme === ButtonThemes.DARK },
        { transparent: theme === ButtonThemes.TRANSPARENT }
      )}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      name={name}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className={cnb("buttonInner")}>
          {iconLeft && <span className={cnb("icon")}>{iconLeft}</span>}
          <span className={cnb("title")}>{title}</span>
          {iconRight && <span className={cnb("icon")}>{iconRight}</span>}
        </div>
      )}
    </button>
  );
};

export default Button;
