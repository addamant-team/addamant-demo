import classNames from "classnames/bind";
import { FlatArrow, CheckSign } from "../../icons/Icons";
import React, { Dispatch, SetStateAction, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import Styles from "./Dropdown.module.scss";

const cnb = classNames.bind(Styles);
type Props = {
  title: string;
  list: Item[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  classNameForWrapper?: string;
  error?: string;
  disabled?: boolean;
  onFinishScroll?: () => void;
};

type Item = {
  id: string;
  name: string;
};

const Dropdown: React.FC<Props> = ({
  title,
  classNameForWrapper,
  error,
  list,
  selected,
  setSelected,
  disabled,
  onFinishScroll
}) => {
  const wrapperRef = React.useRef(null);
  const [isOpen, setOpen] = useState(false);
  useClickOutside(wrapperRef, () => setOpen(false));

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const isItemSelected = (id: string): boolean => id === selected;
  const handleSelect = (id: string): void => {
    setSelected(id);
  };

  const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    if (
      onFinishScroll &&
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight
    ) {
      onFinishScroll();
    }
  };

  return (
    <div className={cnb("container", classNameForWrapper)}>
      <div
        ref={wrapperRef}
        className={cnb(
          "wrapper",
          { error },
          { open: isOpen },
          { disabled },
          { hasSelected: !!selected }
        )}
        onClick={() => !disabled && toggle()}
      >
        <div className={cnb("icon", { open: isOpen }, { disabled }, { hasSelected: !!selected })}>
          <FlatArrow />
        </div>
        <div className={cnb("title", { open: isOpen }, { hasSelected: !!selected })}>
          {title}
          <div className={cnb("selected", { open: isOpen }, { hasSelected: !!selected })}>
            {list.find((item) => item.id === selected)?.name}
          </div>
        </div>

        <div className={cnb("list", { open: isOpen })} onScroll={(e) => onScrollHandler(e)}>
          {isOpen &&
            list.map((item) => {
              return (
                <div
                  className={cnb("item", { open: isOpen }, { selected: isItemSelected(item.id) })}
                  onClick={() => handleSelect(item.id)}
                  key={item.id}
                >
                  {item.name}
                  {isItemSelected(item.id) && (
                    <div className={cnb("check")}>
                      <CheckSign />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
