import { useDispatch } from "react-redux";
import {
  completeTodo,
  removeTodo,
  toggleEdit,
  updateTodo,
} from "../Redux/Reducers/TodosReducer";
import { useState } from "react";

export default function CardItem({ task, editingNoteId }) {
  const dispatch = useDispatch();
  // handle remove
  const handleRemove = (noteId) => {
    dispatch(removeTodo(noteId));
  };
  // handle complete
  const handleComplete = (noteId) => {
    dispatch(completeTodo(noteId));
  };
  //   handle edit
  const handleEdit = (noteId) => {
    dispatch(toggleEdit(noteId));
  };
  //   Update note
  const [editedTitleNote, setEditedTitleNote] = useState(task.title);
  const [editedNote, setEditedNote] = useState(task.note);
  const handleUpdateNote = (noteId) => {
    dispatch(
      updateTodo({ id: noteId, title: editedTitleNote, note: editedNote })
    );
    handleEdit(null);
  };

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          {task.id === editingNoteId ? (
            <>
              <input
                type="text"
                className="form-control mb-1"
                value={editedTitleNote}
                onChange={(e) => setEditedTitleNote(e.target.value)}
                required
              />
              <textarea
                rows={3}
                type="text"
                className="form-control mb-1"
                value={editedNote}
                onChange={(e) => setEditedNote(e.target.value)}
                required
              />
            </>
          ) : (
            <>
              <h5
                className={
                  task.completed
                    ? `card-text fs-3 fw-bolder text-decoration-line-through text-danger`
                    : `card-text fs-3 fw-bolder`
                }
              >
                {task.title}
              </h5>
              <p
                className={
                  task.completed
                    ? `card-text text-decoration-line-through text-danger`
                    : `card-text`
                }
              >
                {task.note}
              </p>
            </>
          )}
          <div className="d-flex column-gap-2 justify-content-end actions">
            {task.id === editingNoteId ? (
              <span role="button" onClick={() => handleUpdateNote(task.id)}>
                save
              </span>
            ) : (
              <i
                role="button"
                className="bi bi-pencil"
                onClick={() => {
                  handleEdit(task.id);
                }}
              ></i>
            )}
            <i
              role="button"
              className="bi bi-trash pointer-event"
              onClick={() => handleRemove(task.id)}
            ></i>

            <i
              role="button"
              className={`bi ${
                task.completed ? "bi-check-circle-fill" : "bi-check-circle"
              }`}
              onClick={() => handleComplete(task.id)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
