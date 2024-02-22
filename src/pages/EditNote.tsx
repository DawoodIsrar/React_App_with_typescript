import { NoteData, Tag } from "../App";
import NewsForm from "../components/NewsForm";
import { useNote } from "./NoteLayout";
type NewNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
};
export function Edit({ onSubmit, addTag, availableTags }: NewNoteProps) {
  const note = useNote();
  return (
    <>
      <h1>Edit</h1>
      <NewsForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmition={(data) => onSubmit(note.id, data)}
        addTag={addTag}
        availableTags={availableTags}
      ></NewsForm>
    </>
  );
}
