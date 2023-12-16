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
      tabIndex={-1}
      className={styles.result}
      href={link}
      target={playing ? "_blank" : "_top"}
    >
      <p>{link.substring(8, 18)}</p>
      <p>{title}</p>
    </a>
  );
};

const SearchResults = ({
  query,
  queryResults,
}: {
  query: string;
  queryResults: string[];
}) => {
  const { psuedoFS } = useAppSelector(selectPsuedoFS);
  const links = useMemo(
    () => fuzzySearchOnLinks(query, Object.entries(psuedoFS.getAllLinks())),
    [psuedoFS, query],
  );

  return (
    <>
      {query.length > 2 && (links.length > 0 || queryResults.length > 0) && (
        <div className={styles.results_container}>
          {links.map(([name, link]) => {
            return <Result key={`${name}-${link}`} title={name} link={link} />;
          })}
          {queryResults.map((result, i) => (
            <Result
              key={`${result}-${i}`}
              title={result}
              link={`https://duckduckgo.com/?q=${result}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResults;
