import store from "@/redux/store";
import { SkeletonTheme } from "react-loading-skeleton";

import GeneralStatusComponent from "@/components/dateAndTime";
import MusicComponent from "@/components/music";
import SearchComponent from "@/components/search";
import BookmarksComponent from "@/components/bookmarks";
import OptionsComponent from "@/components/options";
import NotesComponent from "@/components/notes";

import styles from "@/styles/app.module.scss";
import { saveState } from "@/components/localFuncs";

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
