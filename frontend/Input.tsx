import classNames from "classnames/bind";
import React, { Dispatch, FocusEventHandler, SetStateAction } from "react";
import { CorrectSign, Eye } from "src/icons/Icons";
import Styles from "./Input.module.scss";

const cnb = classNames.bind(Styles);
interface Props {
  title: string;
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string>>;
  id?: string;
  name?: string;
  touched?: boolean;
  classNameForWrapper?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  isTextArea?: boolean;
  isPassword?: boolean;
  isDisabled?: boolean;
  isCorrect?: boolean;
  error?: string;
  advice?: string;
  onIconClick?: () => void;
  handleBlur?: FocusEventHandler;
}

const Input: React.FC<Props> = ({
  isCorrect,
  value,
  setValue,
  title,
  id = "input",
  name = "name",
  classNameForWrapper,
  leftIcon,
  rightIcon,
  isTextArea = false,
  isDisabled = false,
  isPassword,
  onIconClick,
  error,
  touched,
  advice,
  handleBlur,
}) => {
  const [hideText, setHideText] = React.useState(isPassword);
  const [focused, setFocused] = React.useState(false);
  const onFocus = (e: React.FocusEvent<Element, Element>) => {
    setFocused(true);
    if (handleBlur) {
      handleBlur(e);
    }
  };
  const onBlur = (e: React.FocusEvent<Element, Element>) => {
    setFocused(false);
    if (handleBlur) {
      handleBlur(e);
    }
  };

  const getInputClassNames = () => {
    return cnb(
      "input",
      { focused: focused || !!value },
      { error: error && touched },
      { withLeftIcon: leftIcon },
      { withoutTitle: !title.length },
      { withRightIcon: rightIcon || isPassword || isCorrect },
      { disabled: isDisabled },
      { isCorrect },
      { textarea: isTextArea }
    );
  };

  return (
    <div
      className={cnb(
        "wrapper",
        classNameForWrapper,
        { error: error && touched },
        { disabled: isDisabled }
      )}
    >
      <div
        className={cnb(
          "title",
          { withLeftIcon: leftIcon },
          { withRightIcon: rightIcon },
          { focused: focused || !!value }
        )}
      >
        <label htmlFor={id}>{title}</label>
      </div>
      <div className={cnb("inner")}>
        <div className={cnb("icon", "left")} onClick={onIconClick}>
          {leftIcon}
        </div>
        {!isTextArea ? (
          <input
            id={id}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isDisabled}
            type={isPassword && hideText ? "password" : "text"}
            className={getInputClassNames()}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ) : (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isDisabled}
            className={getInputClassNames()}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
        {isPassword ? (
          <div
            className={cnb("icon", "right", "passwordIcon")}
            onClick={() => setHideText((prev) => !prev)}
          >
            <Eye />
          </div>
        ) : (
          <div
            className={cnb("icon", "right", { disabled: isDisabled })}
            onClick={() => (!isDisabled && onIconClick ? onIconClick() : null)}
          >
            {isCorrect ? <CorrectSign /> : rightIcon}
          </div>
        )}
        {error && touched && <div className={cnb("errorText")}>{error}</div>}
        {advice && !(error && touched) && (
          <div className={cnb("adviceText")}>{advice}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
