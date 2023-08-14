import { useAppSelector } from "@/hooks/reduxAppHooks";
import { selectPsuedoFS } from "@/redux/psuedoFSSlice";
import styles from "@/styles/search.module.scss";
import { useMemo } from "react";
import { fuzzySearchOnLinks } from "./utils";

const Result = ({ title, link }: { title: string; link: string }) => {
  return (
    <a className={styles.result} href={link}>
      <p>{title}</p>
      <p>{link}</p>
    </a>
  );
};

const SearchResults = ({ query }: { query: string }) => {
  const { psuedoFS } = useAppSelector(selectPsuedoFS);
  const links = useMemo(
    () => Object.entries(psuedoFS.getAllLinks()),
    [psuedoFS]
  );
  console.log(fuzzySearchOnLinks(query, links));

  return (
    <>
      {links.length > 0 && query.length > 2 && (
        <div className={styles.results_container}>
          {fuzzySearchOnLinks(query, links).map(([name, link]) => {
            return <Result title={name} link={link} />;
          })}
        </div>
      )}
    </>
  );
};

export default SearchResults;
