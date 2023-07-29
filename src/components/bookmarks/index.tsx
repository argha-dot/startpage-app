import styles from "@/styles/bookmarks.module.scss"
import { useEffect, useState } from "react";
import { FiFile, FiFolder } from "react-icons/fi"
import PsuedoFS from "./psuedo_fs";
import BottomBar from "./bottomBar";
import PsuedoFSStateContext from "@/contexts/psuedoFSContext";

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

  const back = () => {
    setCurrentPath(prev => prev.split(".").slice(0, -1).join("."))
  }

  useEffect(() => {
    console.log(currentPath)
    psuedoFS.getLink("other")
  }, [currentPath])

  return (
    <div className={styles.container}>
      <PsuedoFSStateContext.Provider value={{psuedoFS, setPsuedoFS, currentPath, setCurrentPath}}>
        <button onClick={back}>back</button>
        <div>{
          Object.keys(psuedoFS.ls(currentPath)).map((k) => {
            return <div key={k}>
              {
                psuedoFS.nodeType(`${currentPath}.${k}`) === 'file' ? <a
                  target="_blank"
                  href={psuedoFS.getLink(`${currentPath}.${k}`)}>
                  <p> <FiFile /> {k} </p>
                </a> : <p
                  onClick={() => setCurrentPath(`${currentPath}.${k}`)}>
                  <FiFolder /> {k}
                </p>
              }
            </div>
          })
        }</div>

        <BottomBar />
      </PsuedoFSStateContext.Provider>
    </div>
  )
}

export default BookmarksComponent;
