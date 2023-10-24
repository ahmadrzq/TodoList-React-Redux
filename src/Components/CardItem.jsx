import { useDispatch } from "react-redux";
import { completeTodo, removeTodo } from "../Redux/Reducers/TodosReducer";

export default function CardItem({ task }) {
  const dispatch = useDispatch();
  // handle remove
  const handleRemove = (noteId) => {
    dispatch(removeTodo(noteId));
  };
  // handle complete
  const handleComplete = (noteId) => {
    dispatch(completeTodo(noteId));
  };
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
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
          <div className="d-flex column-gap-2 justify-content-end actions">
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
