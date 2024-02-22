import React, { useState, useMemo } from "react";
import { Badge, Button, Card, Col, Row, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactSelect from "react-select";
import { Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { Note, Tag } from "../App";
import styles from "./NOteList.module.css";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

export default function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filterNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="p-4 " style={{ overflowX: "hidden" }}>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col className="d-flex justify-content-end p-4">
          <Stack gap={2} direction="horizontal">
            <Link to={"/new"}>
              <Button>Create</Button>
            </Link>
            <Link to={"/new"}>
              <Button>Edit Tags</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Form className="p-4">
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4}>
        {filterNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link to={`/${id}`} style={{ listStyle: "none" }}>
      <Card
        className={styles.card}
        style={{ width: "18rem", margin: "20px", overflowX: "hidden" }}
      >
        <Card.Body>
          <Stack gap={2} className="align-item-center justify-content-center">
            <span className="fs-5">{title}</span>
            {tags.length > 0 && (
              <Stack
                gap={1}
                direction="horizontal"
                className="align-item-center justify-content-center flex-wrap"
              >
                {tags.map((tag) => (
                  <Badge>{tag.label}</Badge>
                ))}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card>
    </Link>
  );
}
