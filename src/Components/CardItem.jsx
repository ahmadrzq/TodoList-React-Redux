import { useDispatch } from "react-redux"
import { completeTodo, removeTodo } from "../Redux/Reducers/TodosReducer"

export default function CardItem({ task }) {
    const dispatch = useDispatch()
    // handle remove
    const handleRemove = (noteId) => {
        dispatch(removeTodo(noteId))
    }
    // handle complete
    const handleComplete = (noteId) => {
        dispatch(completeTodo(noteId))
    }
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.note}</p>
                    <div className="d-flex column-gap-2 justify-content-end actions">
                        <i className="bi bi-trash pointer-event" onClick={() => handleRemove(task.id)}></i>
                        {
                            task.completed ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-check-circle" onClick={() => handleComplete(task.id)}></i>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
