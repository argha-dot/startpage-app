import { FiChevronLeft } from "react-icons/fi";

import { selectPsuedoFS, back } from "@/redux/psuedoFSSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";

import styles from "@/styles/bookmarks.module.scss";

const FSNav = () => {
  const { currentPath } = useAppSelector(selectPsuedoFS);
  const dispatch = useAppDispatch();

  const onClickBack = () => {
    dispatch(back());
  };

  const currentPathMod = (): string => {
    const ret = currentPath ? `${currentPath.split(".").join("/")}` : "/";
    return ret.slice(-20);
  };

  return (
    <div className={styles.nav}>
      <button aria-label="Back" onClick={onClickBack}>
        <FiChevronLeft />
      </button>

      <p>{currentPathMod()}</p>
    </div>
  );
};

export default FSNav;
