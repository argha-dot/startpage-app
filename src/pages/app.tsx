import GeneralStatusComponent from "@/components/dateAndTime";
import MusicComponent from "@/components/music";
import SearchComponent from "@/components/search";
import { SkeletonTheme } from "react-loading-skeleton";
import styles from "@/styles/app.module.scss";

function App() {
  return (
    <div className={styles.main_container}>
      <div className={styles.content_container}>
        <SkeletonTheme baseColor="transparent" highlightColor="#212121">
          <GeneralStatusComponent />
          <MusicComponent />
          <SearchComponent />
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default App;
