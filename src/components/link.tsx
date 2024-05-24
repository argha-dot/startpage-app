import { selectMusic } from "@/redux/musicSlice";
import { useAppSelector } from "@/hooks/reduxAppHooks";
import styles from "@/styles/link.module.scss";
import Container, { ComponentContianerPropsI } from "./container";

export type LinkPropsI = ComponentContianerPropsI & {
  title: string;
  link: string;
};

const LinkComponent = ({
  link,
  title,
  rowSpan = 1,
  rowStart,
  colSpan = 1,
  colStart,
  id,
}: LinkPropsI) => {
  const { playing } = useAppSelector(selectMusic);

  return (
    <Container
      id={id}
      minCol={1}
      minRow={1}
      rowStart={rowStart ?? 1}
      colStart={colStart ?? 1}
      rowSpan={rowSpan ?? 1}
      colSpan={colSpan ?? 1}
      padding="0"
    >
      <a
        className={styles.link_container}
        style={{ textDecoration: "none", color: "inherit" }}
        target={playing ? "_blank" : "_top"}
        href={link}
      >
        <img
          className={styles.link_icon}
          style={{
            width: `${rowSpan > colSpan ? "70%" : "auto"}`,
            height: `${rowSpan <= colSpan ? "70%" : "auto"}`,
          }}
          src={`${link}/favicon.ico?s=60`}
        />
        <p>{title}</p>
      </a>
    </Container>
  );
};

export default LinkComponent;
