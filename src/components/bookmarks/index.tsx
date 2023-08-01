import styles from "@/styles/bookmarks.module.scss"
import { useEffect, useState } from "react";
import PsuedoFS from "./psuedo_fs";
import { BottomBar, FSNav } from "./nav";
import PsuedoFSStateContext from "@/contexts/psuedoFSContext";
import { BookMark } from "./bookmark";

const fs = new PsuedoFS({
  "Storygraph": "https://app.thestorygraph.com/",
  "Goodreads": "https://www.goodreads.com/",
  "Youtube": "https://www.youtube.com/",
  "folder": {
    "Youtube": "https://www.youtube.com/",
    "other": {
      "Youtube": "https://www.youtube.com/",
      "thing": {
      }
    }
  }
})


const BookmarksComponent = () => {
  const [psuedoFS, setPsuedoFS] = useState<PsuedoFS>(fs)
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    console.log(currentPath)
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
