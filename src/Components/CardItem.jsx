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
import PropTypes from "prop-types";

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
        <div className="card-body rounded" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
          {task.id === editingNoteId && task.completed === false ? (
            <>
              <input
                type="text"
                className={`form-control mb-1 ${!editedTitleNote.trim() ? 'border border-3 border-danger' : ''}`}
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
                className={`form-control mb-1 ${!editedNote.trim() ? 'border border-3 border-danger' : ''}`}
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
                    ? `card-text fs-3 fw-bolder text-decoration-line-through`
                    : `card-text fs-3 fw-bolder`
                }
              >
                {task.title}
              </h5>
              <p
                className={
                  task.completed
                    ? `card-text text-decoration-line-through`
                    : `card-text`
                }
              >
                {task.note}
              </p>
            </>
          )}
          <div className="d-flex column-gap-3 align-items-center justify-content-end actions mt-4">
            {task.id === editingNoteId && task.completed === false ? (
              <button className="btn btn-success btn-sm" role="button" onClick={() => handleUpdateNote(task.id)}>
                save
              </button>
            ) : (
              <i
                role="button"
                className="bi bi-pencil text-light"
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
                  ? "bi-check-circle-fill text-dark"
                  : "bi-check-circle"
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

CardItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  editingNoteId: PropTypes.number,
  isFinishEdit: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool.isRequired,
};
