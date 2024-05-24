import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import styles from "@/styles/app.module.scss";
import { ComponentsKind } from "@/components/component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { addComponent } from "@/redux/componentsSlice";
import { toggle, selectEditMode } from "@/redux/editModeSlice";
import { Fragment, useEffect } from "react";
import TwentyEightDivs from "./28divs";

const EditModeOverlay = () => {
  const editMode = useAppSelector(selectEditMode);
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(
      addComponent({
        kind: ComponentsKind.Music,
        rowStart: 7,
      }),
    );
  };

  useEffect(() => {
    const divs = document.querySelector("#editModeOverlay")?.children;
    if (divs && divs.length > 0) {
      console.log(divs[0].getBoundingClientRect());
    }
  }, []);

  const handleToggleEdit = () => {
    dispatch(toggle());
  };

  return (
    <Fragment>
      <div className={styles.edit_options}>
        <button onClick={handleAdd}>
          <FaPlus />
        </button>
        <button onClick={handleToggleEdit}>
          <FaEdit />
        </button>
      </div>

      {editMode && (
        <div id="editModeOverlay" className={styles.edit_overlay}>
          <TwentyEightDivs />
        </div>
      )}
    </Fragment>
  );
};

export default EditModeOverlay;
