import { useState } from "react";
import {
  FaRegFolder,
  FaLink,
  FaTrashCan,
  FaPen,
  FaCopy,
  FaX,
} from "react-icons/fa6";
import { selectMusic } from "@/redux/musicSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import {
  selectPsuedoFS,
  setCurrentPath,
  deleteFSNode,
  renameFSNode,
} from "@/redux/psuedoFSSlice";
import Modal from "../modal";
import styles from "@/styles/bookmarks.module.scss";

interface BookMarkPropsI {
  k: string;
  nodeType: string;
}

interface RenameI {
  name: string | undefined;
  link: string | undefined;
}

const BookMark = ({ k, nodeType }: BookMarkPropsI) => {
  const { psuedoFS, currentPath } = useAppSelector(selectPsuedoFS);
  const { playing } = useAppSelector(selectMusic);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const [rename, setRename] = useState<RenameI>({
    name: k,
    link:
      nodeType === "file" ? psuedoFS.getLink(`${currentPath}.${k}`) : undefined,
  });

  const handleOnFolderClick = () => {
    dispatch(setCurrentPath(`${currentPath}.${k}`));
  };

  const handleRenameClick = () => {
    setIsOpen(true);
  };

  const onSubmitRename = () => {
    dispatch(
      renameFSNode({
        currentPath,
        name: k,
        newName: rename.name,
        newLink: rename.link,
      })
    );

    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    dispatch(deleteFSNode({ currentPath, name: k }));
  };

  const handleCopyClick = () => {
    if (nodeType === "file") {
      navigator.clipboard.writeText(psuedoFS.getLink(`${currentPath}.${k}`));
    }

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className={styles.book_mark}>
      {psuedoFS.nodeType(`${currentPath}.${k}`) === "file" ? (
        <a
          style={{ textDecoration: "none" }}
          target={playing ? "_blank" : "_top"}
          href={psuedoFS.getLink(`${currentPath}.${k}`)}
        >
          <div className={`${styles.book_file}`} key={k}>
            <FaLink size="1.25em" />
            <p title={k}>{k.length > 10 ? `${k.slice(0, 7)}...` : k} </p>
          </div>
        </a>
      ) : (
        <button className={styles.book_folder} onClick={handleOnFolderClick}>
          <FaRegFolder />
          <p title={k}>{k.length > 10 ? `${k.slice(0, 7)}...` : k}</p>
        </button>
      )}

      <div className={styles.bookmark_more}>
        <button
          className={styles.bookmark_more_button}
          onClick={handleDeleteClick}
          title="Delete"
        >
          <FaTrashCan />
        </button>

        <button
          className={styles.bookmark_more_button}
          title="Rename"
          onClick={handleRenameClick}
        >
          <FaPen />
        </button>

        {nodeType === "file" && (
          <button
            className={styles.bookmark_more_button}
            onClick={() => {
              handleCopyClick();
            }}
            title="Copy Link"
          >
            <FaCopy />
          </button>
        )}
      </div>

      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <div className={styles.modal_container}>
          <button
            className={styles.close_button}
            onClick={() => setIsOpen(false)}
          >
            <FaX />
          </button>

          <h3>Rename</h3>

          <form
            className={styles.modal_form}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitRename();
            }}
          >
            <div>
              <label htmlFor="">Name: </label>
              <input
                value={rename.name}
                onChange={(e) => setRename({ ...rename, name: e.target.value })}
                type="text"
              />
            </div>

            {nodeType === "file" && (
              <div>
                <label htmlFor="">Link: </label>
                <input
                  type="text"
                  value={rename.link}
                  onChange={(e) =>
                    setRename({ ...rename, link: e.target.value })
                  }
                />
              </div>
            )}

            <button>Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

const BookMarkArea = () => {
  const { psuedoFS, currentPath } = useAppSelector(selectPsuedoFS);

  return (
    <div className={styles.bookmark_area}>
      {Object.keys(psuedoFS.ls(currentPath)).map((k) => {
        const nodeType = psuedoFS.nodeType(`${currentPath}.${k}`);
        if (nodeType === "file") {
          return <BookMark key={k} k={k} nodeType={nodeType} />;
        }
      })}
      {Object.keys(psuedoFS.ls(currentPath)).map((k) => {
        const nodeType = psuedoFS.nodeType(`${currentPath}.${k}`);
        if (nodeType === "folder") {
          return <BookMark key={k} k={k} nodeType={nodeType} />;
        }
      })}
    </div>
  );
};

export { BookMark, BookMarkArea };
