import { PropsWithChildren } from "react";
import styles from "@/styles/components.module.scss";

/**
  An interface for containers to extend off of
*/
export interface ComponentContianerPropsI {
  rowSpan: number;
  colSpan: number;
  rowStart: number;
  colStart: number;
}

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
export interface ContainerProps {
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
}

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
}: PropsWithChildren<Partial<ContainerProps>>) => {
  rowSpan = absRow > 0 ? absRow : rowSpan < minRow ? minRow : rowSpan;
  colSpan = absCol > 0 ? absCol : colSpan < minCol ? minCol : colSpan;

  return (
    <div
      style={{
        gridRow: `${rowStart} / span ${rowSpan}`,
        gridColumn: `${colStart} / span ${colSpan}`,
        padding: padding,
      }}
      className={`${styles.container} ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
