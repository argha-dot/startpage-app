import { useAppSelector } from "@/hooks/reduxAppHooks";
import styles from "@/styles/search.module.scss";
import { SearchResultI } from "./utils";
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
  results,
  query,
}: {
  query: string;
  results: SearchResultI[];
}) => {
  return (
    <>
      {query.length > 2 && (results.length > 0 || results.length > 0) && (
        <div className={styles.results_container}>
          {results.map((res, i) => {
            return (
              <Result
                key={`${res.title}-${i}`}
                title={res.title}
                link={res.link}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchResults;
