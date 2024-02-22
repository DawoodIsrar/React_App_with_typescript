import React from "react";
type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
};
import NewsForm from "../components/NewsForm";
import { NoteData, Tag } from "../App";
const NewNote = ({ onSubmit, addTag, availableTags }: NewNoteProps) => {
  return (
    <>
      <h1>news</h1>
      <NewsForm
        onSubmition={onSubmit}
        addTag={addTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default NewNote;
