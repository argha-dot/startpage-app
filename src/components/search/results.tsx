import { useAppSelector } from "@/hooks/reduxAppHooks";
import { selectPsuedoFS } from "@/redux/psuedoFSSlice";
import styles from "@/styles/search.module.scss";
import { useMemo } from "react";
import { fuzzySearchOnLinks } from "./utils";
import { selectMusic } from "@/redux/musicSlice";

const Result = ({ title, link }: { title: string; link: string }) => {
  const { playing } = useAppSelector(selectMusic);
  return (
    <a
      className={styles.result}
      href={link}
      target={playing ? "_blank" : "_top"}
    >
      <p>{title}</p>
      <p>{link}</p>
    </a>
  );
};

const SearchResults = ({ query }: { query: string }) => {
  const { psuedoFS } = useAppSelector(selectPsuedoFS);
  const links = useMemo(
    () => fuzzySearchOnLinks(query, Object.entries(psuedoFS.getAllLinks())),
    [psuedoFS, query]
  );
  // console.log(fuzzySearchOnLinks(query, links));

  return (
    <>
      {links.length > 0 && query.length > 2 && (
        <div className={styles.results_container}>
          {links.map(([name, link]) => {
            return <Result title={name} link={link} />;
          })}
        </div>
      )}
    </>
  );
};

export default SearchResults;
