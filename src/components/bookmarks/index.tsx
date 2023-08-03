import styles from "@/styles/bookmarks.module.scss"

import FSNav from "./fs_nav";
import BottomBar from "./bottomBar";
import { BookMarkArea } from "./bookmark";

const BookmarksComponent = () => {

  return (
    <div className={styles.container}>
      <FSNav />
      <BookMarkArea />
      <BottomBar />
    </div>
  )
}

export default BookmarksComponent;
