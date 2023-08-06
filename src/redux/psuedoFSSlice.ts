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

interface DeleteFSNOdeActionPayloadParamsI {
  currentPath: string
  name: string
}

const initState: PsuedoFSStateI = {
  value: {
    currentPath: "",
    psuedoFS: new PsuedoFS()
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

    deleteFSNode: (state, action: PayloadAction<DeleteFSNOdeActionPayloadParamsI>) => {
      const psuedoFS = new PsuedoFS(JSON.parse(JSON.stringify(state.value.psuedoFS.getFs())))
      const { currentPath, name } = action.payload

      psuedoFS.deleteNode(currentPath, name)

      state.value = {
        ...state.value,
        psuedoFS: new PsuedoFS(psuedoFS.getFs())
      }
    },

    createFSNode: (state, action: PayloadAction<CreateFSNodeActionPayloadParamsI>) => {
      const psuedoFS = new PsuedoFS(JSON.parse(JSON.stringify(state.value.psuedoFS.getFs())))
      const { isFolder, name, link, currentPath } = action.payload

      if (isFolder) {
        psuedoFS.addLink(currentPath, "folder",  name)
      } else {
        if (link.length > 0) {
          psuedoFS.addLink(currentPath, "file", name, link)
        }
      }

      state.value = {
        ...state.value,
        psuedoFS: new PsuedoFS(psuedoFS.getFs()) 
      }
    }
  }
})

export function loadState() {
  try {
    const data = localStorage.getItem("psuedo_fs")
    if (!data) return undefined;

    return JSON.parse(data)
  } catch (error) {
    return undefined
  }
}

export async function saveState(state: any) {
  try {
    const data = JSON.stringify(state)
    localStorage.setItem("psuedo_fs", data)
  } catch (error) {
    console.warn(error)
  }
}

export const { back, setCurrentPath, createFSNode, deleteFSNode } = psuedoFSSlice.actions
export const selectPsuedoFS = (state: RootState) => state.psuedoFS.value
export default psuedoFSSlice.reducer
