import { PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from "@/styles/components.module.scss";
import { useAppSelector } from "@/hooks/reduxAppHooks";
import { selectEditMode } from "@/redux/editModeSlice";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeComponent } from "@/redux/componentsSlice";
import useDraggable from "@/hooks/useDraggable";

/**
  An interface for containers to extend off of, 7 Rows (Horizontal)
  and 12 Columns (Vertical)
  @param {number} colStart Which column the component starts in the grid 
  @param {number} colSpan The number of columns the container spans
  @param {number} rowStart Which row the components starts in the grid
  @param {number} rowSpan The number of rows the container spans
*/
export type ComponentContianerPropsI = Partial<{
  rowSpan: number;
  colSpan: number;
  rowStart: number;
  colStart: number;
}> & {
  id: string;
};

/** 
  @member {number} colStart Which column the component starts in the grid 
  @param {number} colSpan The number of columns the container spans
  @param {number} rowStart Which row the components starts in the grid
  @param {number} rowSpan The number of rows the container spans
  @param {number} padding The padding of the container
  @param {number} minRow the minimum number of rows the container spans, will overwrite rowSpan if rowSpan is less than minRow
  @param {number} minCol the minimum number of columns the container spans, will overwrite colSpan if colSpan is less than minCol
  @param {number} absCol the number of columns the container spans, if this is set, it will override the colSpan and minCol
  @param {number} absRow the number of rows the container spans, if this is set, it will override the rowSpan and minRow
  @param {string} className additional classes to be added to the container
*/
type ContainerProps = Partial<{
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
  padding: string;
  minRow: number;
  minCol: number;
  absCol: number;
  absRow: number;
  className: string;
}> & {
  id: string;
};

/**
 * This is the component which wraps all the other components in the grid
 *
  @param {PropsWithChildren<Partial<ContainerProps>>} props The Component props
  @param {number} colStart Which column the component starts in the grid 
  @param {number} colSpan The number of columns the container spans
  @param {number} rowStart Which row the components starts in the grid
  @param {number} rowSpan The number of rows the container spans
  @param {number} padding The padding of the container
  @param {number} minRow the minimum number of rows the container spans, will overwrite rowSpan if rowSpan is less than minRow
  @param {number} minCol the minimum number of columns the container spans, will overwrite colSpan if colSpan is less than minCol
  @param {number} absCol the number of columns the container spans, if this is set, it will override the colSpan and minCol
  @param {number} absRow the number of rows the container spans, if this is set, it will override the rowSpan and minRow
  @param {string} className additional classes to be added to the container
*/
const Container = ({
  id,
  children,
  colStart = 1,
  colSpan = 1,
  rowStart = 1,
  rowSpan = 1,
  absCol = 0,
  absRow = 0,
  className = "",
  minRow = 1,
  minCol = 1,
  padding = "1rem",
}: PropsWithChildren<ContainerProps>) => {
  rowSpan = absRow > 0 ? absRow : rowSpan < minRow ? minRow : rowSpan;
  colSpan = absCol > 0 ? absCol : colSpan < minCol ? minCol : colSpan;

  const editMode = useAppSelector(selectEditMode);
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);

  const handleMouseUp = (_: MouseEvent) => {
    setPressed(false);
  };

  const handleMouseDown = (_: MouseEvent) => {
    setPressed(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (pressed) {
      console.log(e.offsetX, e.offsetY);
    }
  };

  useEffect(() => {
    if (!ref.current || !position.current) {
      return;
    }

    ref.current.addEventListener("mousedown", handleMouseDown);
    ref.current.addEventListener("mouseup", handleMouseUp);
    ref.current.addEventListener("mousemove", handleMouseMove);

    return () => {
      ref.current?.removeEventListener("mousedown", handleMouseDown);
      ref.current?.removeEventListener("mouseup", handleMouseUp);
      ref.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pressed]);

  return (
    <div
      style={{
        gridRow: `${rowStart} / span ${rowSpan}`,
        gridColumn: `${colStart} / span ${colSpan}`,
        padding: padding,
        position: "relative",
      }}
      className={`${styles.container} ${className}`}
    >
      <div
        ref={ref}
        style={{
          position: "absolute",
          background: "transparent",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "100",
          border: "1px solid red",
        }}
      ></div>
      {editMode && (
        <div className={styles.edit_mode}>
          <button onClick={() => dispatch(removeComponent(id))}>
            <FaTrash />
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

export default Container;
