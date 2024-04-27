import { SkeletonTheme } from "react-loading-skeleton";

import store from "@/redux/store";
import { saveState } from "@/components/localFuncs";
import MusicComponent from "@/components/music";
import NotesComponent from "@/components/notes";
import OptionsComponent from "@/components/options";
import GeneralStatusComponent from "@/components/dateAndTime";

import styles from "@/styles/app.module.scss";
import LinkComponent from "@/components/link";

store.subscribe(
  // TODO: debounce
  () => {
    saveState("notes", store.getState().notes.value);
  },
);

function App() {
  return (
    <div className={styles.main_container}>
      <div className={styles.content_container}>
        <SkeletonTheme baseColor="transparent" highlightColor="#202020">
          <GeneralStatusComponent rowStart={3} colStart={5} />
          <MusicComponent rowSpan={2} colSpan={3} />
          <NotesComponent rowStart={5} colStart={10} colSpan={3} rowSpan={2} />
          <OptionsComponent />
          <LinkComponent
            rowStart={4}
            colSpan={2}
            title="Epic Games"
            link="https://epicgames.com"
          />
          <LinkComponent
            rowStart={5}
            colStart={1}
            title="Google"
            link="https://google.co.in"
          />
          <LinkComponent
            rowStart={5}
            colStart={2}
            title="Reddit"
            link="https://reddit.com"
          />
          <LinkComponent
            rowStart={4}
            colStart={3}
            rowSpan={2}
            title="Steam"
            link="https://store.steampowered.com"
          />
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default App;
