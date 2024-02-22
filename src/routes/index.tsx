import React, { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import NewNote from "../pages/NewNote";
import { Note, NoteData, Tag } from "../App";
import NoteList from "../pages/NoteList";
import { NoteLayout } from "../pages/NoteLayout";
import { Note as NOte } from "../pages/NOte";
import { Edit } from "../pages/EditNote";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
  notes: Note[];
  onUpdate: (id: string, data: NoteData) => void;
  onDelete: (id: string) => void;
};

export const Router = ({
  onSubmit,
  addTag,
  availableTags,
  notes,
  onUpdate,
  onDelete,
}: NewNoteProps) => {
  const routes = useRoutes([
    {
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <NoteList availableTags={availableTags} notes={notes} />,
        },
        {
          path: "new",
          element: (
            <NewNote
              onSubmit={onSubmit}
              addTag={addTag}
              availableTags={availableTags}
            />
          ),
        },
        {
          path: "/:id",
          element: <NoteLayout notes={notes} />,
          children: [
            {
              index: true,
              element: <NOte onDelete={onDelete} />,
            },
            {
              path: "edit",
              element: (
                <Edit
                  onSubmit={onUpdate}
                  addTag={addTag}
                  availableTags={availableTags}
                ></Edit>
              ),
            },
          ],
        },
      ],
    },
  ]);
  return routes;
};
