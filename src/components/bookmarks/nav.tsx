import styles from "@/styles/bookmarks.module.scss"
import { usePsuedoFSContext } from "@/hooks/useThisContext";
import { FiChevronLeft } from "react-icons/fi"

const FSNav = () => {
  const { currentPath, setCurrentPath } = usePsuedoFSContext();

  const back = () => {
    setCurrentPath(prev => prev.split(".").slice(0, -1).join("."))
  }

  const currentPathMod = (): string => {
    const ret = currentPath ? 
      `${currentPath.split(".").join("/")}` :
      "/"
    return ret.slice(-20)
  }

  return <div className={styles.nav}>
    <button onClick={back}>
      <FiChevronLeft />
    </button>
    <p>{currentPathMod()}</p>
  </div>
}

const BottomBar = () => {
  return <div className={styles.bottom_bar}>
  </div>
}

export { BottomBar, FSNav }
