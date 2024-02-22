import React, { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { NoteData, Tag } from "../App";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};
type NewNoteProps = {
  onSubmition: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
const NewsForm = ({
  onSubmition,
  addTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NewNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const markdownRef = useRef<HTMLTextAreaElement>(null);
  function handleSubmit(e: FormEvent) {
    console.log("title recieved====>", titleRef.current!.value);
    console.log("markdown recieved====>", markdownRef.current!.value);
    console.log("tags recieved====>", selectedTags);

    e.preventDefault();
    onSubmition({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  }
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required ref={titleRef} defaultValue={title} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  onCreateOption={(label) => {
                    const newTag = { id: uuidV4(), label };
                    addTag(newTag);
                    setSelectedTags((prev) => [...prev, newTag]);
                  }}
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  options={availableTags.map((tag) => {
                    return { label: tag.label, id: tag.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  isMulti
                ></CreatableReactSelect>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={15}
              ref={markdownRef}
              defaultValue={markdown}
            ></Form.Control>
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit">Save</Button>
            <Link to={".."}>
              {" "}
              <Button>Cancle</Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </>
  );
};

export default NewsForm;
