import { SkeletonTheme } from "react-loading-skeleton";

import GeneralStatusComponent from "@/components/dateAndTime";
import MusicComponent from "@/components/music";
import SearchComponent from "@/components/search";

import styles from "@/styles/app.module.scss";
import BookmarksComponent from "@/components/bookmarks";
import OptionsComponent from "@/components/options";
import store from "@/redux/store";
import { saveState } from "@/redux/psuedoFSSlice";
// import { debounce } from "debounce"

store.subscribe(
  // TODO: debounce
  () => saveState(store.getState().psuedoFS.value.psuedoFS.getFs())
)

function App() {
  return (
    <div className={styles.main_container}>
      <div className={styles.content_container}>
        <SkeletonTheme baseColor="transparent" highlightColor="#212121">
          <GeneralStatusComponent />
          <MusicComponent />
          <SearchComponent />
          <BookmarksComponent />
          <OptionsComponent />
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default App;
