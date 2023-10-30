import { useDispatch } from "react-redux";
import {
  completeTodo,
  removeTodo,
  setEmptyNoteInput,
  setEmptyTitleNoteInput,
  toggleEdit,
  toggleFinishEdit,
  uncompleteWarning,
  updateTodo,
} from "../Redux/Reducers/TodosReducer";
import { useState } from "react";

export default function CardItem({
  task,
  editingNoteId,
  isFinishEdit,
  isComplete,
}) {
  const dispatch = useDispatch();
  // handle remove
  const handleWarningFinishEdit = (boolean) => dispatch(toggleFinishEdit(boolean));
  const handleRemove = (noteId) => task.id === editingNoteId ? handleWarningFinishEdit(false) : dispatch(removeTodo(noteId)) ;
  // handle complete
  const handleComplete = (noteId) => {
    task.id === editingNoteId ? handleWarningFinishEdit(false) : dispatch(completeTodo(noteId));
    if (task.completed) return toggleCompleteWarning(false);
  };

  //   handle edit
  const handleEdit = (noteId) => dispatch(toggleEdit(noteId))
  //   handle warning empty note
  const handleWarningInputNote = () => dispatch(setEmptyNoteInput(true));
  //   handle warning empty title note
  const handleWarningInputTitleNote = () => dispatch(setEmptyTitleNoteInput(true))
  //   Update note
  const [editedTitleNote, setEditedTitleNote] = useState(task.title);
  const [editedNote, setEditedNote] = useState(task.note);
  const handleUpdateNote = (noteId) => {
    if (!editedNote.trim() || !editedTitleNote.trim()) {
      handleWarningInputNote();
      handleWarningInputTitleNote();
    } else {
      dispatch(
        updateTodo({ id: noteId, title: editedTitleNote, note: editedNote })
      );
      handleEdit(null);
      handleWarningFinishEdit(true);
    }
  };
  const toggleComplete = (boolean) => dispatch(uncompleteWarning(boolean))
  const [completeWarning, setCompleteWarning] = useState(false);
  // Function to show/hide the complete warning
  const toggleCompleteWarning = (showWarning) => setCompleteWarning(showWarning)

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          {task.id === editingNoteId && task.completed === false ? (
            <>
              <input
                type="text"
                className="form-control mb-1"
                value={editedTitleNote}
                onChange={(e) => setEditedTitleNote(e.target.value)}
              />
              {!editedTitleNote.trim() ? (
                <span className="text-danger" style={{ fontSize: 12 }}>
                  Title Note cannot be empty
                </span>
              ) : (
                ""
              )}
              <textarea
                rows={3}
                type="text"
                className="form-control mb-1"
                value={editedNote}
                onChange={(e) => setEditedNote(e.target.value)}
              />
              {!editedNote.trim() ? (
                <span className="text-danger" style={{ fontSize: 12 }}>
                  Note cannot be empty
                </span>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <h5
                className={
                  task.completed
                    ? `card-text fs-3 fw-bolder text-decoration-line-through text-success`
                    : `card-text fs-3 fw-bolder`
                }
              >
                {task.title}
              </h5>
              <p
                className={
                  task.completed
                    ? `card-text text-decoration-line-through text-success`
                    : `card-text`
                }
              >
                {task.note}
              </p>
            </>
          )}
          <div className="d-flex column-gap-3 justify-content-end actions">
            {task.id === editingNoteId && task.completed === false ? (
              <span role="button" onClick={() => handleUpdateNote(task.id)}>
                save
              </span>
            ) : (
              <i
                role="button"
                className="bi bi-pencil"
                onClick={() => {
                  if (task.completed) {
                    toggleCompleteWarning(true);
                  } else {
                    handleEdit(task.id);
                  }
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
                task.completed
                  ? "bi-check-circle-fill text-success"
                  : "bi-check-circle text-danger"
              }`}
              onClick={() => {
                if (isComplete) {
                  toggleComplete(false);
                }
                handleComplete(task.id);
              }}
            ></i>
          </div>
        </div>
        {!isFinishEdit && editingNoteId === task.id ? (
          <span className="text-danger text-center" style={{ fontSize: 12 }}>
            Finish editing first
          </span>
        ) : (
          ""
        )}
        {completeWarning ? (
          <span className="text-danger text-center" style={{ fontSize: 12 }}>
            Uncomplete first before editing
          </span>
        ) : null}
      </div>
    </div>
  );
}
