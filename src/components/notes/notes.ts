export interface NoteI {
  title: string;
  content: string;
}

export interface NotesI {
  [index: string]: NoteI;
}

export const getRandomId = () => {
  return ((Math.random() + 0.00001).toString(36) + "00000").slice(2, 7);
};
