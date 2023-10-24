import { useDispatch } from "react-redux"
import { addTodo } from "../Redux/Reducers/TodosReducer"
import { useState } from "react"

export default function TaskInput() {
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const handleInputTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleInputNote = (e) => {
        setNote(e.target.value)
    }

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTodo({
            id: Math.floor(Math.random() * 1000),
            title: title,
            note: note,
            completed: false
        }))
        setTitle('');
        setNote('');
    }
    return (
        <>
            <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label fs-4">Add Note</label>
                            <input placeholder="Title Notes" type="text" className="form-control" onChange={handleInputTitle} value={title} required />
                        </div>
                        <div className="mb-3">
                            <textarea placeholder="Notes" rows={3} type="text" className="form-control" onChange={handleInputNote} value={note} required />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}
