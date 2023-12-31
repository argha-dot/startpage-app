import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import PsuedoFS from "@/components/bookmarks/psuedo_fs";

interface PsuedoFSStateI {
  value: {
    currentPath: string;
    psuedoFS: PsuedoFS;
  };
}

interface CreatePayloadParamsI {
  currentPath: string;
  name: string;
  link: string;
  isFolder: boolean;
}

interface RenamePayloadParamsI {
  currentPath: string;
  name: string;
  newName?: string;
  newLink?: string;
}

interface DeletePayloadParamsI {
  currentPath: string;
  name: string;
}

const initState: PsuedoFSStateI = {
  value: {
    currentPath: "",
    psuedoFS: new PsuedoFS(),
  },
};

export const psuedoFSSlice = createSlice({
  name: "psuedo_fs",
  initialState: initState,
  reducers: {
    back: (state) => {
      state.value.currentPath = state.value.currentPath
        .split(".")
        .slice(0, -1)
        .join(".");
    },

    setCurrentPath: (state, action: PayloadAction<string>) => {
      state.value.currentPath = action.payload;
    },

    deleteFSNode: (state, action: PayloadAction<DeletePayloadParamsI>) => {
      const psuedoFS = new PsuedoFS(
        JSON.parse(JSON.stringify(state.value.psuedoFS.getFs))
      );
      const { currentPath, name } = action.payload;

      psuedoFS.deleteNode(currentPath, name);

      state.value = {
        ...state.value,
        psuedoFS: new PsuedoFS(psuedoFS.getFs),
      };
    },

    createFSNode: (state, action: PayloadAction<CreatePayloadParamsI>) => {
      const psuedoFS = new PsuedoFS(
        JSON.parse(JSON.stringify(state.value.psuedoFS.getFs))
      );
      const { isFolder, name, link, currentPath } = action.payload;

      if (isFolder) {
        psuedoFS.addNode(currentPath, "folder", name);
      } else {
        if (link.length > 0) {
          psuedoFS.addNode(currentPath, "file", name, link);
        }
      }

      state.value = {
        ...state.value,
        psuedoFS: new PsuedoFS(psuedoFS.getFs),
      };
    },

    renameFSNode: (state, action: PayloadAction<RenamePayloadParamsI>) => {
      const psuedoFS = new PsuedoFS(
        JSON.parse(JSON.stringify(state.value.psuedoFS.getFs))
      );

      const { currentPath, name, newName, newLink } = action.payload;

      psuedoFS.renameNode(currentPath, name, newName, newLink);

      state.value = {
        ...state.value,
        psuedoFS: new PsuedoFS(psuedoFS.getFs),
      };
    },
  },
});

export const {
  back,
  setCurrentPath,
  createFSNode,
  deleteFSNode,
  renameFSNode,
} = psuedoFSSlice.actions;
export const selectPsuedoFS = (state: RootState) => state.psuedoFS.value;
export default psuedoFSSlice.reducer;
