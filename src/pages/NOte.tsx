import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { NoteData } from "../App";

type updateType = {
  onDelete: (id: string) => void;
};
export function Note({ onDelete }: updateType) {
  const note = useNote();
  const tags = note.tags;
  const navigate = useNavigate();
  return (
    <>
      <Row className="p-4 " style={{ overflowX: "hidden" }}>
        <Col>
          <h1>{note.title}</h1>
          <Stack
            gap={1}
            direction="horizontal"
            className="align-item-center justify-content-start flex-wrap"
          >
            {tags.map((tag) => (
              <Badge>{tag.label}</Badge>
            ))}
          </Stack>
        </Col>
        <Col className="d-flex justify-content-end p-4">
          <Stack gap={2} direction="horizontal">
            <Link to={"edit"}>
              <Button>Edit</Button>
            </Link>

            <Button
              onClick={() => {
                onDelete(note.id);
              }}
            >
              Delete
            </Button>

            {/* <Link to={"/"}> */}
            <Button
              variant="outline-secondary"
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
              style={{ color: "black" }}
            >
              Back
            </Button>
            {/* </Link> */}
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}
