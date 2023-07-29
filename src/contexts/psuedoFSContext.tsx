import PsuedoFS from "@/components/bookmarks/psuedo_fs";
import { Dispatch, SetStateAction, createContext } from "react";

interface PsuedoFSStateI {
  currentPath: string
  psuedoFS: PsuedoFS
  setPsuedoFS: Dispatch<SetStateAction<PsuedoFS>>
  setCurrentPath: Dispatch<SetStateAction<string>>
}

const PsuedoFSStateContext = createContext<PsuedoFSStateI | null>(null)

export default PsuedoFSStateContext;
