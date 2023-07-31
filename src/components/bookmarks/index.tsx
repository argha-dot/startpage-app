import styles from "@/styles/bookmarks.module.scss"
import { useEffect, useState } from "react";
import PsuedoFS from "./psuedo_fs";
import { BottomBar, FSNav } from "./nav";
import PsuedoFSStateContext from "@/contexts/psuedoFSContext";
import { BookMark } from "./bookmark";

const fs = new PsuedoFS({
  "other": "https://www.youtube.com/",
  "asdads": "https://www.youtube.com/",
  "coolcool": "https://www.youtube.com/",
  "folder": {
    "some": "https://www.youtube.com/",
    "other": {
      "some": "https://www.youtube.com/",
      "thing": {
      }
    }
  }
})


const BookmarksComponent = () => {
  const [psuedoFS, setPsuedoFS] = useState<PsuedoFS>(fs)
  const [currentPath, setCurrentPath] = useState('')

  // @ts-ignore
  const create = () => {
    psuedoFS.addLink("", "some", "thing")

    setPsuedoFS(prev => new PsuedoFS(prev.getFs()));
  }

  useEffect(() => {
    console.log(currentPath)
    psuedoFS.getLink("other")
  }, [currentPath])

  return (
    <PsuedoFSStateContext.Provider value={{psuedoFS, setPsuedoFS, currentPath, setCurrentPath}}>
      <div className={styles.container}>
        <FSNav />

        <div className={styles.bookmark_area}>{
          Object.keys(psuedoFS.ls(currentPath)).map((k) => {
            return <BookMark k={k} />
          })
        }</div>

        <BottomBar />
      </div>
    </PsuedoFSStateContext.Provider>
  )
}

export default BookmarksComponent;
