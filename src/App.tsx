import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { useLocalStorage } from "./storage/localStorage";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []); // Corrected the type to Tag[]

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note, // Corrected from ...notes to ...note
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]); // Added tags to the dependency array

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }
  function onUpdate(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }
  function onDelete(id: string) {
    console.log("ondelete is called");
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  return (
    <BrowserRouter>
      <Router
        onSubmit={onCreateNote}
        addTag={addTag}
        availableTags={tags}
        notes={notesWithTags}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </BrowserRouter>
  );
}

export default App;
