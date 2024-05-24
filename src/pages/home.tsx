import { SkeletonTheme } from "react-loading-skeleton";

import store from "@/redux/store";
import { saveState } from "@/components/localFuncs";
import MusicComponent from "@/components/music";
import NotesComponent from "@/components/notes";
import OptionsComponent from "@/components/options";
import GeneralStatusComponent from "@/components/dateAndTime";

import styles from "@/styles/app.module.scss";
import LinkComponent from "@/components/link";
import { ComponentsKind } from "@/components/component";
import { useAppSelector } from "@/hooks/reduxAppHooks";
import { selectComponents } from "@/redux/componentsSlice";
import { Fragment } from "react";
import EditModeOverlay from "@/components/editMode";

store.subscribe(
  // TODO: debounce
  () => {
    saveState("notes", store.getState().notes.value);
    saveState("components", store.getState().components.value);
  },
);
function App() {
  const components = useAppSelector(selectComponents);

  return (
    <div className={styles.main_container}>
      <EditModeOverlay />

      <div className={styles.content_container}>
        <SkeletonTheme baseColor="transparent" highlightColor="#202020">
          {Object.entries(components).map(([id, component]) => {
            switch (component.kind) {
              case ComponentsKind.Music: {
                return (
                  <MusicComponent
                    id={id}
                    key={id}
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
                    id={id}
                    key={id}
                    rowSpan={component.rowSpan}
                    colSpan={component.colSpan}
                    rowStart={component.rowStart}
                    colStart={component.colStart}
                  />
                );
              }
              case ComponentsKind.Options: {
                return <OptionsComponent key={id} />;
              }
              case ComponentsKind.Note: {
                console.log(component);
                return (
                  <NotesComponent
                    key={id}
                    rowSpan={component.rowSpan}
                    colSpan={component.colSpan}
                    rowStart={component.rowStart}
                    colStart={component.colStart}
                    noteId={component.noteId}
                    id={id}
                  />
                );
              }
              case ComponentsKind.Link: {
                return (
                  <LinkComponent
                    id={id}
                    key={id}
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
                return <Fragment key={id}></Fragment>;
              }
            }
          })}
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default App;
