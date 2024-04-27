import { SkeletonTheme } from "react-loading-skeleton";

import store from "@/redux/store";
import { saveState } from "@/components/localFuncs";
import MusicComponent from "@/components/music";
import NotesComponent from "@/components/notes";
import OptionsComponent from "@/components/options";
import GeneralStatusComponent from "@/components/dateAndTime";

import styles from "@/styles/app.module.scss";
import LinkComponent from "@/components/link";
import { ComponentsKind, COMPONENT_INFO } from "@/components/component";

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
          {COMPONENT_INFO.map((component) => {
            switch (component.kind) {
              case ComponentsKind.Music: {
                return (
                  <MusicComponent
                    rowSpan={component.rowSpan}
                    colSpan={component.colSpan}
                    rowStart={component.rowStart}
                    colStart={component.colStart}
                  />
                );
              }
              case ComponentsKind.General: {
                return (
                  <GeneralStatusComponent
                    rowSpan={component.rowSpan}
                    colSpan={component.colSpan}
                    rowStart={component.rowStart}
                    colStart={component.colStart}
                  />
                );
              }
              case ComponentsKind.Options: {
                return <OptionsComponent />;
              }
              case ComponentsKind.Note: {
                return (
                  <NotesComponent
                    rowSpan={component.rowSpan}
                    colSpan={component.colSpan}
                    rowStart={component.rowStart}
                    colStart={component.colStart}
                    noteId={component.noteId}
                  />
                );
              }
              case ComponentsKind.Link: {
                return (
                  <LinkComponent
                    title={component.title}
                    link={component.link}
                    rowStart={component.rowStart}
                    colStart={component.colStart}
                    rowSpan={component.rowSpan}
                    colSpan={component.colSpan}
                  />
                );
              }
              default: {
                return <></>;
              }
            }
          })}
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default App;
