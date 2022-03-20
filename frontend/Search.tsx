import React from "react";
import styles from "./Search.module.scss";
import { useTranslation } from "react-i18next";
import { CloseSvg, SearchSvg } from "src/icons/Icons";
import Loader from "../Loader/Loader";
import useDebounce from "src/hooks/useDebounce";
import classNames from "classnames/bind";
const cnb = classNames.bind(styles);

export interface SearchProps extends React.HTMLProps<HTMLInputElement> {
  readonly debounceAsyncFunc?: (value: string | number | readonly string[]) => Promise<void>;
  readonly debounceTimeout?: number;
  readonly onCloseClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

const Search: React.FC<SearchProps> = ({
  debounceTimeout,
  value,
  placeholder,
  debounceAsyncFunc,
  onCloseClick,
  onChange,
  ...props
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const debouncedSearchTerm: string = useDebounce<string>(value?.toString() ?? "", 1500);

  function debounceChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange?.(e);
  }

  React.useEffect(() => {
    if (debounceAsyncFunc && debouncedSearchTerm) {
      setLoading(true);
      debounceAsyncFunc(debouncedSearchTerm).then(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className={cnb("inputWrapper")}>
      <label className={styles.search}>
        <SearchSvg />
      </label>
      <input
        {...props}
        onChange={debounceAsyncFunc ? debounceChange : onChange}
        placeholder={placeholder ? t(placeholder) : ""}
      />
      {loading ? (
        <Loader small />
      ) : (
        <div className={cnb("close")} onClick={onCloseClick}>
          <CloseSvg />
        </div>
      )}
    </div>
  );
};

export default Search;
