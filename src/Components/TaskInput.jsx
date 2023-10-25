import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../Redux/Reducers/TodosReducer";
import { useState } from "react";

export default function TaskInput() {
  const editingNoteId = useSelector((state) => state.todos.editingNoteId);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isInputTitleNoteEmpty, setIsInputTitleNoteEmpty] = useState(false);
  const [isInputNoteEmpty, setInputNoteEmpty] = useState(false);
  const handleInputTitle = (e) => {
    setTitle(e.target.value);
    if (e.target.value !== "") return setIsInputTitleNoteEmpty(false);
  };
  const handleInputNote = (e) => {
    setNote(e.target.value);
    if (e.target.value !== "") return setInputNoteEmpty(false);
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    title.trim() === ""
      ? setIsInputTitleNoteEmpty(true)
      : setIsInputTitleNoteEmpty(false);

    note.trim() === "" ? setInputNoteEmpty(true) : setInputNoteEmpty(false);

    if (title.trim() !== "" && note.trim() !== "" && editingNoteId === null) {
      dispatch(
        addTodo({
          id: Math.floor(Math.random() * 1000),
          title: title,
          note: note,
          completed: false,
        })
      );

      setTitle("");
      setNote("");
      setInputNoteEmpty(false);
      setIsInputTitleNoteEmpty(false);
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-center text-center">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label fs-4">
                Add Note
              </label>
              <input
                placeholder="Title Notes"
                type="text"
                className="form-control"
                onChange={handleInputTitle}
                value={title}
              />
              {isInputTitleNoteEmpty ? (
                <span className="text-danger" style={{ fontSize: 12 }}>
                  Title Note cannot be empty
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Notes"
                rows={3}
                type="text"
                className="form-control"
                onChange={handleInputNote}
                value={note}
              />
              {isInputNoteEmpty ? (
                <span className="text-danger" style={{ fontSize: 12 }}>
                  Note cannot be empty
                </span>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className={`btn btn-success w-100 ${
                editingNoteId !== null ? "disabled" : ""
              }`}
            >
              Add
            </button>
          </form>
        </div>
        {editingNoteId !== null ? (
          <span
            className="text-danger text-center py-3"
            style={{ fontSize: 12 }}
          >
            When editing note can't add new note
          </span>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
