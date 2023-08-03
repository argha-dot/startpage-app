import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import PsuedoFS from "@/components/bookmarks/psuedo_fs";

interface PsuedoFSStateI {
  value: {
    currentPath: string,
    psuedoFS: PsuedoFS
  }
}

interface CreateFSNodeActionPayloadParamsI {
  currentPath: string
  name: string
  link: string
  isFolder: boolean
}

const initState: PsuedoFSStateI = {
  value: {
    currentPath: "",
    psuedoFS: new PsuedoFS({
      "Storygraph": "https://app.thestorygraph.com/",
      "Goodreads": "https://www.goodreads.com/",
      "Folder": {},
      "Youtube": "https://www.youtube.com/",
    })
  }
}

export const psuedoFSSlice = createSlice({
  name: 'psuedo_fs',
  initialState: initState,
  reducers: {
    back: (state) => { 
      state.value.currentPath = state
        .value
        .currentPath
        .split(".")
        .slice(0, -1)
        .join(".")
    },

    setCurrentPath: (state, action: PayloadAction<string>) => {
      state.value.currentPath = action.payload
    },

    createFSNode: (state, action: PayloadAction<CreateFSNodeActionPayloadParamsI>) => {
      const psuedoFS = state.value.psuedoFS
      const { isFolder, name, link, currentPath } = action.payload

      if (isFolder) {
        psuedoFS.addLink(currentPath, "folder",  name)
      } else {
        if (link.length > 0) {
          psuedoFS.addLink(currentPath, "file", name, link)
        }
      }

      state.value.psuedoFS = new PsuedoFS(psuedoFS.getFs()) 
    }
  }
})


export const { back, setCurrentPath, createFSNode } = psuedoFSSlice.actions
export const selectPsuedoFS = (state: RootState) => state.psuedoFS.value
export default psuedoFSSlice.reducer
