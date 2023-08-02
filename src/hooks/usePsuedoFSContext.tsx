import { PropsWithChildren, useState } from "react";
import PsuedoFS from "@/components/bookmarks/psuedo_fs";
import PsuedoFSStateContext from "@/contexts/psuedoFSContext";


const usePsuedoFSContextProvider = () => {
  const fs = new PsuedoFS({
    "Storygraph": "https://app.thestorygraph.com/",
    "Goodreads": "https://www.goodreads.com/",
    "Youtube": "https://www.youtube.com/",
  })

  const [psuedoFS, setPsuedoFS] = useState<PsuedoFS>(fs)
  const [currentPath, setCurrentPath] = useState('')

  const PsuedoContextProvider = ({children}: PropsWithChildren) => {
    return <PsuedoFSStateContext.Provider
       value={{psuedoFS, setPsuedoFS, currentPath, setCurrentPath}}
    >
      {children}
    </PsuedoFSStateContext.Provider>
  }

  return {
    PsuedoContextProvider
  }
}


export default usePsuedoFSContextProvider;
