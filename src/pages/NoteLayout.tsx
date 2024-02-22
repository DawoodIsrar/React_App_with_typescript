import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../App";

type NoteLayout = {
  notes: Note[];
};

export function NoteLayout({ notes }: NoteLayout) {
  const { id } = useParams();
  const note = notes.find((n) => n.id == id);

  if (note == null) return <Navigate to={"/"} />;
  else return <Outlet context={note}></Outlet>;
}
export function useNote() {
  return useOutletContext<Note>();
}
