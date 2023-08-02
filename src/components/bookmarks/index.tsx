import styles from "@/styles/bookmarks.module.scss"
import { BottomBar, FSNav } from "./nav";
import { BookMarkArea } from "./bookmark";
import usePsuedoFSContextProvider from "@/hooks/usePsuedoFSContext";


const BookmarksComponent = () => {
  const { PsuedoContextProvider } = usePsuedoFSContextProvider()

  return (
    <PsuedoContextProvider>
      <div className={styles.container}>
        <FSNav />
        <BookMarkArea />
        <BottomBar />
      </div>
    </PsuedoContextProvider>
  )
}

export default BookmarksComponent;
