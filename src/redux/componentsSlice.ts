import { ComponentsKind, ComponentsT } from "@/components/component";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getRandomId } from "@/components/notes/notes";

interface ComponentsStateI {
  value: {
    [index: string]: ComponentsT;
  };
}

const _something = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const initState: ComponentsStateI = {
  value: {
    clock: {
      kind: ComponentsKind.General,
      rowStart: 3,
      colStart: 5,
    },
  },
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: initState,
  reducers: {
    addComponent: (state, action: PayloadAction<ComponentsT>) => {
      const id = getRandomId();
      state.value = {
        ...state.value,
        [id]: action.payload,
      };
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      const componentId = action.payload;
      if (!(componentId in state.value)) {
        throw Error("No Such Component Exists");
      }

      const newC = state.value;
      delete newC[componentId];

      state.value = JSON.parse(JSON.stringify(newC));
    },
    editComponent: (
      state,
      action: PayloadAction<ComponentsT & { componentId: string }>,
    ) => {
      const { componentId } = action.payload;
      const curr: ComponentsT = {
        ...JSON.parse(JSON.stringify(state.value)),
        ...action.payload,
      };

      state.value = {
        ...state.value,
        [componentId]: curr,
      };
    },
  },
});

export const { addComponent, editComponent, removeComponent } =
  componentsSlice.actions;
export const selectComponents = (state: RootState) => state.components.value;
export default componentsSlice.reducer;
