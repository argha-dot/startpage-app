import { SkeletonTheme } from "react-loading-skeleton";

import store from "@/redux/store";
import { saveState } from "@/components/localFuncs";
import MusicComponent from "@/components/music";
import NotesComponent from "@/components/notes";
import SearchComponent from "@/components/search";
import OptionsComponent from "@/components/options";
import BookmarksComponent from "@/components/bookmarks";
import GeneralStatusComponent from "@/components/dateAndTime";

import styles from "@/styles/app.module.scss";

store.subscribe(
  // TODO: debounce
  () => {
    saveState("psuedo_fs", store.getState().psuedoFS.value.psuedoFS.getFs);
    saveState("notes", store.getState().notes.value);
  }
);

function App() {
  return (
    <div className={styles.main_container}>
      <div className={styles.content_container}>
        <SkeletonTheme baseColor="transparent" highlightColor="#202020">
          <GeneralStatusComponent />
          <MusicComponent />
          <SearchComponent />
          <BookmarksComponent />
          <OptionsComponent />
          <NotesComponent />
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default App;
