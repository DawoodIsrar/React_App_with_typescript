import React, { useState, useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  FormControl,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactSelect from "react-select";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Note, Tag } from "../App";
import styles from "./NOteList.module.css";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};
type EditModayProps = {
  availableTags: Tag[];
  handleClosed: () => void;
  show: boolean;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};
export default function NoteList({
  availableTags,
  notes,
  updateTag,
  deleteTag,
}: NoteListProps) {
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
  const [show, setShow] = useState(false);

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
            {/* <Link to={"/new"}> */}
            <Button onClick={() => setShow(true)}>Edit Tags</Button>
            {/* </Link> */}
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
      <EditTagsModal
        show={show}
        handleClosed={() => setShow(false)}
        availableTags={availableTags}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
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

function EditTagsModal({
  availableTags,
  handleClosed,
  show,
  updateTag,
  deleteTag,
}: EditModayProps) {
  return (
    <Modal show={show} onHide={handleClosed}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <FormControl
                    type="text"
                    value={tag.label}
                    onChange={(e) => updateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteTag(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
